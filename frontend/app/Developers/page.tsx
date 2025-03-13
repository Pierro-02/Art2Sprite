import DevelopersPage from "@/components/sections/developers-page"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/Footer"

export default function Page() {
    
  return  (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 opacity-80 text-white">
    <Navbar />
    <DevelopersPage />
    <Footer />
    </div>
)
}

