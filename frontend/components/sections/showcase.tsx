"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0)

  const showcaseItems = [
    {
      title: "Character Sprites",
      description: "Transform character art into game-ready sprites with multiple animations.",
      before: "/placeholder.svg?height=300&width=300",
      after: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Environment Assets",
      description: "Convert landscape and environment art into tileable pixel assets.",
      before: "/placeholder.svg?height=300&width=300",
      after: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Item Collections",
      description: "Create consistent item sprites for your game inventory systems.",
      before: "/placeholder.svg?height=300&width=300",
      after: "/placeholder.svg?height=300&width=300",
    },
  ]

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === showcaseItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? showcaseItems.length - 1 : prev - 1))
  }

  return (
    <section id="showcase" className="py-20 bg-gradient-to-b from-black to-BLUE-950/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-blue-400">Showcase</span> Gallery
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            See the before and after transformations powered by Art2Sprite
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-lg">
            <motion.div
              className="flex"
              initial={false}
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {showcaseItems.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="space-y-4">
                      <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-gray-700 bg-gray-800">
                        <div className="absolute top-2 left-2 bg-gray-900/80 text-xs px-2 py-1 rounded">
                          Original Art
                        </div>
                        <Image
                          src={item.before || "/placeholder.svg"}
                          alt={`Original art for ${item.title}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-center text-sm text-gray-400">Original Artwork</p>
                    </div>

                    <div className="space-y-4">
                      <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-blue-700 bg-gray-800 pixelated">
                        <div className="absolute top-2 left-2 bg-blue-900/80 text-xs px-2 py-1 rounded">
                          Pixel Art
                        </div>
                        <Image
                          src={item.after || "/placeholder.svg"}
                          alt={`Pixel art for ${item.title}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-center text-sm text-gray-400">Converted Pixel Art</p>
                    </div>
                  </div>

                  <div className="text-center p-4">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm border border-blue-500/30"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm border border-blue-500/30"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {showcaseItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-blue-500" : "bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

