"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { getBasicSprite, getAnimatedSprite } from "@/api/newsprite"
import { Sparkles, Upload, Wand2, RefreshCw } from "lucide-react"
import { ImageUpload } from "@/components/ImageUpload"
import { SpriteOutput } from "./sprite-output"


const idle = "/assets/idle.gif"
const jump = "/assets/jump.gif"
const run = "/assets/walking.gif"

export function Hero() {
  const [imageUploaded, setImageUploaded] = useState<string | null>(null)
  const [animationType, setAnimationType] = useState("idle")
  const [basicSpriteUrl, setBasicSpriteUrl] = useState<string | null>(null)
  const [animatedSpriteUrl, setAnimatedSpriteUrl] = useState<string | null>(null)
  const [isLoadingBasic, setIsLoadingBasic] = useState(false)
  const [isLoadingAnimated, setIsLoadingAnimated] = useState(false)

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

  const onCreateBasicSprite = async () => {
    if (imageUploaded) {
      setIsLoadingBasic(true)
      // Clear any existing sprite to show loading animation
      setBasicSpriteUrl(null)
      try {
        const result = await getBasicSprite(imageUploaded)
        if (result) {
          const blobURL = await getImageAsBlobURL(result.sprite_url || "/placeholder.svg?height=192&width=192")
          setBasicSpriteUrl(blobURL)
          console.log(`Basic sprite generated: ${result.message}`)
        }
      } catch (error) {
        console.error("Error generating basic sprite:", error)
      } finally {
        setIsLoadingBasic(false)
      }
    }
  }

  const onCreateAnimatedSprite = async () => {
    if (imageUploaded && basicSpriteUrl) {
      setIsLoadingAnimated(true)
      // Clear any existing animated sprite to show loading animation
      setAnimatedSpriteUrl(null)
      try {
        const result = await getAnimatedSprite(imageUploaded, animationType)
        if (result) {
          const blobURL = await getImageAsBlobURL(result.sprite_url || "/placeholder.svg?height=192&width=384")
          setAnimatedSpriteUrl(blobURL)
          console.log(`Animated sprite generated: ${result.message}`)
        }
      } catch (error) {
        console.error("Error generating animated sprite:", error)
      } finally {
        setIsLoadingAnimated(false)
      }
    }
  }

  const handleAnimationTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAnimationType(event.target.value)
    // Reset animated sprite when animation type changes
    setAnimatedSpriteUrl(null)
  }

  // Function to reset all states and start over
  const handleRefresh = () => {
    setImageUploaded(null)
    setBasicSpriteUrl(null)
    setAnimatedSpriteUrl(null)
    setAnimationType("idle")
  }

  // Example sprite sheets for different animation types
  const exampleSprites = [
    { type: "idle", url: idle },
    { type: "Running", url: run },
    { type: "jumping", url: jump },
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
          {/* Left Panel (Upload and Animation Controls) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl"
          >
            {/* Header with Refresh Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Sprite Generator</h2>
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                transition={{ rotate: { duration: 0.5 } }}
                onClick={handleRefresh}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 hover:text-white transition-colors"
                title="Start over with a new image"
              >
                <RefreshCw className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Step 1: Upload and Generate Basic Sprite */}
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
              <ImageUpload
                imageUploaded={(uploaded: string) => setImageUploaded(uploaded)}
                resetImage={!imageUploaded}
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full mb-8 py-3 px-6 rounded-md font-bold text-white flex items-center justify-center transition-all duration-300 ${isLoadingBasic
                ? "bg-blue-600 cursor-wait"
                : imageUploaded && !basicSpriteUrl
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20"
                  : basicSpriteUrl
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-700 cursor-not-allowed"
                }`}
              disabled={!imageUploaded || isLoadingBasic}
              onClick={onCreateBasicSprite}
            >
              {isLoadingBasic ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-2"
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Generating Basic Sprite...
                </>
              ) : basicSpriteUrl ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Basic Sprite Generated
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Basic Sprite
                </>
              )}
            </motion.button>

            {/* Step 2: Animation Controls */}
            <div className="flex items-center mb-4">
              <div
                className={`p-2 rounded-lg ${basicSpriteUrl ? "bg-gradient-to-br from-purple-600 to-purple-400" : "bg-gradient-to-br from-gray-600 to-gray-500"} mr-3`}
              >
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-semibold ${basicSpriteUrl ? "text-white" : "text-gray-400"}`}>
                2. Choose Animation Type
              </h2>
            </div>

            <motion.div whileHover={basicSpriteUrl ? { scale: 1.02 } : {}} className="mb-4">
              <select
                id="animation"
                value={animationType}
                onChange={handleAnimationTypeChange}
                disabled={!basicSpriteUrl}
                className={`w-full ${basicSpriteUrl
                  ? "bg-gray-800 text-gray-300 border-gray-700 focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed"
                  } border rounded-md py-3 px-4 focus:outline-none transition-all duration-300`}
              >
                <option value="idle">Idle</option>
                <option value="walking">Walking</option>
                <option value="jumping">Jumping</option>
              </select>
            </motion.div>

            <motion.button
              whileHover={basicSpriteUrl ? { scale: 1.05 } : {}}
              whileTap={basicSpriteUrl ? { scale: 0.95 } : {}}
              className={`w-full py-3 px-6 rounded-md font-bold text-white flex items-center justify-center transition-all duration-300 ${!basicSpriteUrl
                ? "bg-gray-700 opacity-60 cursor-not-allowed"
                : isLoadingAnimated
                  ? "bg-purple-600 cursor-wait"
                  : animatedSpriteUrl
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20"
                }`}
              disabled={!basicSpriteUrl || isLoadingAnimated}
              onClick={onCreateAnimatedSprite}
            >
              {isLoadingAnimated ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-2"
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Generating Animation...
                </>
              ) : animatedSpriteUrl ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Animation Generated
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Animation
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Right Panel (Output and Examples) */}
          <SpriteOutput
            basicSpriteUrl={basicSpriteUrl}
            animatedSpriteUrl={animatedSpriteUrl}
            isLoadingBasic={isLoadingBasic}
            isLoadingAnimated={isLoadingAnimated}
            exampleSprites={exampleSprites}
          />
        </div>
      </div>
    </section>
  )
}

