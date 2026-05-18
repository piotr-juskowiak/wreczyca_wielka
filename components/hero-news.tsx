"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

export function HeroNews({ articles }: { articles: NewsArticle[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("desktop")

  // Use up to 9 articles → 3 pages of 3 (desktop), 3 pages of 2 (tablet) or 9 pages of 1 (mobile)
  const featuredArticles = articles.slice(0, 9)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w < 768) setViewport("mobile")
      else if (w < 1280) setViewport("tablet")
      else setViewport("desktop")
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const itemsPerPage = viewport === "mobile" ? 1 : viewport === "tablet" ? 2 : 3
  const totalPages = Math.ceil(featuredArticles.length / itemsPerPage)

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, totalPages - 1))
  }, [totalPages])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }, [totalPages])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }, [totalPages])

  useEffect(() => {
    if (isHovered || totalPages <= 1) return
    const interval = setInterval(() => {
      handleNext()
    }, 7000)
    return () => clearInterval(interval)
  }, [handleNext, isHovered, totalPages, currentIndex])

  if (!featuredArticles || featuredArticles.length === 0) return null

  const startIdx = currentIndex * itemsPerPage
  const activeArticles = featuredArticles.slice(startIdx, startIdx + itemsPerPage)
  // Pad with first articles if last page is short
  while (activeArticles.length < itemsPerPage && featuredArticles.length > 0) {
    activeArticles.push(featuredArticles[activeArticles.length % featuredArticles.length])
  }

  return (
    <section
      aria-label="Wyróżnione artykuły"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden border-b border-stone-200/60 bg-slate-950 select-none"
    >
      <div className="relative w-full min-h-[600px] lg:h-[640px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`page-${currentIndex}-${viewport}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid w-full h-full"
            style={{
              gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
              minHeight: "600px",
            }}
          >
            {activeArticles.map((article, idx) => (
              <HeroPanel
                key={`${article.id}-${idx}`}
                article={article}
                index={idx}
                total={itemsPerPage}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {totalPages > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/10 bg-slate-950/40 text-white/80 hover:text-white hover:bg-slate-950/70 hover:border-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-[6px] cursor-pointer group"
            aria-label="Poprzedni slajd"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/10 bg-slate-950/40 text-white/80 hover:text-white hover:bg-slate-950/70 hover:border-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-[6px] cursor-pointer group"
            aria-label="Następny slajd"
          >
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </>
      )}

      {/* Pagination dots */}
      {totalPages > 1 && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 flex-wrap justify-center max-w-[80%]">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="relative p-1.5 focus:outline-none cursor-pointer group"
              aria-label={`Przejdź do strony ${index + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white w-8 h-1.5"
                    : "bg-white/20 group-hover:bg-white/40 w-1.5 h-1.5"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Autoplay progress */}
      {totalPages > 1 && !isHovered && (
        <div className="absolute bottom-0 left-0 h-[2px] bg-white/5 w-full z-30 pointer-events-none">
          <motion.div
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 7, ease: "linear" }}
            className="h-full bg-white/25"
          />
        </div>
      )}

      {/* Counter in top right corner */}
      {totalPages > 1 && (
        <div className="absolute top-6 right-6 z-30 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/50 border border-white/10 backdrop-blur-[6px] text-[10px] font-black uppercase tracking-widest text-white/80">
          <span className="text-white">{String(currentIndex + 1).padStart(2, "0")}</span>
          <span className="text-white/20">/</span>
          <span>{String(totalPages).padStart(2, "0")}</span>
        </div>
      )}
    </section>
  )
}

function HeroPanel({
  article,
  index,
  total,
}: {
  article: NewsArticle
  index: number
  total: number
}) {
  const showBorder = index < total - 1

  const formatTitle = (title: string) => {
    const words = title.split(" ")
    const limitedTitle = words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "")
    const lowercased = limitedTitle.toLowerCase()
    return lowercased.charAt(0).toUpperCase() + lowercased.slice(1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`relative h-full flex flex-col justify-end overflow-hidden group ${
        showBorder ? "border-r border-white/10" : ""
      }`}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={article.image}
          alt=""
          className="w-full h-full object-cover absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Subtle overall dark tint to harmonize background colors */}
        <div className="absolute inset-0 bg-slate-950/20 pointer-events-none z-10" />
      </div>

      {/* Floating Glassmorphic Card Container for 100% legible text */}
      <div className="relative z-20 mt-auto m-4 lg:m-6 p-6 rounded-[2rem] bg-zinc-950/50 backdrop-blur-[6px] border border-white/10 shadow-2xl flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white/80 mb-3.5">
            <span>{article.category.toLowerCase() === "aktualności" ? "Wiadomość dnia" : article.category}</span>
          </div>

          <h2
            className={`font-semibold text-white leading-snug tracking-tight transition-colors duration-300 line-clamp-2 text-balance ${
              total === 3 ? "text-base lg:text-[17px] xl:text-[18px]" : total === 2 ? "text-lg lg:text-xl" : "text-xl sm:text-2xl"
            }`}
          >
            {formatTitle(article.title)}
          </h2>

          <p
            className={`mt-2 text-white/60 leading-relaxed font-medium ${
              total === 3 ? "text-[11px] lg:text-xs line-clamp-2" : "text-xs line-clamp-3"
            }`}
          >
            {article.excerpt}
          </p>
        </div>

        <div className="mt-5.5 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
          <motion.a
            href={`/aktualnosci/${article.slug}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group/btn relative inline-flex items-center justify-between gap-3.5 rounded-full bg-gradient-to-r from-[#208fcf] to-[#54b4eb] pl-4 pr-1.5 py-1.5 text-[9px] font-black uppercase tracking-widest text-white shadow-lg shadow-[#208fcf]/10 hover:shadow-[#208fcf]/20 hover:from-[#1d82bd] hover:to-[#4ea8de] transition-all cursor-pointer duration-300 w-fit"
          >
            <span>Czytaj</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white group-hover/btn:bg-white/35 transition-all duration-300">
              <ArrowRight className="h-3 w-3" />
            </div>
          </motion.a>

          <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-white/40">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-white/35" />
              {article.date}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
