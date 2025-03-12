"use client"

import type React from "react"

import { useState } from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import { getSprite } from "@/api/sprite"
import { Sparkles, Upload, Wand2, BookOpen, ImageIcon } from "lucide-react"
import { ImageUpload } from "@/components/ImageUpload"

export function Hero() {
  const [imageUploaded, setImageUploaded] = useState<string | null>(null)
  const [animationType, setAnimationType] = useState("idle")
  const [spriteSheetUrl, setSpriteSheetUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getImageAsBlobURL = async (filePath: string): Promise<string | null> => {
    try {
      const response = await fetch(filePath)
      if (!response.ok) {
        throw new Error("Failed to load image")
      }
      const blob = await response.blob()
      return URL.createObjectURL(blob)
    } catch (error) {
      console.error("Error loading image:", error)
      return null
    }
  }

  const onCreateClicked = async () => {
    if (imageUploaded) {
      setIsLoading(true)
      try {
        const result = await getSprite(imageUploaded)
        if (result) {
          const path = "/pix2pix_experiment/test_latest/images" + "/test_fake_B.png"
          const blobURL = await getImageAsBlobURL(path)
          setSpriteSheetUrl(blobURL)
          console.log(`Images retrieved: ${result.message} ${result.results_dir}`)
        }
      } catch (error) {
        console.error("Error generating sprite:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleAnimationTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAnimationType(event.target.value)
  }

  // Example sprite sheets for different animation types
  const exampleSprites = [
    { type: "idle", url: "/placeholder.svg?height=150&width=150" },
    { type: "walking", url: "/placeholder.svg?height=150&width=150" },
    { type: "jumping", url: "/placeholder.svg?height=150&width=150" },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80 z-0"></div>

      {/* Animated background dots */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-500/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Sprite Sheet Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your sketches into animated game sprites with AI-powered technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Panel (Upload and Description) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 mr-3">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">1. Upload Your Sketch</h2>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="border-dashed border-2 border-gray-600 rounded-lg p-4 mb-8 bg-gray-800/50 transition-all duration-300"
            >
              <ImageUpload imageUploaded={(uploaded: string) => setImageUploaded(uploaded)} />
            </motion.div>

            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 mr-3">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">2. Choose Animation Type</h2>
            </div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <select
                id="animation"
                value={animationType}
                onChange={handleAnimationTypeChange}
                className="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                <option value="idle">Idle</option>
                <option value="walking">Walking</option>
                <option value="jumping">Jumping</option>
                <option value="running">Running</option>
                <option value="attack">Attack</option>
              </select>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full mt-6 py-3 px-6 rounded-md font-bold text-white flex items-center justify-center transition-all duration-300 ${
                imageUploaded
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20"
                  : "bg-gray-700 cursor-not-allowed"
              }`}
              disabled={!imageUploaded || isLoading}
              onClick={onCreateClicked}
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-2"
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create Sprite Sheet
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Right Panel (Output and Examples) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-400 mr-3">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Sprite Output</h2>
            </div>

            <motion.div
              initial={{ opacity: 0.8 }}
              animate={{
                opacity: 1,
                boxShadow: spriteSheetUrl ? "0 0 15px rgba(59, 130, 246, 0.3)" : "none",
              }}
              className="border-2 border-gray-700 rounded-lg p-4 h-[250px] flex items-center justify-center bg-gray-800/50 relative overflow-hidden"
            >
              {spriteSheetUrl ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <motion.div
                    animate={{
                      x: [-5, 5, -5],
                      y: [-3, 3, -3],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src={spriteSheetUrl || "/placeholder.svg"}
                      alt="Sprite Sheet"
                      width={192}
                      height={192}
                      style={{ objectFit: "contain" }}
                      className="rounded-md"
                    />
                  </motion.div>

                  {/* Animated particles around the sprite */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-blue-400 opacity-70"
                        initial={{
                          x: Math.random() * 200 + 50,
                          y: Math.random() * 200 + 25,
                          opacity: 0,
                        }}
                        animate={{
                          y: [null, Math.random() * -100 - 50],
                          opacity: [0, 0.7, 0],
                          scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: Math.random() * 2,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center">
                  <p className="text-blue-400 mb-2">Your sprite sheet will appear here</p>
                  <motion.div className="relative">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <Sparkles className="w-10 h-10 text-blue-500/70 mx-auto" />
                    </motion.div>

                    {/* Animated circles */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 rounded-full border-2 border-blue-500/30 opacity-30"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-24 h-24 -ml-12 -mt-12 rounded-full border-2 border-blue-500/20 opacity-20"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.05, 0.2] }}
                      transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                    />
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Examples Section */}
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-600 to-green-400 mr-3">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">Examples</h2>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {exampleSprites.map((sprite, index) => (
                  <motion.div
                    key={sprite.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gray-800 p-2 rounded-lg border border-gray-700"
                  >
                    <Image
                      src={sprite.url || "/placeholder.svg"}
                      alt={`${sprite.type} example`}
                      width={150}
                      height={100}
                      className="rounded-md w-full h-auto"
                    />
                    <p className="text-center text-sm font-medium text-blue-400 mt-2 capitalize">{sprite.type}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tutorial Teaser */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.02 }}
              className="mt-8 p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                <span className="mr-2">✨</span>
                Pro Tips
              </h3>
              <p className="text-gray-400 text-sm">
                For best results, use clear line art with distinct features. Simple sketches work better than complex
                ones.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

