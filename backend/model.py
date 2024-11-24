from pydantic import BaseModel

# Pydantic 모델
class ToDoCreate(BaseModel):
    title: str
    description: str = None

class UserCreate(BaseModel):
    username: str
    password: str
