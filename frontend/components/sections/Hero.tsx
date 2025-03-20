"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSprite, getSpriteSheet } from "@/api/sprite";
import { Sparkles, Upload, Wand2, RefreshCw } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import { SpriteOutput } from "./sprite-output";
import { ThemeProvider } from "./theme-context";
import { ThemeToggle } from "./theme-toggle";

const idle = "/assets/idle.gif";
const jump = "/assets/jump.gif";
const run = "/assets/walking.gif";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/";
const FRAME_RATE = 300;

export function Hero() {
  const [imageUploaded, setImageUploaded] = useState<File | null>(null);
  const [animationType, setAnimationType] = useState("idle");
  const [basicSpriteUrl, setBasicSpriteUrl] = useState<string | null>(null);
  const [animatedSpriteUrl, setAnimatedSpriteUrl] = useState<string | null>(
    null
  );
  const [isLoadingBasic, setIsLoadingBasic] = useState(false);
  const [isLoadingAnimated, setIsLoadingAnimated] = useState(false);
  const [spriteFramesUrls, setSpriteFramesUrls] = useState<string[] | null>([]);
  const [currentFrame, setCurrentFrame] = useState(0);

  const getImageAsBlobURL = async (
    filePath: string
  ): Promise<string | null> => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error("Failed to load image");
      }
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error loading image:", error);
      return null;
    }
  };

  const onCreateBasicSprite = async () => {
    if (imageUploaded) {
      setIsLoadingBasic(true);
      // Clear any existing sprite to show loading animation
      setBasicSpriteUrl(null);
      try {
        const result = await getSprite(imageUploaded);
        if (result) {
          console.log(result.results_dir);
          const blobURL = await getImageAsBlobURL(
            BACKEND_URL + result.results_dir ||
              "/placeholder.svg?height=192&width=192"
          );
          setBasicSpriteUrl(blobURL);
          console.log(`Basic sprite generated: ${result.message}`);
        }
      } catch (error) {
        console.error("Error generating basic sprite:", error);
      } finally {
        setIsLoadingBasic(false);
      }
    }
  };

  const onCreateAnimatedSprite = async () => {
    if (imageUploaded && basicSpriteUrl) {
      setIsLoadingAnimated(true);
      // Clear any existing animated sprite to show loading animation
      setAnimatedSpriteUrl(null);
      setSpriteFramesUrls(null);
      try {
        const result = await getSpriteSheet(animationType);
        if (result) {
          const blobURL = await getImageAsBlobURL(
            BACKEND_URL + result.results_dir ||
              "/placeholder.svg?height=192&width=384"
          );
          setAnimatedSpriteUrl(blobURL);
          const framePaths = await Promise.all(
            result.frame_paths.map((framePath) =>
              getImageAsBlobURL(BACKEND_URL + framePath)
            )
          );
          setSpriteFramesUrls(
            framePaths.filter((path): path is string => path !== null)
          );
          console.log("Sprite Frame: ", result.frame_paths);
          console.log(`Animated sprite generated: ${result.message}`);
        }
      } catch (error) {
        console.error("Error generating animated sprite:", error);
      } finally {
        setIsLoadingAnimated(false);
      }
    }
  };

  const handleAnimationTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAnimationType(event.target.value);
    // Reset animated sprite when animation type changes
    setAnimatedSpriteUrl(null);
  };

  // Function to reset all states and start over
  const handleRefresh = () => {
    setImageUploaded(null);
    setBasicSpriteUrl(null);
    setAnimatedSpriteUrl(null);
    setAnimationType("idle");
  };

  useEffect(() => {
    if (spriteFramesUrls == null) return;
    if (spriteFramesUrls.length == 0) return;

    const interval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % spriteFramesUrls.length);
    }, FRAME_RATE);

    return () => clearInterval(interval);
  }, [spriteFramesUrls]);

  // Example sprite sheets for different animation types
  const exampleSprites = [
    { type: "idle", url: idle },
    { type: "walking", url: run },
    { type: "jumping", url: jump },
  ];

  return (
    <ThemeProvider>
      <section className="py-24 relative overflow-hidden min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-100">
        {/* Background gradient - only visible in dark mode */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80 z-0 dark:block hidden"></div>

        {/* Animated background dots - only visible in dark mode */}
        <div className="absolute inset-0 z-0 dark:block hidden">
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

        {/* Light mode background pattern */}
        <div className="absolute inset-0 z-0 dark:hidden block opacity-10">
          <div className="absolute w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-blue-300 to-purple-300"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  opacity: 0.1 + Math.random() * 0.1,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Sprite Sheet Generator
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Transform your sketches into animated game sprites with AI-powered
              technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Panel (Upload and Animation Controls) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl transition-colors duration-300"
            >
              {/* Header with Refresh Button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Sprite Generator
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ rotate: { duration: 0.5 } }}
                  onClick={handleRefresh}
                  className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                  title="Start over with a new image"
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Step 1: Upload and Generate Basic Sprite */}
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-400 mr-3">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  1. Upload Your Sketch
                </h2>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="border-dashed border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-8 bg-gray-50 dark:bg-gray-800/50 transition-all duration-300"
              >
                <ImageUpload
                  imageUploaded={(uploaded: File) => setImageUploaded(uploaded)}
                  resetImage={!imageUploaded}
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full mb-8 py-3 px-6 rounded-md font-bold text-white flex items-center justify-center transition-all duration-300 ${
                  isLoadingBasic
                    ? "bg-blue-600 cursor-wait"
                    : imageUploaded && !basicSpriteUrl
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20"
                    : basicSpriteUrl
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400"
                }`}
                disabled={!imageUploaded || isLoadingBasic}
                onClick={onCreateBasicSprite}
              >
                {isLoadingBasic ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="mr-2"
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Generating Basic Sprite...
                  </>
                ) : basicSpriteUrl ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Basic Sprite Generated
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Basic Sprite
                  </>
                )}
              </motion.button>

              {/* Step 2: Animation Controls */}
              <div className="flex items-center mb-4">
                <div
                  className={`p-2 rounded-lg ${
                    basicSpriteUrl
                      ? "bg-gradient-to-br from-purple-500 to-purple-400 dark:from-purple-600 dark:to-purple-400"
                      : "bg-gradient-to-br from-gray-400 to-gray-300 dark:from-gray-600 dark:to-gray-500"
                  } mr-3`}
                >
                  <Wand2 className="w-5 h-5 text-white" />
                </div>
                <h2
                  className={`text-xl font-semibold ${
                    basicSpriteUrl
                      ? "text-gray-800 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  2. Choose Animation Type
                </h2>
              </div>

              <motion.div
                whileHover={basicSpriteUrl ? { scale: 1.02 } : {}}
                className="mb-4"
              >
                <select
                  id="animation"
                  value={animationType}
                  onChange={handleAnimationTypeChange}
                  disabled={!basicSpriteUrl}
                  className={`w-full ${
                    basicSpriteUrl
                      ? "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-500 border-gray-300 dark:border-gray-600 cursor-not-allowed"
                  } border rounded-md py-3 px-4 focus:outline-none transition-all duration-300`}
                >
                  <option value="idle">Idle</option>
                  <option value="walking">Walking</option>
                  <option value="jump">Jumping</option>
                </select>
              </motion.div>

              <motion.button
                whileHover={basicSpriteUrl ? { scale: 1.05 } : {}}
                whileTap={basicSpriteUrl ? { scale: 0.95 } : {}}
                className={`w-full py-3 px-6 rounded-md font-bold text-white flex items-center justify-center transition-all duration-300 ${
                  !basicSpriteUrl
                    ? "bg-gray-300 dark:bg-gray-700 opacity-60 cursor-not-allowed text-gray-500 dark:text-gray-400"
                    : isLoadingAnimated
                    ? "bg-purple-600 cursor-wait"
                    : animatedSpriteUrl
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20"
                }`}
                disabled={!basicSpriteUrl || isLoadingAnimated}
                onClick={onCreateAnimatedSprite}
              >
                {isLoadingAnimated ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="mr-2"
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Generating Animation...
                  </>
                ) : animatedSpriteUrl ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Animation Generated
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Animation
                  </>
                )}
              </motion.button>
              {/* Pro Tips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.02 }}
                className="mt-8 p-4 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  <span className="mr-2">✅</span>
                  Model Evaluation
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-pretty">
                  <ul>
                    <li>
                      <strong className=" text-black dark:text-white">
                        FID Score:
                      </strong>{" "}
                      45.56
                    </li>
                    <li>
                      <strong className=" text-black dark:text-white">
                        Evaluation:
                      </strong>{" "}
                      The FID (Fréchet Inception Distance) measures how closely
                      the generated images resemble real ones.
                    </li>
                    {/* <li><strong className=" text-black dark:text-white">Dataset Size:</strong> 200 images (100 real, 100 generated)</li> */}
                  </ul>
                </p>
              </motion.div>
            </motion.div>

            {/* Right Panel (Output and Examples) */}
            <SpriteOutput
              basicSpriteUrl={basicSpriteUrl}
              animatedSpriteUrl={
                spriteFramesUrls
                  ? spriteFramesUrls[currentFrame]
                  : animatedSpriteUrl
              }
              animatedDownloadUrl={animatedSpriteUrl}
              isLoadingBasic={isLoadingBasic}
              isLoadingAnimated={isLoadingAnimated}
              exampleSprites={exampleSprites}
            />
          </div>
        </div>

        {/* Theme Toggle Button */}
        <ThemeToggle />
      </section>
    </ThemeProvider>
  );
}
