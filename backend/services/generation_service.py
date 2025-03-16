import sys
from fastapi import FastAPI, HTTPException, File, UploadFile
import os
from services.processing_service import remove_every_third_image, removeBackground
from options.test_options import TestOptions
from data import create_dataset
from models import create_model
from util.visualizer import save_images
from util import html
from PIL import Image

STATIC_FOLDER = "static"

def generateSpriteSheet(img: Image, animationType: str) -> str:
    """
    imgUrl -> (Sprite url)
    animationType -> (idle, walking, jump)
    return -> spriteSheet url
    """
    valid_animations = {"idle", "jump", "walking"}
    if animationType not in valid_animations:
        print(f"Error: incorrect animation type: {animationType}. Must be one of {valid_animations}")
        return None

    base_path = os.path.join(STATIC_FOLDER, animationType + ".png")

    try:
        base_image = Image.open(base_path)
    except FileNotFoundError:
        print(f"Error: Could not find base animation file at {base_path}.")
        return None
    except Exception as e:
        print(f"Error: Failed to open base animation file - {e}")
        return None

    frame_width, frame_height = 32, 32
    num_frames = base_image.width // frame_width

    # Extract individual frames from the base walk cycle
    base_frames = [base_image.crop((i * frame_width, 0, (i + 1) * frame_width, frame_height))
              for i in range(num_frames)]

    base_image = removeBackground(base_image)

    target_sprite = img

    
    if target_sprite.mode != "RGBA":
        target_sprite = target_sprite.convert("RGBA")
    
    target_sprite = removeBackground(target_sprite)

    target_pixels = target_sprite.load()
    reference_frame = base_frames[0]
    reference_pixels = reference_frame.load()
    color_mapping = {}

    try:
        for y in range(frame_height):
            for x in range(frame_width):
                ref_pixel = reference_pixels[x, y]
                target_pixel = target_pixels[x, y]

                if ref_pixel[3] > 0 and target_pixel[3] > 0:
                    key = f"{ref_pixel[0]},{ref_pixel[1]},{ref_pixel[2]}"
                    color_mapping[key] = target_pixel

        new_sprite_sheet = Image.new('RGBA', (frame_width * num_frames, frame_height))

        for i, base_frame in enumerate(base_frames):
            base_pixels = base_frame.load()

            new_frame = target_sprite.copy()
            new_pixels = new_frame.load()

            for y in range(frame_height):
                for x in range(frame_width):
                    base_pixel = base_pixels[x, y]
                    ref_pixel = reference_pixels[x, y]

                    if (base_pixel[3] > 0 and ref_pixel[3] == 0) or \
                    (base_pixel[3] > 0 and ref_pixel[3] > 0 and
                        (abs(base_pixel[0]-ref_pixel[0]) > 20 or
                        abs(base_pixel[1]-ref_pixel[1]) > 20 or
                        abs(base_pixel[2]-ref_pixel[2]) > 20)):

                        key = f"{base_pixel[0]},{base_pixel[1]},{base_pixel[2]}"
                        if key in color_mapping:
                            new_pixels[x, y] = color_mapping[key]
                        else:
                            new_pixels[x, y] = base_pixel
                    elif base_pixel[3] == 0 and ref_pixel[3] > 0:
                        new_pixels[x, y] = (0, 0, 0, 0)
            new_sprite_sheet.paste(new_frame, (i * frame_width, 0))

        resultUrl = os.path.join(STATIC_FOLDER, f'temp_{animationType}.png')
        new_sprite_sheet = removeBackground(new_sprite_sheet)
        new_sprite_sheet.save(resultUrl)
        print("Created animation")
        return resultUrl 
    except Exception as e:
        print("Error processing sprite image for animation" + ": ", e)
        return None
    

def generateSprite(image_path: str):       
    sys.argv = [
            "single_test.py",  # Mock the script name
            "--dataroot", image_path,
            "--name", "pix2pix_experiment",
            "--model", "pix2pix",
            "--direction", "AtoB",
            "--results_dir", "/home/pierro/Desktop",
            "--gpu_ids", "-1",
        ]

    try:
        opt = TestOptions().parse()
        # hard-code some parameters for test
        opt.num_threads = 0   # test code only supports num_threads = 0
        opt.batch_size = 1    # test code only supports batch_size = 1
        opt.serial_batches = True  # disable data shuffling; comment this line if results on randomly chosen images are needed.
        opt.no_flip = True    # no flip; comment this line if results on flipped images are needed.
        opt.display_id = -1   # no visdom display; the test code saves the results to a HTML file.
        dataset = create_dataset(opt)  # create a dataset given opt.dataset_mode and other options
        model = create_model(opt)      # create a model given opt.model and other options
        model.setup(opt)               # regular setup: load and print networks; create schedulers

        # Run inference
        if opt.eval:
            model.eval()

        output_path = output_path = os.path.join(opt.results_dir, "output.png")
        
        for i, data in enumerate(dataset):
            if i > 0:  # Only process one image
                break  
            model.set_input(data)
            model.test()
            visuals = model.get_current_visuals()

            # Extract the first image
            for label, image in visuals.items():
                image_pil = Image.fromarray(image)  # Convert to PIL Image if needed
                image_pil.save(output_path)  

        # Remove every third image
        # folder_path = os.path.join(opt.results_dir, opt.name, "test_latest/images")
        # remove_every_third_image(folder_path)

        return {"message": "Inference completed successfully", "image_url": f"/static/output_sheet.png"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
