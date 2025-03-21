import io
import os
import sys
from uuid import uuid4
from fastapi import APIRouter, Body, File, HTTPException, UploadFile, requests
from services.generation_service import generateSprite, generateSpriteSheet
from services.processing_service import downscale32, prepareSketch, removeBackground, splitSpriteSheet
from models.user import User, UserCreate
from services.user_service import create_user
from models.processing import AnimationRequest, ImageFile
from PIL import Image

router = APIRouter()
STATIC_FOLDER = "static"

@router.post("/register-user", response_model=User)
def register_user(user: UserCreate):
    return create_user(user)

@router.post("/create-sprite")
async def create_sprite(img: UploadFile = File(...)):
    unique_filename = "out_sprite.png"
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
        print(padded_img)
        
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
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {e}")


@router.post("/create-animation")
async def create_animation(request: AnimationRequest):
    print("Creating Sprite Sheet")

    try:
        sheet_name = "out_sheet.png"
        sprite_name = "out_sprite.png"
        sprite_path = os.path.join(STATIC_FOLDER, sprite_name)
        sprite_img = Image.open(sprite_path)
        rescaled_sprite = downscale32(sprite_img)
        sprite_sheet = generateSpriteSheet(rescaled_sprite, request.animationType)
        sheet_path = os.path.join(STATIC_FOLDER, sheet_name)
        sprite_sheet.save(sheet_path)
        frame_folder = os.path.join(STATIC_FOLDER, "frames")
        if not os.path.exists(frame_folder):
            os.mkdir(frame_folder)
        frame_paths = splitSpriteSheet(sprite_sheet, frame_folder)

        return {
            "message": "Sprite Sheet Created!",
            "results_dir": sheet_path,
            "frame_paths": frame_paths
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {e}")