"use client"

import { useMemo, useState } from "react"
import useSWR from "swr"
import { motion } from "framer-motion"
import { Search, Filter, Loader2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NewsCard } from "@/components/news-card"
import type { NewsArticle } from "@/lib/news-service"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

export default function AktualnosciPage() {
  const { data, isLoading } = useSWR<{ articles: NewsArticle[] }>("/api/news", fetcher, {
    revalidateOnFocus: false,
  })
  const all = data?.articles ?? []

  const categories = useMemo(() => {
    const set = new Set<string>(all.map((a) => a.category))
    return ["Wszystkie", ...Array.from(set)]
  }, [all])

  const [query, setQuery] = useState("")
  const [active, setActive] = useState("Wszystkie")

  const filtered = useMemo(() => {
    return all.filter((a) => {
      const matchesCat = active === "Wszystkie" || a.category === active
      const q = query.trim().toLowerCase()
      const matchesQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      return matchesCat && matchesQ
    })
  }, [all, active, query])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-white to-secondary/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Aktualności
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground text-balance leading-tight">
                Co słychać w gminie Wręczyca Wielka?
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
                Najnowsze informacje, wydarzenia, inwestycje i ogłoszenia z urzędu, sołectw i instytucji gminnych —
                pobierane bezpośrednio z oficjalnej strony gminy.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative max-w-xl flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Szukaj w aktualnościach..."
                  className="w-full h-12 rounded-2xl bg-white pl-12 pr-4 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                {filtered.length} {filtered.length === 1 ? "artykuł" : "artykułów"}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active === cat
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-white text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {isLoading ? (
            <div className="flex items-center justify-center py-24 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mr-3" />
              Wczytuję aktualności z wreczyca-wielka.pl…
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
              <p className="text-lg font-semibold text-foreground">Nic nie znaleziono</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Spróbuj zmienić zapytanie lub wybierz inną kategorię.
              </p>
            </div>
          ) : (
            <motion.div
              key={active + query}
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </motion.div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
