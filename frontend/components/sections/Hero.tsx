// Hero.tsx

'use client';

import { useState } from 'react';
import { ImageUpload } from "@/components/ImageUpload";
import Image from 'next/image';
import { image } from 'framer-motion/m';
import { Console } from 'console';



export function Hero() {
  const [imageUploaded, setImageUploaded] = useState<boolean>(false)
  const [description, setDescription] = useState('');
  const [spriteSheetUrl, setSpriteSheetUrl] = useState<string | null>(null); // Add state for sprite sheet URL

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSpriteSheetGenerated = (url: string | null) => {
    setSpriteSheetUrl(url); // Update the spriteSheetUrl when it's generated
  };

  return (
    <section className="bg-gray-900 text-white py-10"> {/* Dark background */}
      <div className="container mx-auto px-4 ">
        {/* Main Content Area */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Panel (Upload and Description) */}
          <div>
            <h2 className="text-lg font-semibold mb-4">1. Upload Your Sketch</h2>
            <div className="border-dashed border-2 border-gray-700 rounded-lg p-4 mb-4"> {/* Adjust border color */}
              <ImageUpload imageUploaded={(uploaded: boolean) => setImageUploaded(uploaded)} /> {/* Pass handleSpriteSheetGenerated */}
            </div>

            <h2 className="text-lg font-semibold mb-4">2. Describe what you want for better output.</h2>
            <select
              id="animation"
              // placeholder='For instance, "walking."'
              // value={description}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="idle">Idle</option>
              <option value="walking">Walking</option>
              <option value="jumping">Jumping</option>
            </select>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" disabled={!imageUploaded}>
              Create
            </button>
          </div>

          {/* Right Panel (Output and Examples) */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Sprite Output</h2>
            <div className="border-dashed border-2 border-gray-700 rounded-lg p-4 h-[200px] flex items-center justify-center"> {/*Fixed height*/}
              {spriteSheetUrl ? ( // Use state for sprite sheet URL
                <Image
                  src={spriteSheetUrl}
                  alt="Sprite Sheet"
                  width={192}
                  height={192}
                  style={{ objectFit: 'contain' }} //prevent croping of image
                />
              ) : (
                <p className="text-gray-500">Sprite Sheet Output will appear here.</p>
              )}
            </div>

            {/* Examples Section */}
            <h2 className="text-lg font-semibold mt-6 mb-4">Examples</h2>
            <div className="flex overflow-x-auto space-x-4"> {/*
              <Image
                src="https://via.placeholder.com/150" // Placeholder image
                alt="Example 1"
                width={150}
                height={100}
                className="rounded-md"
              />
              <Image
                src="https://via.placeholder.com/150" // Placeholder image
                alt="Example 2"
                width={150}
                height={100}
                className="rounded-md"
              />
              <Image
                src="https://via.placeholder.com/150" // Placeholder image
                alt="Example 3"
                width={150}
                height={100}
                className="rounded-md"
              />
              Add more example images as needed */}
            </div>

            {/* Tutorials Section (Placeholder) */}
            <h2 className="text-lg font-semibold mt-6 mb-4">Tutorials</h2>
            <div className="border-dashed border-2 border-gray-700 rounded-lg p-4">
              <p className="text-gray-500">Tutorial content will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}