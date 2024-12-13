from datetime import datetime, timedelta, timezone
from typing import Annotated, List

import jwt
from fastapi import FastAPI, Depends, HTTPException, status, Request, Response, Query
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .database import SessionLocal, User, Images, Likes
from .model import ToDoCreate, UserCreate, ImageCreate
from passlib.context import CryptContext
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    # if expires_delta:
    #     expire = datetime.now(timezone.utc) + expires_delta
    # else:
    #     expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    # to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user or not pwd_context.verify(password, user.password):
        return None
    return user

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception

    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

@app.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    hashed_password = pwd_context.hash(user.password)
    db_user = User(username=user.username, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me")
async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
    return current_user

@app.post("/token")
async def login_for_access_token(
    form_data: UserCreate,
    db: Session = Depends(get_db)
) -> dict:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/images/")
async def read_images(
    page: int = Query(ge=0, default=0),
    limit: int = Query(ge=1, le=100, default=17),
    search: str = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Images)
    
    if search:
        query = query.filter(Images.categories.any(search))
    
    query = query.order_by(Images.created_at.desc())
    
    total_images = query.count()
    offset = max(0, page * limit)
    
    images = query.offset(offset).limit(limit).all()
    
    return {
        "total": total_images,
        "page": page,
        "limit": limit,
        "images": images
    }

# 내가 좋아요한 이미지 목록 읽기
@app.get("/images/liked/")
async def read_liked_images(current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    liked_images = db.query(Images).join(Likes).filter(Likes.user_id == current_user.id).all()
    return liked_images

# 내가 업로드한 이미지 목록 읽기
@app.get("/images/my/")
async def read_my_images(current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    my_images = db.query(Images).filter(Images.user_id == current_user.id).all()
    return my_images

# 이미지 업로드
@app.post("/image/")
async def create_image(image: ImageCreate, current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    new_image = Images(image_url=image.image_url, title=image.title, content=image.content, categories=image.categories, user_id=current_user.id)
    db.add(new_image)
    db.commit()
    db.refresh(new_image)
    return new_image

@app.delete("/image/{image_id}")
async def delete_image(image_id: int, db: Session = Depends(get_db)):
    db.query(Images).filter(Images.id == image_id).delete()
    db.commit()
    return {"message": "Image deleted"}

# 좋아요 추가
@app.post("/like/{image_id}")
async def create_like(image_id: int, current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    new_like = Likes(image_id=image_id, user_id=current_user.id)
    db.add(new_like)
    db.commit()
    db.refresh(new_like)
    return new_like

# 좋아요 삭제
@app.delete("/like/{image_id}")
async def delete_like(image_id: int, current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    like = db.query(Likes).filter(Likes.image_id == image_id, Likes.user_id == current_user.id).first()
    if like:
        db.delete(like)
        db.commit()
        return {"message": "Like deleted"}
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Like not found"
        )
