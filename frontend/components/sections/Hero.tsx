import { ImageUpload } from "@/components/ImageUpload";
export function Hero() {
  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6 text-black">
            <span className="text-themeblue">Sprite sheets</span> from Sketches
          </h1>
          <div className="flex justify-center mt-20">
            <div className="flex justify-center border-themeblue border-dashed border-4 rounded-lg px-36 py-28">
            <ImageUpload />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*<button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition">
              Get Started
            </button>
            <button className="border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 transition">
              Learn More
            </button>*/