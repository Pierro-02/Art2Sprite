'use client'

import { useState } from "react"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import ExpandingCard from "@/components/sections/ExpandingCard"
import Sidebar from "@/components/sections/Sidebar"

import poster from "@/assets/FYP Poster.png"
import landpg from "@/assets/LandingPage.png"
import uppg from "@/assets/UploadPage.png"
import d1 from "@/assets/d1.png"
import d2 from "@/assets/d2.png"
import d3 from "@/assets/d3.png"
import d4 from "@/assets/d4.png"

export default function Process() {
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
      description: "This poster provides an overview of our final year project, highlighting key features and methodologies. It showcases the main objectives, the problem we're addressing, and the innovative solutions we've developed.",
      width: 700
    },
    {
      src: landpg,
      alt: "Landing Page Prototype",
      title: "Landing Page Design",
      description: "Our landing page prototype showcases the main features and value proposition of our application. It's designed to capture user attention and clearly communicate the benefits of our solution, with a focus on user-friendly navigation and compelling visuals.",
      width: 700
    },
    {
      src: uppg,
      alt: "Upload Page Prototype",
      title: "Upload Page Design",
      description: "The upload page prototype demonstrates the user interface for uploading and processing files in our system. It's optimized for ease of use, with clear instructions and visual feedback to guide users through the process efficiently.",
      width: 700
    },
    {
      src: d1,
      alt: "Diagram 1",
      title: "System Architecture",
      description: "This diagram illustrates the overall architecture of our system, showing how different components interact. It provides a high-level view of the data flow, processing units, and user interfaces, helping to visualize the complexity and efficiency of our solution.",
      width: 700
    },
    {
      src: d2,
      alt: "Diagram 2",
      title: "Data Flow",
      description: "The data flow diagram visualizes how information moves through our application, from input to output. It highlights the various stages of data processing, storage, and retrieval, giving insight into the efficiency and security measures of our system.",
      width: 700
    },
    {
      src: d3,
      alt: "Diagram 3",
      title: "User Journey Map",
      description: "This diagram maps out the typical user journey through our application, highlighting key touchpoints and interactions. It helps us understand the user experience, identify potential pain points, and optimize the flow for maximum user satisfaction.",
      width: 700
    },
    {
      src: d4,
      alt: "Diagram 4",
      title: "Technology Stack",
      description: "An overview of the technology stack used in our project, showcasing the various tools and frameworks employed. This diagram illustrates the integration of front-end, back-end, and database technologies, emphasizing the modern and scalable nature of our solution.",
      width: 700
    },
  ]

  return (
    <main className="bg-gray-100 min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Project Process</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processes.map((process, index) => (
            <ExpandingCard
              key={index}
              title={process.title}
              image={process.src.src}
              onClick={() => setSelectedProcess(process)}
            />
          ))}
        </div>
      </div>

      <Footer />

      <Sidebar
        isOpen={!!selectedProcess}
        onClose={() => setSelectedProcess(null)}
        title={selectedProcess?.title || ""}
        description={selectedProcess?.description || ""}
        image={selectedProcess?.src || ""}
        width={selectedProcess?.width || 0}
      />
    </main>
  )
}
