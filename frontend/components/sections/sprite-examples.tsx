"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { BookOpen } from "lucide-react"

interface ExampleSprite {
  type: string
  url: string
}

interface SpriteExamplesProps {
  exampleSprites: ExampleSprite[]
}

export function SpriteExamples({ exampleSprites }: SpriteExamplesProps) {
  return (
    <div>
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
  )
}

