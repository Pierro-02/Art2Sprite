import Footer from "@/components/layout/Footer"
import  Navbar  from "@/components/layout/navbar";
import { Hero } from "@/components/sections/Hero";


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero/>
      <Footer />
    </main>
  );
}
