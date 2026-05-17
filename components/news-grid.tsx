"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NewsCard } from "./news-card"
import type { NewsArticle } from "@/lib/news-service"
import { ChevronDown, Filter } from "lucide-react"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

export function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  const [activeCategory, setActiveCategory] = useState("Wszystkie")
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")

  const categories = useMemo(() => {
    const cats = Array.from(new Set(articles.map((a) => a.category)))
    return ["Wszystkie", ...cats]
  }, [articles])

  const filteredAndSortedArticles = useMemo(() => {
    let result = [...articles]
    
    if (activeCategory !== "Wszystkie") {
      result = result.filter((a) => a.category === activeCategory)
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date.split('.').reverse().join('-')).getTime()
      const dateB = new Date(b.date.split('.').reverse().join('-')).getTime()
      return sortBy === "newest" ? dateB - dateA : dateA - dateB
    })

    return result
  }, [articles, activeCategory, sortBy])

  return (
    <section
      id="aktualnosci"
      aria-labelledby="latest-news"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8"
      >
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-[#a3b18a]/20 text-[#3a5a40] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest mb-4 border border-[#a3b18a]/30">
            Aktualności
          </span>
          <h2 id="latest-news" className="text-4xl md:text-5xl font-black text-[#344e41] text-balance leading-tight">
            Co słychać w gminie?
          </h2>
          <p className="mt-4 text-lg text-[#3a5a40]/60 font-medium">
            Najnowsze informacje, wydarzenia i ogłoszenia z Gminy Wręczyca Wielka.
          </p>
        </div>
        <a
          href="/aktualnosci"
          className="group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-[#3a5a40] hover:text-[#588157] transition-all"
        >
          Wszystkie wpisy
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-[#dad7cd]/40 group-hover:bg-[#3a5a40] group-hover:text-white transition-all">
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </div>
        </a>
      </motion.div>

      {/* Filter & Sort Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-[#dad7cd]/40"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? "bg-[#3a5a40] text-white shadow-lg shadow-[#3a5a40]/20"
                  : "bg-white text-[#3a5a40] hover:bg-[#f1f3ef] border border-[#dad7cd]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl border border-[#dad7cd]/40 shadow-sm">
            <Filter className="h-3.5 w-3.5 text-[#a3b18a]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[11px] font-black uppercase tracking-widest text-[#344e41] outline-none cursor-pointer"
            >
              <option value="newest">Najnowsze</option>
              <option value="oldest">Najstarsze</option>
            </select>
          </div>
          <span className="text-[10px] font-black text-[#a3b18a] uppercase tracking-widest">
            {filteredAndSortedArticles.length} wyników
          </span>
        </div>
      </motion.div>

      <motion.div
        layout
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredAndSortedArticles.map((article) => (
            <motion.div
              key={article.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <NewsCard article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
