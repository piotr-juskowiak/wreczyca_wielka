"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

export function HeroNews({ articles }: { articles: NewsArticle[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("desktop")

  // Use up to 9 articles → 3 strony po 3 (desktop), 3 po 2 (tablet) lub 9 po 1 (mobile)
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
      className="relative w-full overflow-hidden border-b border-stone-200 bg-[#344e41] select-none"
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
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/15 bg-[#344e41]/50 text-white/70 hover:text-white hover:bg-[#344e41]/85 hover:border-white/35 hover:scale-105 transition-all duration-300 backdrop-blur-md cursor-pointer group"
            aria-label="Poprzedni slajd"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/15 bg-[#344e41]/50 text-white/70 hover:text-white hover:bg-[#344e41]/85 hover:border-white/35 hover:scale-105 transition-all duration-300 backdrop-blur-md cursor-pointer group"
            aria-label="Następny slajd"
          >
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </>
      )}

      {/* Pagination dots — pokazuje wszystkie strony (np. 9 dla mobile) */}
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
                    ? "bg-municipal-gold w-8 h-2"
                    : "bg-white/30 group-hover:bg-white/60 w-2 h-2"
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
            className="h-full bg-municipal-gold"
          />
        </div>
      )}

      {/* Counter w prawym górnym rogu */}
      {totalPages > 1 && (
        <div className="absolute top-6 right-6 z-30 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#344e41]/60 border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white/80">
          <span className="text-municipal-gold">{String(currentIndex + 1).padStart(2, "0")}</span>
          <span className="text-white/30">/</span>
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
  const isFirst = index === 0
  const showBorder = index < total - 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`relative h-full flex flex-col justify-end p-6 sm:p-8 lg:p-10 overflow-hidden group ${
        showBorder ? "border-r border-white/10" : ""
      }`}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={article.image}
          alt=""
          className="w-full h-full object-cover absolute inset-0 filter blur-[3px]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.05 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#344e41] via-[#344e41]/75 to-[#344e41]/15 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-digital-blue opacity-0 group-hover:opacity-15 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay" />
      </div>

      <div className="relative z-20 max-w-xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-municipal-gold-light border border-municipal-gold/30 px-3 py-1 text-[9px] font-black uppercase tracking-[0.22em] text-municipal-gold mb-4 backdrop-blur-md">
          {isFirst && <Sparkles className="h-3 w-3 text-municipal-gold" />}
          <span>{article.category}</span>
        </div>

        <h2
          className={`font-light text-white leading-[1.15] tracking-tight group-hover:text-municipal-gold transition-colors duration-300 line-clamp-3 text-balance ${
            total === 3 ? "text-xl lg:text-2xl xl:text-[26px]" : total === 2 ? "text-2xl lg:text-3xl" : "text-3xl sm:text-4xl"
          }`}
        >
          {article.title}
        </h2>

        <p
          className={`mt-3 text-[#dad7cd]/80 leading-relaxed font-medium ${
            total === 3 ? "text-xs lg:text-[13px] line-clamp-2" : "text-sm line-clamp-3"
          }`}
        >
          {article.excerpt}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
          <motion.a
            href={`/aktualnosci/${article.slug}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group/btn relative inline-flex items-center justify-between gap-4 rounded-full bg-primary pl-5 pr-1.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-digital-blue-hover shadow-lg hover:shadow-digital-blue/30 transition-all cursor-pointer duration-300 w-fit"
          >
            <span>Czytaj</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white group-hover/btn:bg-white/35 transition-all duration-300">
              <ArrowRight className="h-3 w-3" />
            </div>
          </motion.a>

          <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-[#dad7cd]/60">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3 text-municipal-gold" />
              {article.date}
            </span>
            {total < 3 && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/15" />
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-municipal-gold" />
                  {article.readTime}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
