from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import SessionLocal, ToDo
from backend.model import ToDoCreate

app = FastAPI()

# DB 세션 의존성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/todos/")
def create_todo(todo: ToDoCreate, db: Session = Depends(get_db)):
    db_todo = ToDo(title=todo.title, description=todo.description)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.get("/todos/")
def read_todos(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(ToDo).offset(skip).limit(limit).all()

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(ToDo).filter(ToDo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="ToDo not found")
    db.delete(todo)
    db.commit()
    return {"message": "ToDo deleted"}
