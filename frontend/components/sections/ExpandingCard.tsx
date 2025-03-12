"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ExpandingCardProps {
  title: string
  image: string
  onClick: () => void
  className?: string
}

export default function ExpandingCard({ title, image, onClick, className = "" }: ExpandingCardProps) {
  return (
    <motion.div
      className={`rounded-xl overflow-hidden cursor-pointer ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-400">{title}</h3>
        <p className="text-gray-400 text-sm mt-1">Click to view details</p>
      </div>
    </motion.div>
  )
}

