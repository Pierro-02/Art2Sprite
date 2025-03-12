"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image';
import Logo from "@/assets/logo.png"; // Make sure this path is correct

import { useRouter } from 'next/navigation'; // Import useRouter

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter(); // Initialize the router

  const handleLoginClick = () => {
    router.push('/Login'); 
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-silver/90 backdrop-blur-md border-b border-gray-800" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
          <Image
              src={Logo} // Or the path to your image
              alt="Art2Sprite Logo"
              width={90}   // Adjust the width as needed
              height={50}  // Adjust the height as needed
              priority     // Optional: If this is a critical image, use priority for faster loading
          />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a href="./" className="text-gray-300 hover:text-blue-500 px-3 py-2 transition-colors">
                Home
              </a>
              <a href="#features" className="text-gray-300 hover:text-blue-500 px-3 py-2 transition-colors">
                Features
              </a>
              <a href="#timeline" className="text-gray-300 hover:text-blue-500 px-3 py-2 transition-colors">
                Timeline
              </a>
              <a href="/Work" className="text-gray-300 hover:text-blue-500 px-3 py-2 transition-colors">
                Workspace
              </a>
              <a href="/process" className="text-gray-300 hover:text-blue-500 px-3 py-2 transition-colors">
                Process
              </a>
              
              <Button
                variant="outline"
                className="ml-4 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                onClick={handleLoginClick} // ADDED onClick
              >
                Login
              </Button>
              
              
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-black/95 border-b border-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 transition-colors">
                Home
              </a>
              <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 transition-colors">
                Features
              </a>
              <a href="#timeline" className="text-gray-300 hover:text-white block px-3 py-2 transition-colors">
                Timeline
              </a>
              <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 transition-colors">
                Contact
              </a>
              
               <Button
                className="ml-2 mt-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors" 
                onClick={handleLoginClick}
                >
                Login
              </Button>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}