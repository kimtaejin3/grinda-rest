import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
from sqlalchemy.dialects.postgresql import ARRAY

load_dotenv()

DB_PASSWORD = os.getenv("DB_PASSWORD")

DATABASE_URL = f"postgresql://postgres.gmpgjtjmalohyjsespkr:{DB_PASSWORD}@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres"

engine = create_engine(
    DATABASE_URL, 
    connect_args={"options": "-c client_encoding=utf8"}
)
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
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    categories = Column(ARRAY(String), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="images")
    likes = relationship("Likes", back_populates="image")
    created_at = Column(DateTime, default=datetime.now)

class Likes(Base):
    __tablename__ = "likes"
    id = Column(Integer, primary_key=True, index=True)
    image_id = Column(Integer, ForeignKey("images.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    image = relationship("Images", back_populates="likes")
    user = relationship("User", back_populates="likes")

# 데이터베이스 초기화
Base.metadata.create_all(bind=engine)

