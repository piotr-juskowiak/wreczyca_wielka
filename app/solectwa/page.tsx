"use client"

import { useState, useMemo, useEffect } from "react"
import useSWR from "swr"
import { motion, AnimatePresence } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NewsCard } from "@/components/news-card"
import { MapPin, Search, Sparkles, Navigation, Globe, Building2, HelpCircle } from "lucide-react"
import type { NewsArticle } from "@/lib/news-service"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const SOLECTWA = [
  "Bieżeń", "Bór Zapilski", "Borowe", "Brzezinki", "Czarna Wieś", "Długi Kąt",
  "Golce", "Grodzisko", "Hutka", "Jezioro", "Kalej", "Klepaczka", "Kuleje",
  "Nowa Szarlejka", "Nowiny", "Pierzchno", "Piła Druga", "Piła Pierwsza",
  "Puszczew", "Szarlejka", "Truskolasy I", "Truskolasy II", "Węglowice",
  "Wręczyca Mała", "Wręczyca Wielka I", "Wręczyca Wielka II", "Wydra", "Zamłynie"
]

export default function SolectwaPage() {
  const { data, isLoading } = useSWR<{ articles: NewsArticle[] }>("/api/news", fetcher, {
    revalidateOnFocus: false,
  })
  const allArticles = data?.articles ?? []

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSolectwo, setSelectedSolectwo] = useState<string | null>(null)

  // Pre-select sołectwo from URL query parameter ?wybrane=...
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const wybrane = params.get("wybrane")
      if (wybrane && SOLECTWA.includes(wybrane)) {
        setSelectedSolectwo(wybrane)
      }
    }
  }, [])

  // Filter sołectwa by search query
  const filteredSolectwa = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return SOLECTWA
    return SOLECTWA.filter(s => s.toLowerCase().includes(q))
  }, [searchQuery])

  // Filter articles matching the selected sołectwo
  const matchingArticles = useMemo(() => {
    if (!selectedSolectwo) {
      // If no sołectwo is selected, show recent articles from "Sołectwa" category
      return allArticles.filter(a => 
        a.category === "Sołectwa" || 
        /(sołectw|sołtys|mieszkańc|lokaln|wiejsk|bieżeń|kalej|truskolas|grodzisk|gmin|sołec)/i.test(a.title + " " + a.excerpt)
      ).slice(0, 6)
    }
    
    // Exact or loose match to the specific village name
    const q = selectedSolectwo.toLowerCase()
    return allArticles.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.excerpt.toLowerCase().includes(q)
    )
  }, [allArticles, selectedSolectwo])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Editorial Hero Section */}
        <section className="bg-gradient-to-b from-white to-secondary/30 border-b border-stone-200/60">
          <div className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-golden-lightest border border-golden-light/40 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-golden-dark mb-4 backdrop-blur-md">
                <Navigation className="h-3.5 w-3.5 text-golden" />
                Nasza Społeczność
              </span>
              <h1 className="text-4xl sm:text-5xl font-light text-foreground leading-tight tracking-tight text-balance">
                Sołectwa Gminy Wręczyca Wielka
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
                Gmina Wręczyca Wielka składa się z 28 sołectw, z których każde posiada swoją własną unikalną tożsamość, tradycje i historię. Wybierz swoją miejscowość, aby filtrować najnowsze wieści, ogłoszenia i inicjatywy lokalne.
              </p>
            </div>

            {/* Search Input for villages */}
            <div className="mt-8 relative max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Wyszukaj swoje sołectwo..."
                className="w-full h-12 rounded-2xl bg-white pl-12 pr-4 text-base text-foreground shadow-sm placeholder:text-muted-foreground border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </section>

        {/* Interactive Village Grid */}
        <section className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-xl font-bold uppercase tracking-wider text-foreground mb-8 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-dusty-olive" />
            Wybierz Sołectwo ({filteredSolectwa.length})
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSolectwa.map((sol) => {
              const isSelected = selectedSolectwo === sol
              return (
                <motion.button
                  key={sol}
                  onClick={() => setSelectedSolectwo(isSelected ? null : sol)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group p-5 rounded-3xl border text-center text-sm font-semibold transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3 shadow-sm ${
                    isSelected
                      ? "bg-golden border-golden text-[#344e41] shadow-lg shadow-golden/10"
                      : "bg-white border-stone-200/80 text-foreground hover:bg-stone-50 hover:border-dusty-olive/30 hover:shadow-md"
                  }`}
                >
                  <MapPin className={`h-6 w-6 transition-colors ${
                    isSelected ? "text-[#344e41]" : "text-dusty-olive group-hover:text-dusty-olive-hover"
                  }`} />
                  <span className="break-words w-full">{sol}</span>
                </motion.button>
              )
            })}
          </div>

          {filteredSolectwa.length === 0 && (
            <div className="text-center py-12 rounded-3xl bg-white border border-border/40 p-8 shadow-sm">
              <HelpCircle className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
              <p className="font-semibold text-foreground">Nie znaleziono sołectwa o takiej nazwie</p>
              <p className="text-sm text-muted-foreground mt-1">Upewnij się, że wpisałeś poprawną nazwę miejscowości.</p>
            </div>
          )}
        </section>

        {/* Dynamic News Section for selected village */}
        <section className="bg-stone-50/50 border-t border-stone-200/50 py-16">
          <div className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-border/50 pb-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-dusty-olive-light text-dusty-olive px-3.5 py-1 text-[9px] font-black uppercase tracking-widest mb-2 border border-dusty-olive/20">
                  <Sparkles className="h-3.5 w-3.5 text-dusty-olive" />
                  Wieści lokalne
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-foreground">
                  {selectedSolectwo 
                    ? `Wiadomości z sołectwa: ${selectedSolectwo}`
                    : "Wszystkie wiadomości z naszych sołectw"
                  }
                </h2>
              </div>
              
              {selectedSolectwo && (
                <button
                  onClick={() => setSelectedSolectwo(null)}
                  className="text-xs font-bold uppercase tracking-wider text-dusty-olive hover:text-dusty-olive-hover hover:underline cursor-pointer"
                >
                  Pokaż wszystkie miejscowości
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20 text-muted-foreground">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mr-3" />
                Wczytuję wiadomości lokalne…
              </div>
            ) : matchingArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {matchingArticles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-border/40 p-8 shadow-sm">
                <Globe className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3 animate-pulse" />
                <p className="font-semibold text-foreground">Brak dedykowanych artykułów</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Aktualnie nie ma osobnych artykułów przypisanych do {selectedSolectwo}. Zachęcamy do śledzenia ogólnych wiadomości z naszej gminy!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
