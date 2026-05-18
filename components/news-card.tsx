"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.015)] transition-all duration-500 hover:shadow-[0_12px_30px_rgba(58,90,64,0.06)] hover:border-primary/25 h-full"
    >
      <a href={`/aktualnosci/${article.slug}`} className="flex flex-col h-full">
        {/* Aspect ratio optimized to show text-heavy graphics without cropping top/bottom */}
        <div className="relative aspect-[16/10.5] overflow-hidden m-2.5 rounded-[1.4rem] bg-stone-50 border border-stone-100 shadow-sm">
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

