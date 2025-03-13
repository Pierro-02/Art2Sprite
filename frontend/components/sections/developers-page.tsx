"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Github, Linkedin, FileText, ExternalLink, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample team data - replace with actual team information
const teamMembers = [
  {
    id: 1,
    name: "Mohammad Attique",
    role: "Bald Narcotics mafia leader",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Useless peice of shit who does nashay",
    skills: [""],
    github: "https://github.com/Mattique20",
    linkedin: "https://www.linkedin.com/in/attique20/",
    resume: "/placeholder.svg", 
    email: "mattique02@outlook.com",
  },
  {
    id: 2,
    name: "Taimur Aamir",
    role: "CHAD",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Chad who runs Discord server, knows and can do everything, built a AI model using assembly language which solves world problems ",
    skills: ["TensorFlow", "PyTorch", "Computer Vision", "Neural Networks", "CUDA"],
    github: "https://github.com/Pierro-02",
    linkedin: "http://linkedin.com/in/mtaim/",
    resume: "/placeholder.svg", // Replace with actual resume PDF
    email: "Gigachad@gmail.com",
  },
  {
    id: 3,
    name: "Rayyan Zia",
    role: "Nigga",
    image: "/placeholder.svg?height=400&width=400",
    bio: "the only grp member with a woman and a job. Can hack fbi using css",
    skills: ["React", "TypeScript", "Next.js", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/RndmRyan",
    linkedin: "https://www.linkedin.com/in/rayyanzia/",
    resume: "/placeholder.svg", // Replace with actual resume PDF
    email: "marcus@art2sprite.com",
  },
 
]

export default function DevelopersPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 opacity-80  text-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-500/20"
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

      {/* Header */}
      <header className="relative pt-24 pb-10 text-center px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Meet Our Team
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The talented developers and designers behind Art2Sprite
        </motion.p>
      </header>

      {/* Team grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
              onClick={() => setSelectedMember(member.id)}
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all cursor-pointer h-full">
                <div className="relative overflow-hidden">
                  <div className="aspect-square bg-gray-800">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center">
                    <div className="p-4 text-center w-full">
                      <span className="text-sm text-blue-400">View Profile</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{member.name}</h2>
                  <p className="text-blue-400 mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm line-clamp-3">{member.bio}</p>

                  <div className="mt-4 flex space-x-3">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.resume}
                      download={`${member.name.replace(/\s+/g, "_")}_Resume.pdf`}
                      className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FileText className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Detailed profile modal */}
      <AnimatePresence>
        {selectedMember !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              className="bg-gray-900 rounded-xl max-w-4xl w-full overflow-hidden border border-blue-500/30 shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {teamMembers.find((m) => m.id === selectedMember) && (
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gray-800">
                    <div className="aspect-square">
                      <img
                        src={teamMembers.find((m) => m.id === selectedMember)?.image || "/placeholder.svg"}
                        alt={teamMembers.find((m) => m.id === selectedMember)?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {teamMembers.find((m) => m.id === selectedMember)?.name}
                        </h2>
                        <p className="text-blue-400 mb-4">{teamMembers.find((m) => m.id === selectedMember)?.role}</p>
                      </div>
                      <button
                        className="p-2 rounded-full bg-gray-800/80 text-white hover:bg-red-600 transition-colors"
                        onClick={() => setSelectedMember(null)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <p className="text-gray-300 mb-6">{teamMembers.find((m) => m.id === selectedMember)?.bio}</p>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Skills & Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {teamMembers
                          .find((m) => m.id === selectedMember)
                          ?.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-blue-300">
                              {skill}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Contact & Profiles</h3>
                      <div className="space-y-3">
                        <a
                          href={`mailto:${teamMembers.find((m) => m.id === selectedMember)?.email}`}
                          className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                        >
                          <Mail className="w-5 h-5 mr-2" />
                          {teamMembers.find((m) => m.id === selectedMember)?.email}
                        </a>
                        <a
                          href={teamMembers.find((m) => m.id === selectedMember)?.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                        >
                          <Github className="w-5 h-5 mr-2" />
                          GitHub Profile
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                        <a
                          href={teamMembers.find((m) => m.id === selectedMember)?.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                        >
                          <Linkedin className="w-5 h-5 mr-2" />
                          LinkedIn Profile
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <a
                        href={teamMembers.find((m) => m.id === selectedMember)?.resume}
                        download={`${teamMembers.find((m) => m.id === selectedMember)?.name.replace(/\s+/g, "_")}_Resume.pdf`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <FileText className="w-5 h-5 mr-2" />
                        Download Resume
                      </a>

                      <Button variant="outline" onClick={() => setSelectedMember(null)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

     
    </div>
  )
}

