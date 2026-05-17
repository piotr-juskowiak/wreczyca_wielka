"use client"

import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"

export function FloatingActionButton() {
  return (
    <div className="fixed bottom-8 right-8 z-40 select-none">
      <motion.a
        href="/kontakt"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group flex h-14 items-center gap-3 rounded-full bg-dusty-olive/85 backdrop-blur-md px-4 text-white shadow-xl hover:bg-dusty-olive border border-white/20 transition-all duration-300"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          <AlertTriangle className="h-4.5 w-4.5 text-white" />
        </div>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-black uppercase tracking-wider transition-all duration-500 group-hover:max-w-xs group-hover:pr-2">
          Zgłoś usterkę
        </span>
      </motion.a>
    </div>
  )
}
