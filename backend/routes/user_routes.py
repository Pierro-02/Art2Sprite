from fastapi import APIRouter, Body
from models.user import User, UserCreate
from services.user_service import create_user
from models.processing import ImageFile

router = APIRouter()

@router.post("/register-user", response_model=User)
def register_user(user: UserCreate = Body(...)):
    return create_user(user)

@router.post("/create-sprite", response_model=ImageFile)
def create_sprite(img: ImageFile):
    pass