from PIL import Image
import os
import cv2
from models.processing import ImageFile

STATIC_FOLDER = "static"

def downscale32(img: Image):
    print ("Downscaling Image")
    try:
        resized_img = img.resize((32, 32), Image.Resampling.LANCZOS)
        print("Image Downscaled to 32x32")
        return resized_img
    except Exception as e:
        print("Error: Could Not Downscale Image: {e}")
        return None

def removeBackground(img: Image) -> Image:
    print("Removing Background") 
    try:
        if img.mode != "RGBA":
            img = img.convert("RGBA")

        pixels = img.load()
        threshold = 23
        
        for y in range(img.height):
            for x in range(img.width):
                r, g, b, a = pixels[x, y]
                if r <= threshold and g <= threshold and b <= threshold:
                    pixels[x, y] = (0, 0, 0, 0)

        print("Successfully Removed Image Background")
        return img
    except Exception as e:
        print(f"Error: Could Not Remove Background: {e}")
        return None

def prepareSketch(sketch: Image) -> Image:
    """
    takes in the sketch converts it into 32x32 if not already
    and returns a 64x32 image in A|B format where A is the 
    sketch and B is a temporary sprite
    """
    print("Preparing Sketch")
    try:
        temp_sprite_path = os.path.join(STATIC_FOLDER, "temp_sprite.jpg")
        temp_sprite = Image.open(temp_sprite_path) 
        padded_image = Image.new("RGBA", (64, 32), (0, 0, 0, 0))
        padded_image.paste(sketch, (0, 0))
        padded_image.paste(temp_sprite, (32, 0))
        return padded_image
    except Exception as e:
        print(f"Error While Preparing Image: {e}")
        return None

def remove_every_third_image(folder_path):
    try:
        files = sorted([f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))])
        for index, file in enumerate(files, start=1):
            if index % 3 == 0:
                file_path = os.path.join(folder_path, file)
                os.remove(file_path)
    except Exception as e:
        print(f"An error occurred: {e}")
    