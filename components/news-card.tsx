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
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-lg border border-[#e2ded4] bg-white shadow-[0_10px_30px_rgba(38,47,33,0.055)] transition-all duration-300 hover:border-[#9aae83] hover:shadow-[0_18px_38px_rgba(58,90,64,0.14)]"
    >
      <a href={`/aktualnosci/${article.slug}`} className="flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4d7928]">
        <div className="relative aspect-[16/9] overflow-hidden bg-[#edf2e8]">
          <motion.img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-[filter] duration-500 group-hover:saturate-[1.08]"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.045 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1811]/45 via-[#0e1811]/5 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-65" />

          {!hideCategory && (
            <span className="absolute left-3 top-3 rounded-md border border-white/35 bg-white/88 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#4d7928] shadow-sm backdrop-blur-md">
              {article.category}
            </span>
          )}

          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/90 text-[#3a5a40] shadow-sm backdrop-blur-md transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[#ffd230] group-hover:text-[#0e1811]">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
          <h3 className="text-[19px] font-medium leading-[1.08] tracking-normal text-[#4d7928] transition-colors duration-300 line-clamp-2 group-hover:text-[#385d1b]">
            {article.title}
          </h3>

          <p className="mt-3 flex-1 text-[13px] font-normal leading-[1.22] tracking-normal text-[#2c2c2c] line-clamp-3">
            {article.excerpt}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#ece8df] pt-3 text-[12px] leading-none text-[#9d9d9d]">
            <span className="flex min-w-0 items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 shrink-0 text-[#b6b6b6]" strokeWidth={2.25} />
              <span className="truncate">{article.date} r. | {article.readTime}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1">
              <span>{commentCount}</span>
              <MessageCircle className="h-3.5 w-3.5 text-[#b6b6b6]" strokeWidth={1.9} />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  )
}
