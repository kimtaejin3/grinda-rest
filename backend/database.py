from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

DATABASE_URL = "postgresql://postgres.gmpgjtjmalohyjsespkr:qPxNCeULULXtdEzN@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    images = relationship("Images", back_populates="user")
    likes = relationship("Likes", back_populates="user")

class Images(Base):
    __tablename__ = "images"
    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="images")
    likes = relationship("Likes", back_populates="image")

class Likes(Base):
    __tablename__ = "likes"
    id = Column(Integer, primary_key=True, index=True)
    image_id = Column(Integer, ForeignKey("images.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    image = relationship("Images", back_populates="likes")
    user = relationship("User", back_populates="likes")

# 데이터베이스 초기화
Base.metadata.create_all(bind=engine)

