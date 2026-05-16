"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

export function HeroNews({ article }: { article: NewsArticle }) {
  return (
    <motion.section
      aria-label="Wyróżniona aktualność"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="group relative overflow-hidden rounded-[3rem] bg-white shadow-2xl shadow-[#344e41]/10 border border-[#dad7cd]/40">
        <div className="flex flex-col lg:flex-row min-h-[550px]">
          {/* Image Side */}
          <div className="relative lg:w-1/2 overflow-hidden">
            <motion.img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
            
            <div className="absolute top-8 left-8">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/95 backdrop-blur-md px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3a5a40] shadow-xl border border-[#a3b18a]/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#588157] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#588157]"></span>
                </span>
                Wyróżnione · {article.category}
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 flex flex-col justify-center p-8 md:p-16 bg-gradient-to-br from-white to-[#f1f3ef]/50">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.25em] text-[#588157]/60 mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {article.date}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#dad7cd]" />
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#344e41] text-balance leading-[1.05] tracking-tight">
              {article.title}
            </h1>

            <p className="mt-8 text-lg text-[#3a5a40]/70 leading-relaxed max-w-xl">
              {article.excerpt}
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <motion.a
                href={`/aktualnosci/${article.slug}`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn inline-flex items-center gap-4 rounded-2xl bg-[#3a5a40] px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-[#3a5a40]/20 transition-all hover:bg-[#344e41]"
              >
                Czytaj artykuł
                <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
              </motion.a>
              
              <div className="h-12 w-[1px] bg-[#dad7cd] hidden sm:block" />
              
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#a3b18a] uppercase tracking-widest">Sekcja</span>
                <span className="text-sm font-bold text-[#344e41]">{article.category}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 p-12 opacity-5 pointer-events-none">
          <div className="h-64 w-64 rounded-full border-[32px] border-[#3a5a40] -mr-32 -mb-32" />
        </div>
      </div>
    </motion.section>
  )
}
