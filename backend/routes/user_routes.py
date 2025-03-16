import os
import sys
from uuid import uuid4
from fastapi import APIRouter, Body, HTTPException, requests
from services.generation_service import generateSprite
from services.processing_service import downscale32, removeBackground
from models.user import User, UserCreate
from services.user_service import create_user
from models.processing import ImageFile
from PIL import Image

router = APIRouter()

@router.post("/register-user", response_model=User)
def register_user(user: UserCreate):
    return create_user(user)

@router.post("/create-sprite", response_model=ImageFile)
def create_sprite(img: ImageFile):
    image_url = img.fileUrl

    # Check if image_url is a URL (starts with http or https)
    if image_url.startswith("http"):
        try:
            response = requests.get(image_url, timeout=10)
            response.raise_for_status()  # Raise error for bad response (e.g., 404, 403)

            temp_filename = f"/tmp/{uuid4().hex}.png"  # Unique filename
            with open(temp_filename, "wb") as f:
                f.write(response.content)

            image_path = temp_filename  # Use downloaded file path
        except requests.RequestException as e:
            raise HTTPException(status_code=400, detail=f"Error downloading image: {e}")
    else:
        image_path = image_url  # Assume it's a local file

    # Validate file existence
    if not os.path.exists(image_path):
        raise HTTPException(status_code=400, detail="Invalid image path")

    try:
        sketch_image = Image.open(image_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error reading image file")

    downScaledImage = downscale32(sketch_image)
    transparentBackground = removeBackground(downScaledImage)
    
    STATIC_FOLDER = "static"
    transparentBackground.save(os.path.join(STATIC_FOLDER, f'temp_sprite'))

    return generateSprite(transparentBackground)

@router.get("/create-animation", response_model=ImageFile)
def create_animation(img: ImageFile):
    pass