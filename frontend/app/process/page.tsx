import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import poster from "@/assets/FYP Poster.png";
import landpg from "@/assets/LandingPage.png";
import uppg from "@/assets/UploadPage.png";
import d1 from "@/assets/d1.png";
import d2 from "@/assets/d2.png";
import d3 from "@/assets/d3.png";
import d4 from "@/assets/d4.png";

export default function Process() {
  const processes = [
    {
      src: poster,
      alt: "Poster",
      width: 700
    },
    {
      src: landpg,
      alt: "Landing Page Prototype",
      width: 700
    },
    {
      src: uppg,
      alt: "Upload Page Prototype",
      width: 700
    },
    {
        src: d1,
        alt: "Diagram 1",
        width: 700
      },    {
        src: d2,
        alt: "Diagram 2",
        width: 700
      },    {
        src: d3,
        alt: "Diagram 3",
        width: 700
      },    {
        src: d4,
        alt: "Diagram 4",
        width: 700
      },
  ];

  return (
    <main className="pt-16 bg-white">
      <Header />

      <div className="space-y-8 justify-items-center">
        {processes.map((process, index) => (
          <div key={index} className="relative">
            <Image
              src={process.src}
              alt={process.alt}
              width={process.width}
              layout="intrinsic"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}