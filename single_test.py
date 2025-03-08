import sys
from fastapi import FastAPI, HTTPException
import os
from options.test_options import TestOptions
from data import create_dataset
from models import create_model
from util.visualizer import save_images
from util import html

app = FastAPI()

# Function to remove every third image
def remove_every_third_image(folder_path):
    try:
        files = sorted([f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))])
        for index, file in enumerate(files, start=1):
            if index % 3 == 0:
                file_path = os.path.join(folder_path, file)
                os.remove(file_path)
    except Exception as e:
        print(f"An error occurred: {e}")

# API endpoint for running inference
@app.post("/run-inference")
async def run_inference():
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

        # Create a website for results
        web_dir = os.path.join(opt.results_dir, opt.name, '{}_{}'.format(opt.phase, opt.epoch))
        if opt.load_iter > 0:
            web_dir = '{:s}_iter{:d}'.format(web_dir, opt.load_iter)
        webpage = html.HTML(web_dir, 'Experiment = %s, Phase = %s, Epoch = %s' % (opt.name, opt.phase, opt.epoch))

        # Run inference
        if opt.eval:
            model.eval()
        for i, data in enumerate(dataset):
            if i >= opt.num_test:
                break
            model.set_input(data)
            model.test()
            visuals = model.get_current_visuals()
            img_path = model.get_image_paths()
            if i % 5 == 0:
                print('processing (%04d)-th image... %s' % (i, img_path))
            save_images(webpage, visuals, img_path, aspect_ratio=opt.aspect_ratio, width=opt.display_winsize)
        webpage.save()

        # Remove every third image
        folder_path = os.path.join(opt.results_dir, opt.name, "test_latest/images")
        remove_every_third_image(folder_path)

        return {"message": "Inference completed successfully", "results_dir": web_dir}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Main function to parse options and run the API
if __name__ == "__main__":
    import uvicorn

    # Mock command-line arguments
    sys.argv = [
        "single_test.py",  # Mock the script name
        "--dataroot", "/home/pierro/Desktop",
        "--name", "pix2pix_experiment",
        "--model", "pix2pix",
        "--direction", "AtoB",
        "--results_dir", "/home/pierro/Desktop",
        "--gpu_ids", "-1",
    ]

    # Parse the options


    # Pass the parsed options to the API function
    @app.post("/run-inference")
    async def run_inference_wrapper():
        return await run_inference()

    # Run the API
    uvicorn.run(app, host="0.0.0.0", port=8000)