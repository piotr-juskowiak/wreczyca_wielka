"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Search, X, Calendar, ArrowUpRight } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import useSWR from "swr"
import type { NewsArticle } from "@/lib/news-service"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const { data } = useSWR<{ articles: NewsArticle[] }>(open ? "/api/news" : null, fetcher, {
    revalidateOnFocus: false,
  })
  const all = data?.articles ?? []

  useEffect(() => {
    if (open) {
      setQuery("")
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const results: NewsArticle[] = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return all.slice(0, 6)
    return all.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q),
    )
  }, [query, all])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Wyszukiwarka"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-card shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Szukaj aktualności, e-usług, kategorii..."
                className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
                ESC
              </kbd>
              <button
                aria-label="Zamknij"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground/70 hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3">
              {!data ? (
                <div className="px-4 py-12 text-center text-sm text-muted-foreground">Wczytuję…</div>
              ) : results.length === 0 ? (
                <div className="px-4 py-12 text-center">
                  <p className="text-sm font-medium text-foreground">
                    Brak wyników dla &quot;{query}&quot;
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Spróbuj innego hasła lub kategorii.
                  </p>
                </div>
              ) : (
                <>
                  {!query && (
                    <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Najnowsze
                    </p>
                  )}
                  <ul className="flex flex-col gap-1">
                    {results.map((a) => (
                      <li key={a.id}>
                        <a
                          href={a.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onClose}
                          className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-secondary"
                        >
                          <span className="mt-0.5 inline-flex items-center rounded-full bg-[#e8e6d4] px-2.5 py-1 text-[10px] font-bold text-[#414833] shrink-0">
                            {a.category}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary">
                              {a.title}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                              {a.excerpt}
                            </p>
                            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {a.date}
                            </div>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 shrink-0" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
