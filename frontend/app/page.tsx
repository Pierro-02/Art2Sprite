import Navbar from "@/components/layout/navbar"
import Hero from "@/components/Landing page/hero"
import Features from "@/components/Landing page/features"
import Timeline from "@/components/Landing page/timeline"
import CTA from "@/components/Landing page/cta"
import Footer from "@/components/layout/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <Timeline />
      <CTA />
      <Footer />
    </div>
  )
}

