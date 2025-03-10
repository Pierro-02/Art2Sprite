import Image from "next/image"
import { X } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  image: string
  width: number
}

export default function Sidebar({ isOpen, onClose, title, description, image, width }: SidebarProps) {
  return (
    <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full overflow-y-auto">
        <div className="relative h-[600px]">
          <Image src={image || "/placeholder.svg"} alt={title} layout="fill" objectFit="contain" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md text-gray-800 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}