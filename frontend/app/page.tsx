import { About } from "@/components/sections/About";
import { Footer } from "@/components/layout/Footer";
import  Header  from "@/components/layout/Header2";
import  RainingLetters  from "@/components/sections/raining-letters"
import { TwoColumn } from "@/components/sections/TwoColumn";
import Showcase from "@/components/sections/showcase";
import OverlappingCardsSection from "@/components/sections/OverlappingCards"

export default function Home() {
  return (
    
    <div className="min-h-screen bg-grey text-white">
        
        
        
        <Header />
        <RainingLetters />
        <OverlappingCardsSection />
   
        <Showcase />
        <About />
        <Footer />
      </div>
   
  );
}
