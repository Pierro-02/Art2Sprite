"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll } from "framer-motion"
import Image from "next/image" // Import the Next.js Image component

import Sonic from "@/assets/Sonic.gif"
import Mario from "@/assets/SuperMario.gif"
import Fighter from "@/assets/Fighter.gif"
import Idle from "@/assets/Idle.gif"

interface Project {
  id: number
  title: string
  cardtitle: string
  description: string
  shortdescription: string
  color: string
  imageSrc: any 
}

export default function OverlappingCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const nextSectionRef = useRef<HTMLDivElement>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "ART2SPRITE",
      cardtitle: "Sonic - High-Speed Character Animation",
      shortdescription:
        "This image represents the high-speed motion of a character, showcasing the ability of ART2SPRITE to capture dynamic movements with smooth animations.",
      description:
        "ART2SPRITE (A2S) is an AI-driven image processing platform designed to transform hand-drawn sketches into fully functional digital sprites for video games, animations, and other digital media. It automates the conversion process, allowing artists and developers to streamline sprite creation while maintaining high-quality results.",
      color: "bg-rose-100 border-rose-300",
      imageSrc: Sonic,
    },
    {
      id: 2,
      title: "Key Features",
      cardtitle: "Mario - Classic Game Sprites",
      shortdescription:
        "A classic example of pixel art sprites, demonstrating how ART2SPRITE can refine and enhance traditional gaming characters for modern use.",
      description:
        "Sketch-to-Image Conversion – Transforms raw sketches into polished digital assets.\n" +
        " Automated Sprite Generation – AI-driven techniques generate sprites with minimal manual effort.\n" +
        " Sprite Sheet Creation – Organizes multiple frames into a structured sprite sheet for animation.",
      color: "bg-blue-100 border-blue-300",
      imageSrc: Mario,
    },
    {
      id: 3,
      title: "More Key Features",
      cardtitle: "Idle Animation - Smooth Character Transitions",
      shortdescription:
        "Idle animations are crucial for game characters. ART2SPRITE ensures fluid transitions and polished sprite frames for seamless integration.",
      description:
        " Image Enhancement – Enhances quality, sharpness, and color for professional-grade sprites.\n" +
        " Background Removal – Isolates sprites from backgrounds for seamless integration into projects.\n" +
        " Customizable Output – Offers resolution adjustments, color variations, and export options.",
      color: "bg-amber-100 border-amber-300",
      imageSrc: Idle,
    },
    {
      id: 4,
      title: "Interactive Preview",
      cardtitle: "Fighter - Dynamic Combat Poses",
      shortdescription:
        "This represents a fighting character in action. ART2SPRITE captures detailed combat animations with precision and accuracy.",
      description:
        "Interactive Preview – Allows users to see real-time changes before finalizing output.\n" +
        "\n" +
        "ART2SPRITE is particularly useful for indie game developers, animators, and digital artists looking for a fast and efficient way to create production-ready sprites.",
      color: "bg-emerald-100 border-emerald-300",
      imageSrc: Fighter,
    },
  ]

  // State for tracking which card is active and if we've scrolled past all cards
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [hasScrolledPast, setHasScrolledPast] = useState(false)
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false) // NEW STATE

  // Set up scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Add smooth scrolling to the document
  useEffect(() => {
    // Add smooth scrolling to the entire page
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      // Clean up when component unmounts
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  // Calculate the height needed for the sticky section
  // We only need enough height to trigger the scroll animations
  // Once we've scrolled through all cards, we'll unlock scrolling
  const stickyHeight = (projects.length + 1) * 70 // vh units - just enough to trigger all cards

  // Map scroll progress to active card index
  useEffect(() => {
    // Function to handle scroll updates
    const handleScroll = (value: number) => {
      // Calculate which card should be active based on scroll position
      // Map the 0-1 scroll progress to 0-(projects.length-1)
      const calculatedIndex = Math.min(Math.floor(value * projects.length), projects.length - 1)

      // Update states based on scroll position
      setCurrentCardIndex(calculatedIndex)

      // Check if we've scrolled through all cards (using a threshold)
      const hasReachedEnd = value > 0.98

      if (hasReachedEnd && !hasScrolledPast) {
        setHasScrolledPast(true)
      } else if (!hasReachedEnd && hasScrolledPast) {
        setHasScrolledPast(false)
      }
    }

    // Subscribe to scroll updates
    const unsubscribe = scrollYProgress.onChange(handleScroll)

    // Clean up subscription
    return () => unsubscribe()
  }, [scrollYProgress, projects.length, hasScrolledPast])

  // Trigger the auto-scroll only once
  useEffect(() => {
    if (hasScrolledPast && !hasAutoScrolled) {
      if (nextSectionRef.current) {
        nextSectionRef.current.scrollIntoView({ behavior: "smooth" })
        setHasAutoScrolled(true)
      }
    }
  }, [hasScrolledPast, hasAutoScrolled])

  // Get the current project safely
  const currentProject = projects[currentCardIndex] || projects[0]

  return (
    <>
      <div
        ref={sectionRef}
        className="relative"
        style={{
          height: hasScrolledPast ? "100vh" : `${stickyHeight}vh`,
        }}
      >
        <div ref={contentRef} className="w-full py-50 md:py-50 sticky top-0 h-screen overflow-hidden">
          <div className="container px-4 mx-auto">
            <h2
              className="text-4xl mt-10 md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Unlock The Power Of Sprites
            </h2>
            <p className="text-gray-400 text-center leading-relaxed mt-2 mb-8">
              Creating stunning sprites has never been easier. Transform your art into game-ready assets.
            </p>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              {/* Left column - Stacked cards */}
              <div className="relative w-full md:w-1/2 lg:w-2/5 h-[400px] md:h-[500px] mx-auto mt-40">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className={`absolute w-full rounded-xl border p-4 md:p-6 shadow-lg ${project.color}`}
                    style={{
                      top: `${index * 30}px`,
                      zIndex:
                        currentCardIndex === index
                          ? projects.length
                          : projects.length - Math.abs(currentCardIndex - index),
                    }}
                    animate={{
                      y: currentCardIndex === index ? 0 : currentCardIndex > index ? -100 : 100,
                      opacity: Math.max(0.4, 1 - Math.abs(currentCardIndex - index) * 0.2),
                      scale: currentCardIndex === index ? 1 : 1 - Math.abs(currentCardIndex - index) * 0.05,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{project.cardtitle}</h3>
                    <p className="text-gray-700 text-sm md:text-base whitespace-pre-line line-clamp-2 md:line-clamp-3">
                      {project.shortdescription}
                    </p>

                    {/* Image */}
                    <div className="aspect-video rounded-lg mt-3 overflow-hidden relative h-[180px] md:h-[220px]">
                      <Image
                        src={project.imageSrc || "/placeholder.svg"}
                        alt={`Project ${project.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{
                          objectFit: "fill",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right column - Project description */}
              <div className="flex items-center w-full md:w-1/2 lg:w-3/5">
                <div className="space-y-4 md:space-y-6 max-w-lg mx-auto md:mx-60">
                  <h3
                    className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center md:text-left mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {currentProject.title}
                  </h3>
                  <div className="w-16 md:w-20 h-1 bg-primary mx-auto md:mx-0"></div>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base text-center md:text-left">
                    {currentProject.description}
                  </p>

                  <div className="space-y-3 md:space-y-4 mt-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 flex items-center justify-center mr-2 md:mr-3 lg:mr-4 flex-shrink-0">
                        <span className="text-gray-500 text-sm md:text-base">01</span>
                      </div>
                      <p className="font-medium text-sm md:text-base">Innovative approach to problem-solving</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 flex items-center justify-center mr-2 md:mr-3 lg:mr-4 flex-shrink-0">
                        <span className="text-gray-500 text-sm md:text-base">02</span>
                      </div>
                      <p className="font-medium text-sm md:text-base">Sustainable and scalable solution</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 flex items-center justify-center mr-2 md:mr-3 lg:mr-4 flex-shrink-0">
                        <span className="text-gray-500 text-sm md:text-base">03</span>
                      </div>
                      <p className="font-medium text-sm md:text-base">User-centered design approach</p>
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <button className="mt-4 px-4 py-2 md:px-5 md:py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm md:text-base">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual indicator for transition */}
          {hasScrolledPast && (
            <motion.div
              className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
            </motion.div>
          )}
        </div>
        </div>

      <div>
        <section className="py-16 md:py-24 bg-muted/20 mt-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">Continue Exploring</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-background p-4 md:p-6 rounded-xl shadow-md">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Additional Content {item}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    This content appears after you've scrolled through all the project cards.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}