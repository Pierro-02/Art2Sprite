import Image from "next/image"

interface ExpandingCardProps {
  title: string
  image: string
  onClick: () => void
}

export default function ExpandingCard({ title, image, onClick }: ExpandingCardProps) {
  return (
    <div 
      className="relative overflow-hidden h-[300px] rounded-lg shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
      onClick={onClick}
    >
      <div className="relative h-full">
        <Image src={image || "/placeholder.svg"} alt={title} layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
    </div>
  )
}
