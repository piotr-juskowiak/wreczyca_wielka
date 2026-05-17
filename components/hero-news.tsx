"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

export function HeroNews({ articles }: { articles: NewsArticle[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Ensure we use the top 4 articles for the split slider
  const featuredArticles = articles.slice(0, 4)

  // Detect screen size for responsive slide grouping
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate total pages based on layout (1 per page on mobile, 2 per page on desktop)
  const totalPages = isMobile 
    ? featuredArticles.length 
    : Math.ceil(featuredArticles.length / 2)

  // Safely adjust currentIndex if we switch between mobile and desktop
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, totalPages - 1))
  }, [isMobile, totalPages])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }, [totalPages])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }, [totalPages])

  // Reset autoplay timer when manually navigating or on hover
  useEffect(() => {
    if (isHovered || totalPages <= 1) return

    const interval = setInterval(() => {
      handleNext()
    }, 7000)

    return () => clearInterval(interval)
  }, [handleNext, isHovered, totalPages, currentIndex])

  if (!featuredArticles || featuredArticles.length === 0) return null

  // Get articles for the current page
  const getCurrentArticles = () => {
    if (isMobile) {
      return [featuredArticles[currentIndex]]
    } else {
      const idx = currentIndex * 2
      return [
        featuredArticles[idx],
        featuredArticles[idx + 1] || featuredArticles[0] // fallback just in case
      ]
    }
  }

  const activeArticles = getCurrentArticles()

  // Helper to truncate text
  const getTruncatedExcerpt = (text: string) => {
    const words = text.split(" ")
    return words.slice(0, Math.floor(words.length * 0.55)).join(" ") + "..."
  }

  // Animation variants for the cinematic split panels
  const leftPanelVariants = {
    enter: {
      opacity: 0,
      x: -40,
    },
    center: {
      opacity: 1,
      x: 0,
      transition: {
        opacity: { duration: 0.6, ease: "easeOut" as const },
        x: { type: "spring" as const, stiffness: 80, damping: 18 }
      }
    },
    exit: {
      opacity: 0,
      x: -40,
      transition: {
        opacity: { duration: 0.4 },
        x: { duration: 0.4, ease: "easeIn" as const }
      }
    }
  }

  const rightPanelVariants = {
    enter: {
      opacity: 0,
      x: 40,
    },
    center: {
      opacity: 1,
      x: 0,
      transition: {
        opacity: { duration: 0.6, ease: "easeOut" as const },
        x: { type: "spring" as const, stiffness: 80, damping: 18 }
      }
    },
    exit: {
      opacity: 0,
      x: 40,
      transition: {
        opacity: { duration: 0.4 },
        x: { duration: 0.4, ease: "easeIn" as const }
      }
    }
  }

  // Mobile single pane fade variants
  const mobileVariants = {
    enter: { opacity: 0, y: 15 },
    center: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    },
    exit: { 
      opacity: 0, 
      y: -15,
      transition: { duration: 0.35, ease: "easeIn" as const }
    }
  }

  return (
    <section
      aria-label="Wyróżniony dwukolumnowy pokaz slajdów"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden border-b border-slate-200 bg-[#0f1c2e] select-none"
    >
      <div className="flex flex-col lg:flex-row w-full min-h-[600px] lg:h-[650px] relative">
        <AnimatePresence mode="wait" initial={false}>
          {isMobile ? (
            // MOBILE LAYOUT - SHOWS 1 ARTICLE FULL SCREEN
            <motion.div
              key={`mobile-${currentIndex}`}
              variants={mobileVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col justify-end p-6 sm:p-10 relative h-[600px] overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={activeArticles[0].image}
                  alt=""
                  className="w-full h-full object-cover scale-105 filter blur-[4px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c2e] via-[#0f1c2e]/70 to-[#0f1c2e]/20" />
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-2xl mt-auto">
                <div className="inline-flex items-center gap-2 rounded-full bg-municipal-gold-light border border-municipal-gold/30 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-municipal-gold mb-4 backdrop-blur-md animate-pulse">
                  <Sparkles className="h-3 w-3 text-municipal-gold" />
                  <span>{activeArticles[0].category}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-light text-white leading-tight tracking-tight text-balance">
                  {activeArticles[0].title}
                </h1>
                <p className="mt-4 text-sm text-[#cbd5e1]/80 leading-relaxed font-medium line-clamp-3">
                  {activeArticles[0].excerpt}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <motion.a
                    href={`/aktualnosci/${activeArticles[0].slug}`}
                    whileTap={{ scale: 0.98 }}
                    className="group/btn relative inline-flex items-center justify-between gap-5 rounded-full bg-primary pl-6 pr-2 py-2 text-[10px] font-black uppercase tracking-widest text-white hover:bg-digital-blue shadow-lg hover:shadow-digital-blue/20 transition-all cursor-pointer duration-300"
                  >
                    <span>Czytaj artykuł</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </motion.a>
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#cbd5e1]/60">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-municipal-gold" />{activeArticles[0].date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // DESKTOP LAYOUT - SHOWS 2 ARTICLES SIDE-BY-SIDE IN SPLIT PANES
            <div className="flex flex-row w-full h-full" key={`desktop-${currentIndex}`}>
              
              {/* Left Pane (Article 1) */}
              <motion.div
                variants={leftPanelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-1/2 h-full flex flex-col justify-end p-12 lg:p-16 relative overflow-hidden group border-r border-white/10"
              >
                {/* Parallax Image Background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <motion.img
                    src={activeArticles[0].image}
                    alt=""
                    className="w-full h-full object-cover absolute inset-0 filter blur-[4px]"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1.05 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{
                      scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                      default: { duration: 0.6 }
                    }}
                  />
                  {/* Elegant editorial overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c2e] via-[#0f1c2e]/60 to-[#0f1c2e]/10 z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-digital-blue opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay" />
                </div>

                {/* Left pane subtle ambient glow */}
                <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-digital-blue/10 blur-3xl pointer-events-none z-0" />

                {/* Content Panel */}
                <div className="relative z-20 max-w-xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-municipal-gold-light border border-municipal-gold/30 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-municipal-gold mb-5 backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-municipal-gold" />
                    <span>{activeArticles[0].category}</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-light text-white leading-[1.12] tracking-tight group-hover:text-municipal-gold transition-colors duration-300 line-clamp-3 text-balance">
                    {activeArticles[0].title}
                  </h1>
                  <p className="mt-5 text-sm text-[#cbd5e1]/80 leading-relaxed font-medium line-clamp-3">
                    {getTruncatedExcerpt(activeArticles[0].excerpt)}
                  </p>
                  
                  <div className="mt-8 flex items-center justify-between">
                    {/* Primary Button */}
                    <motion.a
                      href={`/aktualnosci/${activeArticles[0].slug}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/btn relative inline-flex items-center justify-between gap-5 rounded-full bg-primary pl-6 pr-2 py-2 text-[10px] font-black uppercase tracking-widest text-white hover:bg-digital-blue shadow-lg hover:shadow-digital-blue/20 transition-all cursor-pointer duration-300"
                    >
                      <span>Czytaj artykuł</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white group-hover/btn:bg-white/40 transition-all duration-300">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </motion.a>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#cbd5e1]/50">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-municipal-gold" />{activeArticles[0].date}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-municipal-gold" />{activeArticles[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Pane (Article 2) */}
              <motion.div
                variants={rightPanelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-1/2 h-full flex flex-col justify-end p-12 lg:p-16 relative overflow-hidden group"
              >
                {/* Parallax Image Background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <motion.img
                    src={activeArticles[1].image}
                    alt=""
                    className="w-full h-full object-cover absolute inset-0 filter blur-[4px]"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1.05 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{
                      scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                      default: { duration: 0.6 }
                    }}
                  />
                  {/* Elegant editorial overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c2e] via-[#0f1c2e]/60 to-[#0f1c2e]/10 z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-digital-blue opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay" />
                </div>

                {/* Right pane subtle ambient glow */}
                <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-digital-blue/10 blur-3xl pointer-events-none z-0" />

                {/* Content Panel */}
                <div className="relative z-20 max-w-xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-municipal-gold-light border border-municipal-gold/30 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-municipal-gold mb-5 backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-municipal-gold" />
                    <span>{activeArticles[1].category}</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-light text-white leading-[1.12] tracking-tight group-hover:text-municipal-gold transition-colors duration-300 line-clamp-3 text-balance">
                    {activeArticles[1].title}
                  </h1>
                  <p className="mt-5 text-sm text-[#cbd5e1]/80 leading-relaxed font-medium line-clamp-3">
                    {getTruncatedExcerpt(activeArticles[1].excerpt)}
                  </p>
                  
                  <div className="mt-8 flex items-center justify-between">
                    {/* Primary Button */}
                    <motion.a
                      href={`/aktualnosci/${activeArticles[1].slug}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/btn relative inline-flex items-center justify-between gap-5 rounded-full bg-primary pl-6 pr-2 py-2 text-[10px] font-black uppercase tracking-widest text-white hover:bg-digital-blue shadow-lg hover:shadow-digital-blue/20 transition-all cursor-pointer duration-300"
                    >
                      <span>Czytaj artykuł</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white group-hover/btn:bg-white/40 transition-all duration-300">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </motion.a>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#cbd5e1]/50">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-municipal-gold" />{activeArticles[1].date}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-municipal-gold" />{activeArticles[1].readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. MANUAL NAVIGATION ARROWS (VISIBLE ON DESKTOP) */}
      {totalPages > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-[#0f1c2e]/40 text-[#cbd5e1]/60 hover:text-white hover:bg-[#0f1c2e]/80 hover:border-white/30 hover:scale-105 transition-all duration-300 backdrop-blur-md cursor-pointer group"
            aria-label="Poprzedni slajd"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-[#0f1c2e]/40 text-[#cbd5e1]/60 hover:text-white hover:bg-[#0f1c2e]/80 hover:border-white/30 hover:scale-105 transition-all duration-300 backdrop-blur-md cursor-pointer group"
            aria-label="Następny slajd"
          >
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </>
      )}

      {/* 5. INTERACTIVE DOTS PAGINATION WITH SMOOTH SLIDING RING */}
      {totalPages > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="relative p-2 focus:outline-none cursor-pointer group"
              aria-label={`Przejdź do strony ${index + 1}`}
            >
              <span className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-municipal-gold scale-110" 
                  : "bg-white/30 group-hover:bg-white/60"
              }`} />
              
              {/* Premium sliding outline ring */}
              {index === currentIndex && (
                <motion.span
                  layoutId="activeDotOutlineSplit"
                  className="absolute inset-0 border border-municipal-gold rounded-full scale-125"
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* 6. CINEMATIC AUTOPLAY PROGRESS BAR AT THE BOTTOM */}
      {totalPages > 1 && !isHovered && (
        <div className="absolute bottom-0 left-0 h-[2px] bg-white/5 w-full z-30 pointer-events-none">
          <motion.div
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 7, ease: "linear" }}
            className="h-full bg-digital-blue"
          />
        </div>
      )}
    </section>
  )
}
