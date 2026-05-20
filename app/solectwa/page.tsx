"use client"

import { useState, useMemo, useEffect } from "react"
import useSWR from "swr"
import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NewsCard } from "@/components/news-card"
import { MapPin, Search, Navigation, Globe, HelpCircle, Loader2 } from "lucide-react"
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const wybrane = params.get("wybrane")
      if (wybrane && SOLECTWA.includes(wybrane)) {
        setSelectedSolectwo(wybrane)
      }
    }
  }, [])

  const filteredSolectwa = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return SOLECTWA
    return SOLECTWA.filter(s => s.toLowerCase().includes(q))
  }, [searchQuery])

  const matchingArticles = useMemo(() => {
    if (!selectedSolectwo) {
      return allArticles.filter(a =>
        a.category === "Sołectwa" ||
        /(sołectw|sołtys|mieszkańc|lokaln|wiejsk|bieżeń|kalej|truskolas|grodzisk|gmin|sołec)/i.test(a.title + " " + a.excerpt)
      ).slice(0, 9)
    }
    const q = selectedSolectwo.toLowerCase()
    const exact = allArticles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q)
    )
    if (exact.length < 3) {
      const extra = allArticles.filter(a =>
        !exact.find(e => e.id === a.id) &&
        /(sołectw|sołtys|mieszkańc|lokaln|wiejsk)/i.test(a.title + " " + a.excerpt)
      )
      return [...exact, ...extra].slice(0, 9)
    }
    return exact.slice(0, 9)
  }, [allArticles, selectedSolectwo])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">

        {/* Hero Header */}
        <section className="relative overflow-hidden border-b border-stone-200/60">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/96 via-white/90 to-amber-500/10" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/80 to-transparent" />

          <div className="relative z-10 mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/25 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#b45309] mb-4">
              <Navigation className="h-3.5 w-3.5 text-[#d97706]" />
              Nasza Społeczność
            </span>
            <h1 className="text-4xl sm:text-5xl font-light text-foreground leading-tight tracking-tight text-balance">
              Sołectwa Gminy <span className="whitespace-nowrap font-semibold text-[#b45309]">Wręczyca Wielka</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
              Gmina Wręczyca Wielka jednoczy 28 dynamicznie rozwijających się sołectw. Wybierz miejscowość, aby filtrować najświeższe wiadomości i inicjatywy lokalne.
            </p>
          </div>
        </section>

        {/* Main layout: Sidebar left + News right */}
        <section className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* LEFT SIDEBAR: Search + Village List */}
            <aside className="w-full lg:w-[320px] shrink-0 sticky top-4">
              <div className="bg-white rounded-3xl border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">
                {/* Sidebar header */}
                <div className="bg-gradient-to-r from-[#d97706] via-[#b45309] to-[#92400e] px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 border border-white/25">
                      <MapPin className="h-4.5 w-4.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-100">Wybierz sołectwo</p>
                      <p className="text-[10px] text-amber-200/80 font-medium">{filteredSolectwa.length} miejscowości</p>
                    </div>
                  </div>
                  {/* Search in sidebar */}
                  <div className="relative mt-4">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-200" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Szukaj sołectwa..."
                      className="w-full h-10 rounded-xl bg-white/15 border border-white/20 pl-10 pr-4 text-sm text-white placeholder:text-amber-200/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    />
                  </div>
                </div>

                {/* Village list — no scroll */}
                <div className="p-3">
                  {filteredSolectwa.length === 0 ? (
                    <div className="text-center py-8">
                      <HelpCircle className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                      <p className="text-sm font-medium text-muted-foreground">Nie znaleziono sołectwa</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-1">
                      {filteredSolectwa.map((sol) => {
                        const isSelected = selectedSolectwo === sol
                        return (
                          <motion.button
                            key={sol}
                            onClick={() => setSelectedSolectwo(isSelected ? null : sol)}
                            whileTap={{ scale: 0.97 }}
                            className={`group flex items-center gap-2 rounded-xl px-3 py-2.5 text-[12px] font-medium text-left transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "bg-gradient-to-r from-[#d97706] to-[#b45309] text-white shadow-md shadow-amber-900/15"
                                : "text-slate-700 hover:bg-amber-50 hover:text-[#b45309]"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? "bg-amber-200" : "bg-amber-400 group-hover:bg-[#d97706]"}`} />
                            <span className="truncate">{sol}</span>
                          </motion.button>
                        )
                      })}
                    </div>
                  )}
                  {selectedSolectwo && (
                    <button
                      onClick={() => setSelectedSolectwo(null)}
                      className="mt-3 w-full rounded-xl border border-amber-200 bg-amber-50 py-2 text-[11px] font-bold uppercase tracking-wider text-[#b45309] hover:bg-amber-100 transition-colors cursor-pointer"
                    >
                      Pokaż wszystkie
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {/* RIGHT: News articles */}
            <div className="flex-1 w-full">
              {/* Section header */}
              <div className="flex items-end justify-between mb-8 pb-5 border-b border-stone-200/60">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 text-[#b45309] px-3 py-1 text-[9px] font-black uppercase tracking-widest mb-2 border border-amber-500/20">
                    Wieści lokalne
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-light text-foreground">
                    {selectedSolectwo
                      ? <><span className="font-semibold text-[#b45309]">{selectedSolectwo}</span> — wiadomości</>
                      : "Wszystkie wiadomości z sołectw"
                    }
                  </h2>
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-24 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin mr-3 text-amber-500" />
                  Wczytuję wiadomości lokalne…
                </div>
              ) : matchingArticles.length > 0 ? (
                <motion.div
                  key={selectedSolectwo ?? "all"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {matchingArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-border/40 shadow-sm">
                  <Globe className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="font-semibold text-foreground">Brak dedykowanych artykułów</p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                    Aktualnie nie ma osobnych artykułów przypisanych do {selectedSolectwo}. Sprawdź ogólne wiadomości gminy!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Banner with photo */}
        <section className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8 pb-16">
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            {/* Background photo */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070')" }}
            />
            {/* Orange gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#d97706]/95 via-[#b45309]/88 to-[#78350f]/80" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 p-10 md:p-16">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-amber-100 mb-5 border border-white/15">
                  Samorząd Lokalny
                </span>
                <h2 className="text-3xl md:text-4xl font-light leading-tight tracking-tight mb-4 text-white">
                  Masz pomysł na rozwój <span className="font-semibold">swojej okolicy?</span>
                </h2>
                <p className="text-amber-100/85 mb-8 max-w-lg leading-relaxed font-light text-sm md:text-base">
                  Zaangażuj się w życie lokalnej społeczności. Skontaktuj się ze swoim sołtysem lub przedstawicielami rady sołeckiej, aby zgłosić inicjatywę obywatelską i efektywnie wykorzystać fundusz sołecki.
                </p>
                <button className="rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-amber-800 shadow-md hover:bg-amber-50 transition-colors">
                  Dane kontaktowe sołtysów
                </button>
              </div>
              {/* Right side decorative image panel */}
              <div className="hidden md:flex flex-1 justify-end">
                <div className="relative w-72 h-52 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=600"
                    alt="Społeczność"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
