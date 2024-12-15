from pydantic import BaseModel
from typing import List

# Pydantic 모델
class ToDoCreate(BaseModel):
    title: str
    description: str = None

class UserCreate(BaseModel):
    username: str
    password: str

class ImageCreate(BaseModel):
    image_url: str
    title: str
    content: str
    categories: List[str]
