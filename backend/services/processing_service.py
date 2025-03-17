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

def removeBackground(img: Image, threshold: int = 23) -> Image:
    """
    img: Image
    threshold: the threshold to convert transparent
    example default value 23 means all pixel values 
    below and including 23 will turn transparent
    """
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

def splitSpriteSheet(sprite_sheet: Image, out_path: str, frame_width: int = 32, frame_height: int = 32):
    sheet_width, sheet_height = sprite_sheet.size
    frame_paths = []
    
    if not os.path.exists(out_path):
        os.mkdir(out_path)

    # Calculate number of frames (assuming a single row of frames)
    num_frames = sheet_width // frame_width  

    for i in range(num_frames):
        # Crop each frame
        file_path = os.path.join(out_path, f"frame_{i + 1}.png")
        frame = sprite_sheet.crop((i * frame_width, 0, (i + 1) * frame_width, frame_height))
        frame.save(file_path)
        frame_paths.append(file_path)

    return frame_paths
    