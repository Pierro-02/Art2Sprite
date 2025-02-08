import os
from options.test_options import TestOptions
from models import create_model
from util import util
from PIL import Image
import torch
import torchvision.transforms as transforms
import matplotlib.pyplot as plt

def preprocess_images_in_folder(input_folder, output_folder):
    # Create output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)

    # Define the transformation pipeline
    transform = transforms.Compose([
        transforms.ToTensor(),
    ])

    # Iterate through all files in the input folder
    for filename in os.listdir(input_folder):
        input_path = os.path.join(input_folder, filename)
        
        # Ensure file is an image
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff')):
            print(f"Skipping non-image file: {filename}")
            continue
        
        try:
            # Open and preprocess the image
            image = Image.open(input_path).convert("RGB")
            transformed_image = transform(image)

            # Convert tensor back to a PIL image
            to_pil = transforms.ToPILImage()
            pil_image = to_pil(transformed_image)

            # Save the image as a .jpg or .png file in the output folder
            output_filename = os.path.splitext(filename)[0] + ".jpg"  # You can change this to .png if needed
            output_path = os.path.join(output_folder, output_filename)
            pil_image.save(output_path)
            print(f"Processed and saved: {output_path}")
        except Exception as e:
            print(f"Error processing file {filename}: {e}")


def plot_generated_samples(result_dir, num_samples=12):
    """Plots generated samples from the latest results."""
    result_images = os.listdir(result_dir)
    result_images = sorted(result_images)[:num_samples]  # Limit to a few samples
    fig, axes = plt.subplots(1, num_samples, figsize=(15, 5))
    for ax, img_name in zip(axes, result_images):
        img_path = os.path.join(result_dir, img_name)
        img = Image.open(img_path)
        ax.imshow(img)
        ax.axis('off')
    plt.show()


test_results_dir = "/home/pierro/Desktop/FYP/Dataset/Main Dataset/test/combined"
output_folder = "/home/pierro/Desktop/FYP/pytorch-CycleGAN-and-pix2pix/preprocessedSketches/test"
if not os.path.exists(output_folder):
    os.makedirs(output_folder)
    print("Not Exist")
else:
    print("exists")
preprocess_images_in_folder(test_results_dir, output_folder)