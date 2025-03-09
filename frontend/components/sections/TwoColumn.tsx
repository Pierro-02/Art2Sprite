'use client';

import React from 'react';
import Image from "next/image";
import Sonic from "@/assets/Sonic.gif";
import Mario from "@/assets/SuperMario.gif"

export function TwoColumn() {
  return (
    <section className="py-24 bg-black">
      {/* Dark background for the whole section */}
      <div className="container mx-auto px-4 text-white">
        {/* Container for content, add text-white for the title */}

        {/* Header and Description */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>Unlock The Power Of Sprites</h2>
          <p className="text-gray-400 text-center leading-relaxed mt-2">
            Creating stunning sprites has never been easier. Transform your art into game-ready assets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image Column */}
          <div className="order-1 md:order-1 flex justify-center">
            {/* Added flex and justify-center to move image a bit to the right */}
            <div className="relative w-[250px] h-[250px] md:w-[400px] md:h-[400px] md:mr-8">
              {/* Added horizontal margin (right) for desktop */}
              {/* Mobile: 250x250, Desktop: 400x400 */}
              {/* First Image (Background) */}
              <Image
                src={Sonic}
                width={550}
                height={550}
                alt="Sonic Gif"
                className="absolute inset-0"
                style={{
                  top: '100px', // Adjusted for Mobile
                  left: '-50px', // Adjusted for Mobile
                  zIndex: 1,
                }}
              />
              {/* Second Image */}
             
              </div>
             <div className="relative w-[250px] h-[250px] md:w-[400px] md:h-[400px]">
              {/* Mobile: 250x250, Desktop: 400x400 */}
              {/* First Image (Background) */}
                <Image
                src={Mario}
                width={550}
                height={550}
                alt="Mario Gif"
                className="absolute inset-0"
                style={{
                  top: '20px', // Adjusted for Mobile
                  left: '50px', // Adjusted for Mobile
                  zIndex: 2,
                }}
              />
              </div>
              
           
          </div>

          {/* Text Column */}
           {/* Text Column */}
           <div className="order-2 md:order-2">
            <div className="rounded-lg p-8 flex flex-col items-center">
              {/* Centered About Art2Sprite Column*/}
              <h2 className="text-3xl md:text-5xl font-semibold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>About Art2Sprite</h2>
              <p className="text-gray-400 leading-relaxed text-justify md:text-center">
                Art2Sprite is designed to revolutionize game development by simplifying the creation of high-quality spritesheets from rough sketches.
                Our goal is to empower developers, designers, and hobbyists by providing an intuitive tool that bridges the gap between concept art and prototype-ready assets.
                <br/><br/>
                With Art2Sprite, users can quickly transform their ideas into complete sprites, saving time and effort while maintaining creative control.
                Whether for 2D games, animations, or creative projects, Art2Sprite ensures accessibility and precision in asset creation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}