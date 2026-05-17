"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

export function HeroNews({ article }: { article: NewsArticle }) {
  return (
    <section
      aria-label="Wyróżniona aktualność"
      className="relative min-h-[600px] lg:min-h-[680px] flex items-center bg-[#0d1c12] overflow-hidden w-full border-b border-[#dad7cd]/10"
    >
      {/* 1. CINEMATIC FULL-BLEED BACKGROUND IMAGE ON THE RIGHT (WITH MOUNT ZOOM OUT EFFECT) */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 overflow-hidden">
        <motion.img
          src={article.image}
          alt=""
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.04 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeOut" },
            scale: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
            default: { duration: 1.5, ease: "easeOut" }
          }}
        />
        
        {/* Sleek multi-directional gradient overlays to blend the image seamlessly */}
        {/* Mobile vertical blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1c12] via-[#0d1c12]/60 to-transparent lg:hidden z-10" />
        
        {/* Desktop horizontal blend */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1c12] via-[#0d1c12]/40 to-transparent hidden lg:block z-10" />
        
        {/* Dark vignette to enhance text readability */}
        <div className="absolute inset-0 bg-black/10 z-10" />
      </div>

      {/* 2. BACKGROUND AMBIENT GLOWS AND ORGANIC WATERMARK (ON-MOUNT ASSEMBLY) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.8, delay: 0.2 }}
        className="absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-[#588157] blur-3xl pointer-events-none z-0"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.8, delay: 0.2 }}
        className="absolute left-1/3 bottom-10 h-64 w-64 rounded-full bg-[#a3b18a] blur-3xl pointer-events-none z-0"
      />
      
      {/* Giant subtle organic leaf watermark outline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.02, scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut", delay: 0.1 }}
        className="absolute left-[-100px] top-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none select-none text-white z-0 hidden xl:block"
      >
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M50 0 C15 25 15 75 50 100 C85 75 85 25 50 0 Z" />
        </svg>
      </motion.div>

      {/* 3. CONTENT AREA ALIGNED TO WORKSPACE GRID */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-20 py-16 sm:py-24 lg:py-32">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Sparkles Accent Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.0 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#a3b18a]/10 border border-[#a3b18a]/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-[#a3b18a] mb-8 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#dad7cd]" />
            Wyróżniona aktualność
          </motion.div>

          {/* Sophisticated Editorial Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.08] tracking-tight text-balance"
          >
            {article.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.3 }}
            className="mt-8 text-base sm:text-lg md:text-xl text-[#dad7cd]/80 leading-relaxed max-w-2xl font-medium"
          >
            {article.excerpt}
          </motion.p>

          {/* Actions & Metadata Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.45 }}
            className="mt-12 flex flex-wrap items-center gap-6 sm:gap-10"
          >
            {/* Elegant Primary Button */}
            <motion.a
              href={`/aktualnosci/${article.slug}`}
              whileHover={{ scale: 1.03, x: 5 }}
              whileTap={{ scale: 0.97 }}
              className="group/btn inline-flex items-center gap-4 rounded-2xl bg-[#a3b18a] px-10 py-5 text-sm font-black uppercase tracking-widest text-[#0d1c12] shadow-2xl shadow-[#a3b18a]/10 hover:bg-[#dad7cd] transition-all"
            >
              Czytaj artykuł
              <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
            </motion.a>

            {/* In-Line Metadata Widget */}
            <div className="flex items-center gap-3.5 text-xs font-bold uppercase tracking-widest text-[#dad7cd]/60">
              <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-xl border border-white/5">
                <Calendar className="h-4 w-4 text-[#a3b18a]" />
                <span>{article.date}</span>
              </div>
              
              <span className="h-1.5 w-1.5 rounded-full bg-[#dad7cd]/20" />
              
              <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-xl border border-white/5">
                <Clock className="h-4 w-4 text-[#a3b18a]" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
