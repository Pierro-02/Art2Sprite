"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Upload } from "lucide-react"

interface ImageUploadProps {
  imageUploaded: (imageData: string) => void
  resetImage?: boolean
}

export function ImageUpload({ imageUploaded, resetImage = false }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Reset the image when resetImage prop changes to true
  useEffect(() => {
    if (resetImage) {
      setPreviewUrl(null)
    }
  }, [resetImage])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreviewUrl(result)
      imageUploaded(result)
    }

    reader.readAsDataURL(file)
  }

  return (
    <div
      className={`flex flex-col items-center justify-center p-6 ${isDragging ? "bg-blue-500/10 border-blue-500" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {previewUrl ? (
        <div className="w-full">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            className="max-h-32 mx-auto object-contain rounded-md"
          />
          <p className="text-center text-sm text-blue-400 mt-2">Image uploaded</p>
        </div>
      ) : (
        <>
          <Upload className="w-10 h-10 text-blue-500 mb-2" />
          <p className="text-center text-gray-300 mb-2">Drag and drop your image here</p>
          <p className="text-center text-gray-500 text-sm mb-4">or</p>
          <label className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
            Browse Files
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </>
      )}
    </div>
  )
}

