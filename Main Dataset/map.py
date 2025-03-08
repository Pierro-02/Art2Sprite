from PIL import Image
import os

# Load the base walk cycle sprite sheet
base_walk_cycle = Image.open('idle.png')

# Define frame size and number of frames
frame_width, frame_height = 32, 32
num_frames = base_walk_cycle.width // frame_width

# Extract individual frames from the base walk cycle
base_frames = [base_walk_cycle.crop((i * frame_width, 0, (i + 1) * frame_width, frame_height))
              for i in range(num_frames)]

# Directory for output
output_dir = 'idle animtions'
os.makedirs(output_dir, exist_ok=True)

folder_path = "train/sprite"

# Load target sprites to animate
target_sprites = [f for f in os.listdir(folder_path) if f.endswith(".png")]  # Add all your sprite paths

print(len(target_sprites))

for sprite_path in target_sprites:
    # Load the target sprite (this should be a single static sprite)
    target_sprite = Image.open(folder_path + "//" + sprite_path)
    sprite_name = os.path.basename(sprite_path).split('.')[0]
    target_pixels = target_sprite.load()

    # Get the reference frame (first frame of animation)
    reference_frame = base_frames[0]
    reference_pixels = reference_frame.load()

    # Create a color mapping from base colors to target colors
    color_mapping = {}
    try:
        for y in range(frame_height):
            for x in range(frame_width):
                ref_pixel = reference_pixels[x, y]
                target_pixel = target_pixels[x, y]

                # Only map pixels that are visible in both

                if ref_pixel[3] > 0 and target_pixel[3] > 0:
                    # Use pixel as key in dictionary (can't use tuples as keys, so convert to string)
                    key = f"{ref_pixel[0]},{ref_pixel[1]},{ref_pixel[2]}"
                    color_mapping[key] = target_pixel

        # Create a new sprite sheet for the animation
        new_sprite_sheet = Image.new('RGBA', (frame_width * num_frames, frame_height))

        # For each frame of the animation
        for i, base_frame in enumerate(base_frames):
            base_pixels = base_frame.load()

            # Create a new frame starting with the target sprite
            new_frame = target_sprite.copy()
            new_pixels = new_frame.load()

            # For each pixel
            for y in range(frame_height):
                for x in range(frame_width):
                    # Get pixels from all sources
                    base_pixel = base_pixels[x, y]
                    ref_pixel = reference_pixels[x, y]

                    # If base pixel is visible and reference pixel is not,
                    # or they're significantly different, this indicates movement
                    if (base_pixel[3] > 0 and ref_pixel[3] == 0) or \
                    (base_pixel[3] > 0 and ref_pixel[3] > 0 and
                        (abs(base_pixel[0]-ref_pixel[0]) > 20 or
                        abs(base_pixel[1]-ref_pixel[1]) > 20 or
                        abs(base_pixel[2]-ref_pixel[2]) > 20)):

                        # This pixel represents movement
                        # Try to map the color from base to target palette
                        key = f"{base_pixel[0]},{base_pixel[1]},{base_pixel[2]}"
                        if key in color_mapping:
                            # Use the corresponding target color
                            new_pixels[x, y] = color_mapping[key]
                        else:
                            # If we don't have a mapping, use a color-matching approach
                            # Find the closest color in the target sprite
                            # For simplicity, just use the base pixel
                            new_pixels[x, y] = base_pixel

                    # If pixel is transparent in base but visible in reference,
                    # it represents a pixel that disappeared in this frame
                    elif base_pixel[3] == 0 and ref_pixel[3] > 0:
                        # Make this pixel transparent in the new frame too
                        new_pixels[x, y] = (0, 0, 0, 0)

            # Paste the new frame into the sprite sheet
            new_sprite_sheet.paste(new_frame, (i * frame_width, 0))

        # Save the new sprite sheet
        new_sprite_sheet.save(os.path.join(output_dir, f'{sprite_name}_walk_cycle.png'))
        print(f'Created animation for {sprite_name}')
    except Exception as _:
        print("Error processing " + sprite_path)

print(f'All animations complete! Check {output_dir}')
