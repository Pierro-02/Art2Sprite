//import { ArrowRight, Code, Zap } from "lucide-react";
import Image from "next/image";
import mascot from "@/assets/mascot.png";

export function TwoColumn() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 justify-items-center">
            <Image src={mascot} width={400} layout="intrinsic" alt="A2S mascot"/>
          </div>
          
          <div className="space-y-6 bg-themeblue -mr-24 my-20 inline-block p-12 text-l">
            <p className="text-white leading-relaxed mr-28 text-justify">
            Art2Sprite is designed to revolutionize game development by simplifying the creation of high-quality spritesheets from rough sketches.
            Our goal is to empower developers, designers, and hobbyists by providing an intuitive tool that bridges the gap between concept art and prototype-ready assets. 
            <br/>
            <br/>
            With Art2Sprite, users can quickly transform their ideas into complete sprites, saving time and effort while maintaining creative control. 
            Whether for 2D games, animations, or creative projects, Art2Sprite ensures accessibility and precision in asset creation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/*             <div className="inline-block p-3 bg-blue-100 rounded-lg">
              <Code className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold">Development Excellence</h2>
            <p className="text-gray-600 leading-relaxed">
              Our team of expert developers creates robust, scalable solutions
              using cutting-edge technologies and best practices.
            </p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </a>
                        <div className="inline-block p-3 bg-purple-100 rounded-lg">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold">Lightning Fast Performance</h2>
            <p className="text-gray-600 leading-relaxed">
              We optimize every aspect of your application to ensure
              blazing-fast performance and exceptional user experience.
            </p>
            <a href="#" className="inline-flex items-center text-purple-600 hover:underline">
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </a>
*/