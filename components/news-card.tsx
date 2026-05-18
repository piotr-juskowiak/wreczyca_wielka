"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
      className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-stone-200/60 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-stone-200/30 hover:border-stone-300 h-full"
    >
      <a href={`/aktualnosci/${article.slug}`} className="flex flex-col h-full">
        {/* Sleek, wide aspect ratio image container */}
        <div className="relative aspect-[2/1] overflow-hidden m-2 rounded-[1rem]">
          <motion.img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
          {/* Metadata Section */}
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-stone-400/80 mb-2.5">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-stone-400/70" />
              {article.date}
            </span>
            <span className="h-1 w-1 rounded-full bg-stone-200" />
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-stone-400/70" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-800 text-balance leading-snug group-hover:text-golden-dark transition-colors duration-200 line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-[11.5px] text-stone-500 font-medium line-clamp-2 leading-relaxed flex-1">
            {article.excerpt}
          </p>

          {/* Compact Inline Bottom Action */}
          <div className="mt-3.5 flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-slate-700 group-hover:text-golden-dark transition-all duration-300">
            <span>Czytaj więcej</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </a>
    </motion.article>
  )
}

