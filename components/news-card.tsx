"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

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

export function NewsCard({ article, hideCategory = false }: { article: NewsArticle; hideCategory?: boolean }) {
  const colors = getCategoryColor(article.category)

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-stone-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.015)] transition-all duration-500 hover:shadow-[0_12px_30px_rgba(58,90,64,0.06)] hover:border-primary/25 h-full"
    >
      <a href={`/aktualnosci/${article.slug}`} className="flex flex-col h-full">
        {/* Aspect ratio optimized to show text-heavy graphics without cropping top/bottom */}
        <div className="relative aspect-[16/10.5] overflow-hidden m-2.5 rounded-[1.4rem] bg-stone-50 border border-stone-100 shadow-sm">
          {/* Category Floating Pill at top left */}
          {!hideCategory && (
            <div className={`absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8.5px] font-black uppercase tracking-widest shadow-sm backdrop-blur-sm ${colors.bg} ${colors.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${colors.dot} animate-pulse`} />
              <span>{article.category}</span>
            </div>
          )}

          <motion.img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {/* Soft dark overlay at the bottom for image depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="flex flex-1 flex-col px-5.5 pb-5.5 pt-2">
          {/* Metadata Section */}
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-stone-300" />
              {article.date}
            </span>
            <span className="h-1 w-1 rounded-full bg-stone-200" />
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-stone-300" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-stone-850 text-balance leading-snug group-hover:text-primary transition-colors duration-355 line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-[12px] text-stone-500 font-medium line-clamp-2 leading-relaxed flex-1">
            {article.excerpt}
          </p>

          {/* Premium Bottom Action Bar with Symmetrical Divider */}
          <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 group-hover:text-primary transition-colors duration-300">
              Czytaj więcej
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#faf9f5] border border-stone-200/60 text-stone-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm">
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  )
}

