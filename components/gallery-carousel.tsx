"use client"

import { Compass, MapPin, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import type { NewsArticle } from "@/lib/news-service"

const SOLECTWA = [
  "Bieżeń", "Bór Zapilski", "Borowe", "Brzezinki", "Czarna Wieś", "Długi Kąt",
  "Golce", "Grodzisko", "Hutka", "Jezioro", "Kalej", "Klepaczka", "Kuleje",
  "Nowa Szarlejka", "Nowiny", "Pierzchno", "Piła Druga", "Piła Pierwsza",
  "Puszczew", "Szarlejka", "Truskolasy I", "Truskolasy II", "Węglowice",
  "Wręczyca Mała", "Wręczyca Wielka I", "Wręczyca Wielka II", "Wydra", "Zamłynie"
]

interface GalleryCarouselProps {
  articles: NewsArticle[]
}

export function GalleryCarousel({ articles }: GalleryCarouselProps) {
  // Filter articles for sołectwa-related content (max 3 for a clean single row)
  const solectwaArticles = articles.filter((a) =>
    a.category === "Sołectwa" ||
    /(sołectw|sołtys|mieszkańc|lokaln|wiejsk|bieżeń|kalej|truskolas|grodzisk|gmin|sołec|węglowic|kulej)/i.test(a.title + " " + a.excerpt)
  ).slice(0, 3)

  // Extract village name from article for display
  const getVillageName = (article: NewsArticle): string => {
    const villageNames = SOLECTWA.map(s => s.toLowerCase().replace(" i", "").replace(" ii", ""))
    const text = (article.title + " " + article.excerpt).toLowerCase()
    for (const village of villageNames) {
      if (text.includes(village)) {
        return SOLECTWA.find(s => s.toLowerCase().includes(village)) || article.category
      }
    }
    return article.category
  }

  return (
    <section
      id="przewodnik"
      aria-labelledby="guide-title"
      className="relative overflow-hidden bg-gradient-to-br from-[#0c1c14] via-[#07130e] to-[#030705] py-20 lg:py-24 text-white border-y border-[#1c3327]/30 select-none"
    >
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2000')] bg-cover bg-center opacity-[0.06] mix-blend-luminosity pointer-events-none" 
        aria-hidden="true"
      />
      {/* Subtle green radial glow to enhance the depth */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(163,177,138,0.08),transparent_50%)] pointer-events-none" 
        aria-hidden="true"
      />
      <div className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header - Minimalist Editorial Style */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a3b18a] mb-4">
            <Compass className="h-4 w-4 text-[#a3b18a]" />
            <span>Odkryj naszą gminę</span>
          </div>
          
          <h2 id="guide-title" className="text-4xl md:text-5xl font-extralight text-white leading-tight tracking-tight">
            Sołectwa Gminy <span className="font-semibold text-[#a3b18a]">Wręczyca Wielka</span>
          </h2>
          
          <p className="mt-4 text-sm text-stone-400 font-light leading-relaxed max-w-xl">
            Poznaj 28 unikalnych sołectw, które współtworzą naszą dynamiczną społeczność. Wybierz miejscowość, aby zyskać dostęp do najnowszych wieści i inicjatyw.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT: Sołectwa List (25% / 3 cols equivalent) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-[11px] font-bold tracking-[0.15em] text-[#a3b18a] uppercase">Wybierz sołectwo</h3>
              <span className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">
                28 miejscowości
              </span>
            </div>
            
            {/* Plain grid, no scroll, extremely clean text list */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {SOLECTWA.map((sol) => (
                <Link
                  key={sol}
                  href={`/solectwa?wybrane=${encodeURIComponent(sol)}`}
                  className="group flex items-center gap-2 py-1.5 text-[13px] font-medium text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-700 group-hover:bg-[#a3b18a] transition-colors shrink-0" />
                  <span className="truncate">{sol}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: News Grid (75% / 9 cols equivalent) */}
          <div className="lg:col-span-8">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-[11px] font-bold tracking-[0.15em] text-[#a3b18a] uppercase">Aktualności z sołectw</h3>
              <Link
                href="/solectwa"
                className="text-[11px] font-bold uppercase tracking-widest text-[#a3b18a] hover:text-white transition-colors flex items-center gap-1 group"
              >
                <span>Wszystkie wieści</span>
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {solectwaArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/aktualnosci/${article.slug}`}
                  className="group flex flex-col h-full cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="aspect-[16/10] w-full overflow-hidden bg-stone-900 rounded-2xl shrink-0 relative mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-95"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                        <MapPin className="mr-1 h-3 w-3 text-[#a3b18a]" />
                        {getVillageName(article)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2 text-[10px] font-medium tracking-wider text-stone-500">
                      <time>{article.date}</time>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    
                    <h4 className="text-[14px] font-bold text-white leading-snug mb-2 group-hover:text-[#a3b18a] transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    
                    <p className="text-[12px] text-stone-400 leading-relaxed line-clamp-2 font-light">
                      {article.excerpt}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#a3b18a] group-hover:text-white transition-colors">
                      <span>Czytaj</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
