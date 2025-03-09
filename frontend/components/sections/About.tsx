'use client';

import React from 'react';
import { SparklesIcon, AdjustmentsHorizontalIcon, WrenchIcon } from '@heroicons/react/24/outline'; // Import necessary icons

export function About() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
            Build high-impact applications grounded in your proprietary data
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Automated Feature */}
          <div>
            <SparklesIcon className="mx-auto h-10 w-10 text-gray-700 mb-2" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Automated</h3>
            <p className="text-gray-600 leading-relaxed">
              Transform hand-drawn sketches into fully functional digital sprites with AI-driven automation, streamlining the game development and animation process.
            </p>
          </div>

          {/* High-Quality Feature */}
          <div>
            <AdjustmentsHorizontalIcon className="mx-auto h-10 w-10 text-gray-700 mb-2" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">High-Quality</h3>
            <p className="text-gray-600 leading-relaxed">
              Enhance image resolution, remove backgrounds, and optimize sprite sheets to ensure professional-grade visuals for your creative projects.
            </p>
          </div>

          {/* Customizable Feature */}
          <div>
            <WrenchIcon className="mx-auto h-10 w-10 text-gray-700 mb-2" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Customizable</h3>
            <p className="text-gray-600 leading-relaxed">
              Adjust styles, refine details, and generate sprites tailored to your artistic vision with flexible customization options.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}