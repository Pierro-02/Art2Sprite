from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str  # Only required during creation

class User(UserBase):
    id: int

    class Config:
        orm_mode = True
