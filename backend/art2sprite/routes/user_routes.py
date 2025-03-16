from fastapi import APIRouter, Depends
from art2sprite.models.user import User, UserCreate
from art2sprite.services.user_service import create_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=User)
def register_user(user: UserCreate):
    return create_user(user)
