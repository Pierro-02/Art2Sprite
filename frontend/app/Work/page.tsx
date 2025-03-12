import { About } from "@/components/sections/About";
import Footer from "@/components/layout/Footer"
import  Navbar  from "@/components/layout/navbar";
import { Hero } from "@/components/sections/Hero";
import { TwoColumn } from "@/components/sections/TwoColumn";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero/>
      <Footer />
    </main>
  );
}
