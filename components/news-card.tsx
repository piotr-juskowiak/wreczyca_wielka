"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

const categoryColors: Record<string, string> = {
  Inwestycje: "bg-digital-blue-light text-digital-blue border-digital-blue/20 backdrop-blur-md shadow-sm hover:bg-digital-blue hover:text-white transition-all",
  Biznes: "bg-digital-blue-light text-digital-blue border-digital-blue/20 backdrop-blur-md shadow-sm hover:bg-digital-blue hover:text-white transition-all",
  "E-Urząd": "bg-digital-blue-light text-digital-blue border-digital-blue/20 backdrop-blur-md shadow-sm hover:bg-digital-blue hover:text-white transition-all",
  Wydarzenia: "bg-vibrant-emerald-light text-vibrant-emerald-solid border-vibrant-emerald-solid/20 backdrop-blur-md shadow-sm hover:bg-vibrant-emerald-solid hover:text-white transition-all",
  Ogłoszenia: "bg-municipal-gold-light text-municipal-gold border-municipal-gold/30 backdrop-blur-md shadow-sm hover:bg-municipal-gold hover:text-white transition-all",
  Edukacja: "bg-digital-blue-light text-digital-blue border-digital-blue/25 backdrop-blur-md shadow-sm hover:bg-digital-blue hover:text-white transition-all",
  Konsultacje: "bg-vibrant-emerald-light text-vibrant-emerald-solid border-vibrant-emerald-solid/20 backdrop-blur-md shadow-sm hover:bg-vibrant-emerald-solid hover:text-white transition-all",
  Sport: "bg-vibrant-emerald-light text-vibrant-emerald-solid border-vibrant-emerald-solid/20 backdrop-blur-md shadow-sm hover:bg-vibrant-emerald-solid hover:text-white transition-all",
  Ekologia: "bg-vibrant-emerald-light text-vibrant-emerald-solid border-vibrant-emerald-solid/20 backdrop-blur-md shadow-sm hover:bg-vibrant-emerald-solid hover:text-white transition-all",
  Kultura: "bg-municipal-gold-light text-municipal-gold border-municipal-gold/30 backdrop-blur-md shadow-sm hover:bg-municipal-gold hover:text-white transition-all",
  Sołectwa: "bg-digital-blue-light text-digital-blue border-digital-blue/20 backdrop-blur-md shadow-sm hover:bg-digital-blue hover:text-white transition-all",
}

// Light gradient backgrounds tinted by category
const cardTints: Record<string, string> = {
  Inwestycje: "bg-gradient-to-br from-[#588157]/[0.04] via-card to-card",
  Biznes: "bg-gradient-to-br from-[#588157]/[0.04] via-card to-card",
  "E-Urząd": "bg-gradient-to-br from-[#588157]/[0.04] via-card to-card",
  Edukacja: "bg-gradient-to-br from-[#588157]/[0.04] via-card to-card",
  Sołectwa: "bg-gradient-to-br from-[#588157]/[0.04] via-card to-card",
  Wydarzenia: "bg-gradient-to-br from-[#3a5a40]/[0.05] via-card to-card",
  Sport: "bg-gradient-to-br from-[#3a5a40]/[0.05] via-card to-card",
  Ekologia: "bg-gradient-to-br from-[#3a5a40]/[0.05] via-card to-card",
  Konsultacje: "bg-gradient-to-br from-[#3a5a40]/[0.05] via-card to-card",
  Ogłoszenia: "bg-gradient-to-br from-[#a3b18a]/[0.06] via-card to-card",
  Kultura: "bg-gradient-to-br from-[#a3b18a]/[0.06] via-card to-card",
}

export function NewsCard({ article }: { article: NewsArticle }) {
  const badgeClass = categoryColors[article.category] ?? "bg-secondary text-foreground border-border"
  const tintClass = cardTints[article.category] ?? "bg-gradient-to-br from-secondary/40 via-card to-card"

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/60 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 ${tintClass}`}
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
            className={`absolute top-4 left-4 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${badgeClass}`}
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

          <h3 className="text-xl font-bold text-foreground text-balance leading-tight group-hover:text-digital-blue transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="mt-4 text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1">
            {article.excerpt}
          </p>

          <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between">
            <span className="text-xs font-bold text-digital-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Czytaj więcej
            </span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-foreground/70 transition-all group-hover:bg-digital-blue group-hover:text-white group-hover:rotate-12 shadow-sm">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  )
}
