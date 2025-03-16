"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"

const timelineEvents = [
  {
    year: "Module 1",
    title: "Art2Sprite Founded",
    description: "Our journey began with a passion for AI-powered art transformation.",
    details:
      "Art2Sprite was created to explore the potential of AI in generating high-quality sprites from sketches, aiming to assist digital artists and game developers.",
  },
  {
    year: "Module 2",
    title: "Research & Data Collection",
    description: "Conducted extensive research on image processing and AI-based sprite generation.",
    details:
      "Collected diverse datasets, cleaned and annotated images, and laid the foundation for developing our proprietary AI model.",
  },
  {
    year: "Module 3",
    title: "AI Model Development",
    description: "Fine-tuned Image-to-Image GAN for enhanced sprite transformation.",
    details:
      "Optimized generative adversarial networks (GANs) to accurately convert hand-drawn sketches into pixel-art sprites with high precision.",
  },
  {
    year: "Module 4",
    title: "Training & Optimization",
    description: "Trained the AI model on processed data and refined outputs.",
    details:
      "Leveraged deep learning techniques to enhance sprite generation quality, ensuring consistent and accurate results across multiple art styles.",
  },
  {
    year: "Module 5",
    title: "Platform Launch & Post-Processing",
    description: "Released the web-based Art2Sprite platform with post-processing tools.",
    details:
      "Launched a user-friendly interface, allowing artists to fine-tune AI-generated sprites, apply enhancements, and validate outputs before use in digital projects.",
  },
];

const PixelIcon = ({ progress }: { progress: number }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    style={{ transform: `scale(${progress})` }}
  >
    <rect x="4" y="4" width="4" height="4" fill="currentColor" />
    <rect x="8" y="4" width="4" height="4" fill="currentColor" />
    <rect x="12" y="4" width="4" height="4" fill="currentColor" />
    <rect x="16" y="4" width="4" height="4" fill="currentColor" />
    <rect x="4" y="8" width="4" height="4" fill="currentColor" />
    <rect x="16" y="8" width="4" height="4" fill="currentColor" />
    <rect x="4" y="12" width="4" height="4" fill="currentColor" />
    <rect x="16" y="12" width="4" height="4" fill="currentColor" />
    <rect x="4" y="16" width="4" height="4" fill="currentColor" />
    <rect x="8" y="16" width="4" height="4" fill="currentColor" />
    <rect x="12" y="16" width="4" height="4" fill="currentColor" />
    <rect x="16" y="16" width="4" height="4" fill="currentColor" />
  </svg>
)

export default function Timeline() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section ref={containerRef} className="py-20 bg-black overflow-hidden" id="timeline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Journey</h2>
          <p className="mt-4 text-lg text-gray-400">The evolution of Art2Sprite through the years</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-500/20"
            style={{ scaleY: scaleX }}
          />

          {/* Pixel icon */}
          <motion.div
            className="sticky top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-blue-400"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          >
            <PixelIcon progress={useTransform(scrollYProgress, [0, 1], [0.5, 1]) as any} />
          </motion.div>

          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={`${event.year}-${event.title}`}
              event={event}
              index={index}
              isExpanded={expandedEvent === index}
              onToggle={() => setExpandedEvent(expandedEvent === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineEvent({
  event,
  index,
  isExpanded,
  onToggle,
}: {
  event: (typeof timelineEvents)[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      className={`mb-12 flex justify-between items-center w-full ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="w-5/12" />
      <div className="z-20">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]">
          <div className="w-3 h-3 bg-black rounded-full" />
        </div>
      </div>
      <motion.div
        className="w-5/12 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
      >
        <div className="p-4 bg-gray-900/80 rounded-lg shadow-md border border-blue-500/20 hover:border-blue-500/40 transition-all">
          <span className="font-bold text-blue-400">{event.year}</span>
          <h3 className="text-lg font-semibold mb-1 text-white">{event.title}</h3>
          <p className="text-gray-400">{event.description}</p>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-sm text-gray-400 border-t border-gray-700 pt-2">{event.details}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}