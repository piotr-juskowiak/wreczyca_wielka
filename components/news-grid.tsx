"use client"

import { motion } from "framer-motion"
import { NewsCard } from "./news-card"
import type { NewsArticle } from "@/lib/news-service"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

export function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  return (
    <section
      id="aktualnosci"
      aria-labelledby="latest-news"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <span className="inline-block rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-semibold mb-3">
            Aktualności
          </span>
          <h2 id="latest-news" className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Co słychać w gminie?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Najnowsze informacje, wydarzenia i ogłoszenia z Gminy Wręczyca Wielka.
          </p>
        </div>
        <a
          href="/aktualnosci"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Zobacz wszystkie →
        </a>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </motion.div>
    </section>
  )
}
