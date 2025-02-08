import os
from PIL import Image


input_sketch_dir = "/home/pierro/Desktop/FYP/Dataset/Main Dataset/test/umerShit/sketch"
input_sprite_dir = "/home/pierro/Desktop/FYP/Dataset/Main Dataset/test/umerShit/sprite"
output_dir = "/home/pierro/Desktop/FYP/Dataset/Main Dataset/test/combined"

os.makedirs(output_dir, exist_ok=True)

# Get list of sketch and sprite files
sketch_files = sorted(os.listdir(input_sketch_dir))
sprite_files = sorted(os.listdir(input_sprite_dir))



sprite_index = 0

for sketch_file in sketch_files:
    # Open the sketch image
    sketch_path = os.path.join(input_sketch_dir, sketch_file)
    sketch_img = Image.open(sketch_path).convert("RGB")

    # Make sure we do not exceed the number of available sprites
    if sprite_index >= len(sprite_files):
        break

    # Open the corresponding sprite image
    sprite_file = sprite_files[sprite_index]
    sprite_path = os.path.join(input_sprite_dir, sprite_file)
    sprite_img = Image.open(sprite_path).convert("RGB")

    # Resize both the sketch and sprite to 32x32
    sketch_img_resized = sketch_img.resize((32, 32))
    sprite_img_resized = sprite_img.resize((32, 32))

    # Create a new image with the sketch on the left and sprite on the right
    paired_img = Image.new("RGB", (64, 32))
    paired_img.paste(sketch_img_resized, (0, 0))
    paired_img.paste(sprite_img_resized, (32, 0))

    # Save the paired image with a new filename (sketch + sprite)
    output_filename = f"{os.path.splitext(sketch_file)[0]}_{os.path.splitext(sprite_file)[0]}.png"
    paired_img.save(os.path.join(output_dir, output_filename))

    # Move to the next sprite
    sprite_index += 1
