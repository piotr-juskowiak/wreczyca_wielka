"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

const categoryColors: Record<string, string> = {
  Inwestycje: "bg-digital-blue-light text-digital-blue border-digital-blue/20 bg-white/40 shadow-sm hover:bg-digital-blue hover:text-white transition-all",
  Biznes: "bg-digital-blue-light text-digital-blue border-digital-blue/20 bg-white/40 shadow-sm hover:bg-digital-blue hover:text-white transition-all",
  "E-Urząd": "bg-digital-blue-light text-digital-blue border-digital-blue/20 bg-white/40 shadow-sm hover:bg-digital-blue hover:text-white transition-all",
  Wydarzenia: "bg-vibrant-emerald-light text-vibrant-emerald-solid border-vibrant-emerald-solid/10 bg-white/40 shadow-sm hover:bg-vibrant-emerald hover:text-white transition-all",
  Ogłoszenia: "bg-[#a3b18a]/20 text-[#3a5a40] border-[#a3b18a]/30",
  Edukacja: "bg-[#dad7cd]/40 text-[#344e41] border-[#dad7cd]/50",
  Konsultacje: "bg-[#3a5a40]/10 text-[#3a5a40] border-[#3a5a40]/20",
  Sport: "bg-vibrant-emerald-light text-vibrant-emerald-solid border-vibrant-emerald-solid/10 bg-white/40 shadow-sm hover:bg-vibrant-emerald hover:text-white transition-all",
  Ekologia: "bg-vibrant-emerald-light text-vibrant-emerald-solid border-vibrant-emerald-solid/10 bg-white/40 shadow-sm hover:bg-vibrant-emerald hover:text-white transition-all",
  Kultura: "bg-[#a3b18a]/10 text-[#588157] border-[#a3b18a]/20",
}

export function NewsCard({ article }: { article: NewsArticle }) {
  const badgeClass = categoryColors[article.category] ?? "bg-secondary text-foreground border-border"

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-card border border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20"
    >
      <a href={`/aktualnosci/${article.slug}`} className="flex flex-col h-full">
        <div className="relative aspect-[16/10] overflow-hidden m-2 rounded-[1.5rem]">
          <motion.img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span
            className={`absolute top-4 left-4 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${badgeClass}`}
          >
            {article.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {article.date}
            </span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          </div>

          <h3 className="text-xl font-bold text-foreground text-balance leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          
          <p className="mt-4 text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1">
            {article.excerpt}
          </p>

          <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between">
            <span className="text-xs font-bold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Czytaj więcej
            </span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-foreground/70 transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-12 shadow-sm">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  )
}
