import io
import os
import sys
from uuid import uuid4
from fastapi import APIRouter, Body, File, HTTPException, UploadFile, requests
from services.generation_service import generateSprite
from services.processing_service import downscale32, prepareSketch, removeBackground
from models.user import User, UserCreate
from services.user_service import create_user
from models.processing import ImageFile
from PIL import Image

router = APIRouter()
STATIC_FOLDER = "static"

@router.post("/register-user", response_model=User)
def register_user(user: UserCreate):
    return create_user(user)

@router.post("/create-sprite")
async def create_sprite(img: UploadFile = File(...)):
    unique_filename = f"out_sprite.png"
    output_path = os.path.join(STATIC_FOLDER, unique_filename)
    if os.path.exists(output_path):
        os.remove(output_path)
    print("Creating_Sprite Route Called")
    try:
        contents = await img.read()
        sketch_image = Image.open(io.BytesIO(contents))
        
        downScaled_image = downscale32(sketch_image)
        # print(downScaled_image)
        padded_img = prepareSketch(downScaled_image)
        # print(padded_img)
        
        model_test_path = os.path.join(STATIC_FOLDER, "test", unique_filename)
        padded_img.save(model_test_path)
        sprite = generateSprite()
        if (sprite == None):
            print("Sprite Is Not Returned")
            raise HTTPException()
        transparentSprite = removeBackground(sprite)
        transparentSprite.save(output_path)
        os.remove(model_test_path)
        print("Image Stored At: ", output_path)
        return {
            "message": "Sprite Created!",
            "results_dir": output_path
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {e}")


@router.post("/create-animation", response_model=ImageFile)
def create_animation(img: ImageFile):
    pass