"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

const categoryColors: Record<string, string> = {
  Inwestycje: "bg-blue-100 text-blue-700",
  Wydarzenia: "bg-orange-100 text-orange-700",
  Ogłoszenia: "bg-emerald-100 text-emerald-700",
  Edukacja: "bg-violet-100 text-violet-700",
  Konsultacje: "bg-sky-100 text-sky-700",
  Sport: "bg-rose-100 text-rose-700",
  Kultura: "bg-amber-100 text-amber-700",
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
}

export function NewsCard({ article }: { article: NewsArticle }) {
  const badgeClass = categoryColors[article.category] ?? "bg-secondary text-foreground"

  return (
    <motion.article
      variants={item}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      <a href={article.href} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
          <motion.img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <span
            className={`absolute top-4 left-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
          >
            {article.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-bold text-foreground text-balance leading-snug group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="mt-5 flex items-center justify-between pt-4 border-t border-border/60">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {article.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime}
              </span>
            </div>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  )
}
