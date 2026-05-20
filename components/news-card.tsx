"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Clock3, MessageCircle } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

function getCommentCount(article: NewsArticle) {
  const lastDigit = Number(article.id.match(/\d/g)?.at(-1) ?? "1")
  return Math.max(1, lastDigit % 4)
}

export function NewsCard({ article, hideCategory = false }: { article: NewsArticle; hideCategory?: boolean }) {
  const commentCount = getCommentCount(article)

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#00933f]/30 hover:shadow-[0_20px_50px_rgba(0,147,63,0.10)]"
    >
      <a href={`/aktualnosci/${article.slug}`} className="flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00933f]">
        <div className="relative aspect-[16/9] overflow-hidden bg-stone-100 shrink-0">
          <motion.img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-[filter,transform] duration-700 group-hover:scale-[1.06] group-hover:brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />

          {!hideCategory && (
            <span className="absolute left-3.5 top-3.5 rounded-lg border border-white/25 bg-white/90 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#006e2e] shadow-sm backdrop-blur-md">
              {article.category}
            </span>
          )}

          <span className="absolute bottom-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/90 text-[#344e41] shadow-sm backdrop-blur-md transition-all duration-300 group-hover:bg-[#00933f] group-hover:text-white group-hover:border-[#00933f] group-hover:shadow-[0_4px_16px_rgba(0,147,63,0.3)]">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <h3 className="text-[15px] font-bold leading-[1.35] tracking-[-0.01em] text-slate-900 transition-colors duration-300 line-clamp-2 group-hover:text-[#006e2e] mb-2.5">
            {article.title}
          </h3>

          <p className="flex-1 text-[12.5px] font-normal leading-[1.7] text-stone-500 line-clamp-3">
            {article.excerpt}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-100 pt-3.5 text-[11px] leading-none text-stone-400">
            <span className="flex min-w-0 items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 shrink-0 text-stone-300" strokeWidth={2} />
              <span className="truncate font-medium text-stone-500">{article.date} r.</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 font-medium text-stone-500">
              <span>{commentCount}</span>
              <MessageCircle className="h-3.5 w-3.5 text-stone-300" strokeWidth={1.9} />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  )
}
