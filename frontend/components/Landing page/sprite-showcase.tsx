"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import Link from "next/link"

// Sample sprite data - replace with your actual sprites
const sampleSprites = [
  {
    id: 1,
    name: "Knight Character",
    description: "Medieval knight with sword and shield animations",
    image: "/placeholder.svg?height=200&width=200",
    creator: "GameArtist42",
    date: "March 10, 2024",
  },
  {
    id: 2,
    name: "Forest Creatures",
    description: "Set of animated woodland animals for platformer games",
    image: "/placeholder.svg?height=200&width=200",
    creator: "PixelPerfect",
    date: "February 28, 2024",
  },
  {
    id: 3,
    name: "Sci-Fi Robots",
    description: "Futuristic robot characters with attack animations",
    image: "/placeholder.svg?height=200&width=200",
    creator: "RoboDesigner",
    date: "February 15, 2024",
  },
  {
    id: 4,
    name: "Fantasy Spellcaster",
    description: "Wizard character with various spell casting animations",
    image: "/placeholder.svg?height=200&width=200",
    creator: "MagicPixels",
    date: "January 30, 2024",
  },
  {
    id: 5,
    name: "Space Explorer",
    description: "Astronaut character with zero-gravity movement set",
    image: "/placeholder.svg?height=200&width=200",
    creator: "CosmicArtist",
    date: "January 22, 2024",
  },
  {
    id: 6,
    name: "Retro Platformer Hero",
    description: "16-bit style character with complete animation set",
    image: "/placeholder.svg?height=200&width=200",
    creator: "RetroGameDev",
    date: "January 15, 2024",
  },
]

export default function SpriteShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentSprite, setCurrentSprite] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const spritesPerPage = 3

  const totalPages = Math.ceil(sampleSprites.length / spritesPerPage)
  const displayedSprites = sampleSprites.slice(currentPage * spritesPerPage, (currentPage + 1) * spritesPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section className="py-24 relative overflow-hidden bg-black" id="showcase">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 opacity-80 z-0"></div>

      {/* Animated background dots */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-500/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Sprite Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Check out these amazing sprites created with our platform
          </p>
        </motion.div>

        <div className="relative">
          {/* Sprite grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {displayedSprites.map((sprite, index) => (
                <motion.div
                  key={sprite.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all cursor-pointer group"
                    onClick={() => setCurrentSprite(sprite.id)}
                  >
                    <div className="relative overflow-hidden">
                      <div className="aspect-square bg-gray-800 flex items-center justify-center overflow-hidden">
                        <motion.img
                          src={sprite.image}
                          alt={sprite.name}
                          className="object-contain w-full h-full p-4"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center">
                        <div className="p-4 text-center w-full">
                          <ZoomIn className="w-6 h-6 mx-auto text-blue-400 mb-2" />
                          <span className="text-sm text-gray-300">View Details</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                        {sprite.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">{sprite.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{sprite.creator}</span>
                        <span>{sprite.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-10 gap-4">
            <motion.button
              className="p-2 rounded-full bg-gray-800 text-white hover:bg-blue-600 transition-colors"
              onClick={prevPage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <motion.button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${currentPage === i ? "bg-blue-500" : "bg-gray-700"}`}
                  onClick={() => setCurrentPage(i)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            <motion.button
              className="p-2 rounded-full bg-gray-800 text-white hover:bg-blue-600 transition-colors"
              onClick={nextPage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Sprite detail modal */}
        <AnimatePresence>
          {currentSprite !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCurrentSprite(null)}
            >
              <motion.div
                className="bg-gray-900 rounded-xl max-w-2xl w-full overflow-hidden border border-blue-500/30 shadow-2xl"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {sampleSprites.find((s) => s.id === currentSprite) && (
                  <>
                    <div className="relative">
                      <img
                        src={sampleSprites.find((s) => s.id === currentSprite)?.image || "/placeholder.svg"}
                        alt={sampleSprites.find((s) => s.id === currentSprite)?.name}
                        className="w-full h-64 object-contain bg-gray-800 p-6"
                      />
                      <button
                        className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/80 text-white hover:bg-red-600 transition-colors"
                        onClick={() => setCurrentSprite(null)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {sampleSprites.find((s) => s.id === currentSprite)?.name}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {sampleSprites.find((s) => s.id === currentSprite)?.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <p className="text-gray-400 text-sm">Creator</p>
                          <p className="text-white">{sampleSprites.find((s) => s.id === currentSprite)?.creator}</p>
                        </div>
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <p className="text-gray-400 text-sm">Created On</p>
                          <p className="text-white">{sampleSprites.find((s) => s.id === currentSprite)?.date}</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          onClick={() => setCurrentSprite(null)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Ready to create your own sprites?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join our community of artists and game developers to transform your art into game-ready sprites.
          </p>
          <Link href="/Work">
          <motion.button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            Start Creating Now
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

