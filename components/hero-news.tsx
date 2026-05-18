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

  return (
    <motion.a
      href={`/aktualnosci/${article.slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`relative h-full flex flex-col justify-end overflow-hidden group select-none cursor-pointer focus:outline-none ${
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
        {/* Cinematic dark bottom-to-top gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/15 pointer-events-none z-10 transition-opacity duration-300 group-hover:from-slate-950/95" />
      </div>

      {/* Floating Glassmorphic Card Container for 100% legible text */}
      <div className={`relative z-20 mt-auto mx-4 mb-6 lg:mx-6 lg:mb-8 p-4.5 lg:p-5 rounded-[1.75rem] bg-slate-950/40 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col justify-between transition-all duration-500 group-hover:border-white/20 group-hover:bg-slate-950/50 ${
        total === 3 
          ? "h-[235px] sm:h-[245px] lg:h-[255px] xl:h-[265px]" 
          : total === 2 
            ? "h-[255px] sm:h-[265px] lg:h-[275px]" 
            : "h-auto min-h-[225px]"
      }`}>
        <div>
          {/* Gold Category Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ffd230]/10 border border-[#ffd230]/25 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-[#ffd230] mb-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffd230] animate-pulse" />
            <span>{article.category.toLowerCase() === "aktualności" ? "Wiadomość dnia" : article.category}</span>
          </div>

          {/* Title */}
          <h2
            className="font-normal text-white leading-snug tracking-tight transition-colors duration-300 group-hover:text-[#ffd230] line-clamp-2 text-balance text-[21px] md:text-[25px]"
          >
            {article.title}
          </h2>

          {/* Excerpt */}
          <p
            className={`mt-1.5 text-white/60 leading-relaxed font-medium ${
              total === 3 ? "text-[11px] lg:text-xs line-clamp-2" : "text-xs line-clamp-3"
            }`}
          >
            {article.excerpt}
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="mt-4 pt-3.5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
          <div className="group/btn relative inline-flex items-center justify-between gap-3 rounded-full bg-white/10 border border-white/20 pl-4 pr-1.5 py-1.5 text-[9px] font-black uppercase tracking-widest text-white transition-all duration-300 w-fit group-hover:bg-[#ffd230] group-hover:text-slate-950 group-hover:border-[#ffd230] group-hover:scale-[1.03]">
            <span>Czytaj więcej</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-slate-200 group-hover:bg-slate-950/15 group-hover:text-slate-950 transition-all duration-300">
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-white/40">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-white/35" />
              {article.date}
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}
