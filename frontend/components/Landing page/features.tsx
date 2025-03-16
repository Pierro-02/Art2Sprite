"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Wand2, Layers, Code, Smartphone } from "lucide-react"
import GridBall from "./grid-ball"

// Define feature data
const features = [
  {
    icon: <Wand2 className="h-10 w-10" />,
    title: "AI Conversion",
    description: "Transform any art style into pixel-perfect game sprites with our advanced AI technology.",
    details:
      "Our proprietary machine learning algorithms analyze your artwork and intelligently convert it to optimized sprite formats while preserving the original aesthetic. Support for multiple art styles and automatic optimization for different game engines.",
  },
  {
    icon: <Layers className="h-10 w-10" />,
    title: "Animation Tools",
    description: "Create fluid animations with intelligent frame interpolation and sprite sheet generation.",
    details:
      "Generate smooth animations from just a few keyframes. Our AI fills in the gaps, creating fluid motion that would take hours to draw manually. Export to industry-standard formats or directly to your game engine of choice.",
  },
  {
    icon: <Code className="h-10 w-10" />,
    title: "Sprite Sheet Generation",
    description: "Automatically compile sprites into organized sprite sheets.",
    details:
      "Save time with our AI-driven sprite sheet generator, which optimizes layout and spacing for game development, animation, and other digital media applications.",
  },
  {
    icon: <Smartphone className="h-10 w-10" />,
    title: "Create Anywhere",
    description: "Design on the go with our iOS and Android apps for on-the-fly sprite creation.",
    details:
      "Sketch ideas anywhere and instantly convert them to game-ready sprites. Our mobile apps include all the core functionality of the desktop platform, optimized for touch interfaces and on-the-go creativity.",
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section id="features" className="py-24 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our platform provides everything you need to transform your art into game-ready sprites.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" ref={ref}>
          {/* Interactive feature tabs */}
          <div className="order-2 lg:order-1">
            <div className="flex flex-wrap gap-2 mb-8">
              {features.map((feature, index) => (
                <motion.button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFeature === index
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {feature.title}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl"
              >
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${getGradientByIndex(activeFeature)} text-white`}>
                    {features[activeFeature].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{features[activeFeature].title}</h3>
                    <p className="text-gray-300 mb-4">{features[activeFeature].description}</p>
                    <p className="text-gray-400 text-sm mb-6">{features[activeFeature].details}</p>
                    <a
                      href="#"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* GridBall visualization */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-px h-px bg-white"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        boxShadow: "0 0 15px 2px rgba(255, 255, 255, 0.3)",
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <GridBall />
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">
                  Interactive visualization - click anywhere on the grid
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg hover:shadow-xl transition-all hover:border-gray-700">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${getGradientByIndex(index)} mb-4 inline-block`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Helper function to get gradient colors based on index
function getGradientByIndex(index: number) {
  const gradients = [
    "from-blue-600 to-blue-400", // AI Conversion
    "from-purple-600 to-purple-400", // Animation Tools
    "from-yellow-600 to-yellow-400", // Game Engine Plugins
    "from-green-600 to-green-400", // Mobile Creation
  ]

  return gradients[index % gradients.length]
}

