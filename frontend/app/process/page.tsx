"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/navbar"
import ExpandingCard from "@/components/sections/ExpandingCard"
import Sidebar from "@/components/sections/Sidebar"

import poster from "@/assets/FYP Poster.png"
import landpg from "@/assets/LandingPage.png"
import uppg from "@/assets/UploadPage.png"
import d1 from "@/assets/d1.png"
import d2 from "@/assets/d2.png"
import d3 from "@/assets/d3.png"
import d4 from "@/assets/d4.png"


export default function Home() {
  const [selectedProcess, setSelectedProcess] = useState<null | {
    title: string
    description: string
    src: string
    width: number
  }>(null)

  const processes = [
    {
      src: poster,
      alt: "Poster",
      title: "Project Poster",
      description:
        "This poster provides an overview of our final year project, highlighting key features and methodologies. It showcases the main objectives, the problem we're addressing, and the innovative solutions we've developed.",
      width: 700,
    },
    {
      src: landpg,
      alt: "Landing Page Prototype",
      title: "Landing Page Design",
      description:
        "Our landing page prototype showcases the main features and value proposition of our application. It's designed to capture user attention and clearly communicate the benefits of our solution, with a focus on user-friendly navigation and compelling visuals.",
      width: 700,
    },
    {
      src: uppg,
      alt: "Upload Page Prototype",
      title: "Upload Page Design",
      description:
        "The upload page prototype demonstrates the user interface for uploading and processing files in our system. It's optimized for ease of use, with clear instructions and visual feedback to guide users through the process efficiently.",
      width: 700,
    },
    {
      src: d1,
      alt: "Diagram 1",
      title: "System Architecture",
      description:
        "This diagram illustrates the overall architecture of our system, showing how different components interact. It provides a high-level view of the data flow, processing units, and user interfaces, helping to visualize the complexity and efficiency of our solution.",
      width: 700,
    },
    {
      src: d2,
      alt: "Diagram 2",
      title: "Data Flow",
      description:
        "The data flow diagram visualizes how information moves through our application, from input to output. It highlights the various stages of data processing, storage, and retrieval, giving insight into the efficiency and security measures of our system.",
      width: 700,
    },
    {
      src: d3,
      alt: "Diagram 3",
      title: "User Journey Map",
      description:
        "This diagram maps out the typical user journey through our application, highlighting key touchpoints and interactions. It helps us understand the user experience, identify potential pain points, and optimize the flow for maximum user satisfaction.",
      width: 700,
    },
    {
      src: d4,
      alt: "Diagram 4",
      title: "Technology Stack",
      description:
        "An overview of the technology stack used in our project, showcasing the various tools and frameworks employed. This diagram illustrates the integration of front-end, back-end, and database technologies, emphasizing the modern and scalable nature of our solution.",
      width: 700,
    },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden">
      

      <Navbar />


      {/* Process Section */}
      <section className="py-16 relative z-10 mt-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 ">
              Project Process
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-8">
              Explore the development journey of our sprite generation platform
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {processes.map((process, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm opacity-70"></div>
                  <ExpandingCard
                    title={process.title}
                    image={process.src.src}
                    onClick={() => setSelectedProcess(process)}
                    className="bg-gradient-to-b from-white to-gray-100 border border-gray-700 shadow-xl relative"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Sidebar
        isOpen={!!selectedProcess}
        onClose={() => setSelectedProcess(null)}
        title={selectedProcess?.title || ""}
        description={selectedProcess?.description || ""}
        image={selectedProcess?.src || ""}
        width={selectedProcess?.width || 0}
        
      />
      <Footer />

      
    </main>
  )
}

