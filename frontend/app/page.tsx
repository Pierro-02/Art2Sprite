import { About } from "@/components/sections/About";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import  RainingLetters  from "@/components/sections/raining-letters"
import { TwoColumn } from "@/components/sections/TwoColumn";
import Showcase from "@/components/sections/showcase";


export default function Home() {
  return (
    
    <div className="min-h-screen bg-black text-white">
        <Header />
        <RainingLetters />
        <TwoColumn />
        <Showcase />
        <About />
        <Footer />
      </div>
   
  );
}
