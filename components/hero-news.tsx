"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

export function HeroNews({ article }: { article: NewsArticle }) {
  return (
    <motion.section
      aria-label="Wyróżniona aktualność"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.05 }}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <motion.a
        href={article.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group block overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-secondary">
            <motion.img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <span className="absolute top-5 left-5 inline-flex items-center rounded-full bg-white/95 backdrop-blur px-3.5 py-1.5 text-xs font-bold text-primary shadow-sm">
              ⭐ Wyróżnione · {article.category}
            </span>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {article.date}
              </span>
              <span className="text-border">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance leading-tight group-hover:text-primary transition-colors">
              {article.title}
            </h1>

            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
              {article.excerpt}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-shadow group-hover:shadow-md"
              >
                Czytaj artykuł
                <ArrowRight className="h-4 w-4" />
              </motion.span>
              <span className="text-sm font-medium text-muted-foreground">
                {article.author}
              </span>
            </div>
          </div>
        </div>
      </motion.a>
    </motion.section>
  )
}
