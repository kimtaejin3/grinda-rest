from pydantic import BaseModel

# Pydantic 모델
class ToDoCreate(BaseModel):
    title: str
    description: str = None