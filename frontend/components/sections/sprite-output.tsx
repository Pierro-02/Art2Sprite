"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { ImageIcon, Download, Sparkles } from "lucide-react"
import { SpriteExamples } from "./sprite-examples"

// Add a loading animation component to the sprite-output.tsx file

// Add this LoadingAnimation component after the imports
function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="w-16 h-16 relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-2 left-2 right-2 bottom-2 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </motion.div>
      <p className="text-blue-400 mt-4 text-sm font-medium">Generating sprite...</p>
    </div>
  )
}

interface SpriteOutputProps {
  basicSpriteUrl: string | null
  animatedSpriteUrl: string | null
  isLoadingBasic: boolean
  isLoadingAnimated: boolean
  exampleSprites: { type: string; url: string }[]
}

// Update the getImageAsBlobURL function to handle placeholder URLs
const getImageAsBlobURL = async (url: string): Promise<string> => {
  // If it's already a blob URL or a placeholder, return it directly
  if (url.startsWith("blob:") || url.includes("placeholder.svg")) {
    return url
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to load image")
    }
    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error("Error loading image:", error)
    return "/placeholder.svg?height=192&width=192"
  }
}

export function SpriteOutput({
  basicSpriteUrl,
  animatedSpriteUrl,
  isLoadingBasic,
  isLoadingAnimated,
  exampleSprites,
}: SpriteOutputProps) {
  const handleDownload = async (url: string | null, filename: string) => {
    if (url) {
      // For placeholder images, we need to fetch them first
      const downloadUrl = await getImageAsBlobURL(url)

      // Create an anchor element and trigger download
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl"
    >
      {/* Basic Sprite Output */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-400 mr-3">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Basic Sprite</h2>
          </div>

          {/* Download button for basic sprite */}
          {basicSpriteUrl && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDownload(basicSpriteUrl, "basic-sprite.png")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 px-4 rounded-md shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </motion.button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0.8 }}
          animate={{
            opacity: 1,
            boxShadow: basicSpriteUrl ? "0 0 15px rgba(59, 130, 246, 0.3)" : "none",
          }}
          className="border-2 border-gray-700 rounded-lg p-4 h-[180px] flex items-center justify-center bg-gray-800/50 relative overflow-hidden"
        >
          {isLoadingBasic ? (
            <LoadingAnimation />
          ) : basicSpriteUrl ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* Static image without animation */}
              <Image
                src={basicSpriteUrl || "/placeholder.svg"}
                alt="Basic Sprite"
                width={150}
                height={150}
                style={{ objectFit: "contain" }}
                className="rounded-md"
              />
            </motion.div>
          ) : (
            <div className="text-center">
              <p className="text-blue-400 mb-2">Your basic sprite will appear here</p>
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
            </div>
          )}
        </motion.div>
      </div>

      {/* Animated Sprite Output */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 mr-3">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Animated Sprite Sheet</h2>
          </div>

          {/* Download button for animated sprite */}
          {animatedSpriteUrl && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDownload(animatedSpriteUrl, "animated-sprite.png")}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white py-2 px-4 rounded-md shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </motion.button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0.8 }}
          animate={{
            opacity: 1,
            boxShadow: animatedSpriteUrl ? "0 0 15px rgba(124, 58, 237, 0.3)" : "none",
          }}
          className="border-2 border-gray-700 rounded-lg p-4 h-[180px] flex items-center justify-center bg-gray-800/50 relative overflow-hidden"
        >
          {isLoadingAnimated ? (
            <LoadingAnimation />
          ) : animatedSpriteUrl ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* Static image without animation */}
              <Image
                src={animatedSpriteUrl || "/placeholder.svg"}
                alt="Animated Sprite Sheet"
                width={300}
                height={150}
                style={{ objectFit: "contain" }}
                className="rounded-md"
              />
            </motion.div>
          ) : basicSpriteUrl ? (
            <div className="text-center">
              <p className="text-purple-400 mb-2">Select an animation type and generate your animated sprite</p>
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
                <Sparkles className="w-10 h-10 text-purple-500/70 mx-auto" />
              </motion.div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 mb-2">Generate a basic sprite first</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Examples Section - Moved to right panel */}
      <div className="pt-4 border-t border-gray-700">
        <SpriteExamples exampleSprites={exampleSprites} />
      </div>

      {/* Pro Tips */}
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
          For best results, use clear line art with distinct features. Simple sketches work better than complex ones.
        </p>
      </motion.div>
    </motion.div>
  )
}

