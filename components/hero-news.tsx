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
      className="relative w-full overflow-hidden border-b border-primary/10 bg-[#f0f2ee] select-none"
    >
      {/* Premium ambient decorative background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[35%] aspect-square rounded-full bg-primary/[0.08] blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[30%] aspect-square rounded-full bg-[#588157]/[0.04] blur-[120px] pointer-events-none z-0" />

      <div className="relative w-full h-[580px] md:h-[620px] lg:h-[660px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`page-${currentIndex}-${viewport}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="grid w-full h-full"
            style={{
              gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
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

      {/* Navigation Arrows - Edge positioned, ultra-minimalist and elegant */}
      {totalPages > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 bg-white/90 text-slate-500 hover:text-white hover:bg-primary hover:border-primary hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm backdrop-blur-sm cursor-pointer group"
            aria-label="Poprzedni slajd"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 bg-white/90 text-slate-500 hover:text-white hover:bg-primary hover:border-primary hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm backdrop-blur-sm cursor-pointer group"
            aria-label="Następny slajd"
          >
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </>
      )}

      {/* Pagination Dots - Centered bottom overlay */}
      {totalPages > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="relative p-1 focus:outline-none cursor-pointer group"
              aria-label={`Przejdź do strony ${index + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-6 h-1.5"
                    : "bg-slate-400/40 group-hover:bg-slate-500/50 w-1.5 h-1.5"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Autoplay progress bar */}
      {totalPages > 1 && !isHovered && (
        <div className="absolute bottom-0 left-0 h-[2px] bg-slate-300/30 w-full z-30 pointer-events-none">
          <motion.div
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 7, ease: "linear" }}
            className="h-full bg-primary/50"
          />
        </div>
      )}

      {/* Counter - Floating clean HUD in top right corner */}
      {totalPages > 1 && (
        <div className="absolute top-6 right-6 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-primary/10 shadow-sm backdrop-blur-[6px] text-[9px] font-black uppercase tracking-widest text-slate-500">
          <span className="text-slate-800">{String(currentIndex + 1).padStart(2, "0")}</span>
          <span className="text-slate-300">/</span>
          <span>{String(totalPages).padStart(2, "0")}</span>
        </div>
      )}
    </section>
  )
}

function getCategoryColor(category: string) {
  const cat = category.toLowerCase();
  
  // 1. Niebieski (Blue) - Sport
  if (cat.includes("sport")) {
    return {
      text: "text-sky-750",
      bg: "bg-sky-50/90 border-sky-100",
      dot: "bg-sky-500",
    }
  }
  
  // 2. Żółty (Yellow) - Kultura, Edukacja, Zdrowie
  if (cat.includes("kultur") || cat.includes("edukacj") || cat.includes("zdrow")) {
    return {
      text: "text-amber-850",
      bg: "bg-amber-50/90 border-amber-200/50",
      dot: "bg-amber-500",
    }
  }
  
  // 3. Pomarańcz (Orange) - Wydarzenia, Sołectwa, Inicjatywy
  if (cat.includes("wydarzen") || cat.includes("sołectw") || cat.includes("inicjatyw")) {
    return {
      text: "text-orange-750",
      bg: "bg-orange-50/90 border-orange-100",
      dot: "bg-orange-500",
    }
  }
  
  // 4. Zielony (Green) - Wiadomości, Ogłoszenia, Inwestycje, Środowisko, Aktualności (default)
  return {
    text: "text-primary",
    bg: "bg-[#f4f6f1]/90 border-primary/10",
    dot: "bg-primary",
  }
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
  const colors = getCategoryColor(article.category)

  return (
    <motion.a
      href={`/aktualnosci/${article.slug}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`relative h-full flex flex-col overflow-hidden group select-none cursor-pointer focus:outline-none ${
        showBorder ? "border-r border-primary/10" : ""
      }`}
    >
      {/* Top Half: Cinematic aspect ratio image, neatly framing flyers */}
      <div className="relative w-full h-[52%] overflow-hidden bg-stone-950 shrink-0">
        <motion.img
          src={article.image}
          alt=""
          className="w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Subtle shadow overlay inside image for deep premium feel */}
        <div className="absolute inset-0 bg-black/[0.08] transition-opacity duration-300 group-hover:bg-black/[0.04] pointer-events-none" />
      </div>

      {/* Bottom Half: Structured ultra-minimalist text block with 100% legibility */}
      <div className="flex-1 w-full bg-[#f0f2ee] p-6 lg:p-8 xl:p-9 flex flex-col justify-between transition-colors duration-300 group-hover:bg-[#e4e7e2] border-t border-primary/10">
        <div>
          {/* Category & Date Metadata Row */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8.5px] font-black uppercase tracking-widest shadow-sm ${colors.bg} ${colors.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${colors.dot} animate-pulse`} />
              <span>{article.category.toLowerCase() === "aktualności" ? "Wiadomość dnia" : article.category}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[8.5px] font-bold uppercase tracking-widest text-slate-500">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{article.date}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-normal text-slate-800 leading-snug tracking-tight text-[18px] sm:text-[20px] lg:text-[22px] xl:text-[24px] line-clamp-2 transition-colors duration-300 group-hover:text-primary text-balance">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2.5 text-slate-600 leading-relaxed font-normal text-sm line-clamp-2">
            {article.excerpt}
          </p>
        </div>

        {/* Read More Link */}
        <div className="mt-5 pt-4 border-t border-primary/10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-700 group-hover:text-primary transition-colors duration-300">
            <span>Czytaj więcej</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.a>
  )
}
