"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function PagePreloader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Lock scrolling for the duration of the curtain rise
    document.body.style.overflow = "hidden"

    // Destroy the curtain node after animation completes
    const timeout = setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = ""
    }, 1200)

    return () => {
      clearTimeout(timeout)
      document.body.style.overflow = ""
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-[#0f1c2e] pointer-events-none w-full h-full"
    />
  )
}
