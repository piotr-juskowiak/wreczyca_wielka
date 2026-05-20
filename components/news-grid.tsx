"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { NewsCard } from "./news-card"
import { NewsSidebar } from "./news-sidebar"
import type { NewsArticle } from "@/lib/news-service"
import { Trophy, Music, MapPin, ChevronRight, Sparkles, X, ArrowUpRight, Calendar, Newspaper, Trees, Images } from "lucide-react"
import { toast } from "sonner"

export function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  const [activePopupCategory, setActivePopupCategory] = useState<string | null>(null)

  // 1. Filter articles for Sport row (safely fallback to first 3 articles if none match)
  // 1. Filter articles for Sport row (safely fallback & pad to exactly 3 articles if matching are short)
  const sportArticles = useMemo(() => {
    const filtered = articles.filter((a) =>
      a.category === "Sport" ||
      /(sport|bieg|turniej|boisk|stadion|rower|pilk|piłk|aktyw|zawod|ks |puchar|mecz)/i.test(a.title + " " + a.excerpt)
    )
    if (filtered.length < 3) {
      const existingIds = new Set(filtered.map((a) => a.id))
      const padding = articles.filter((a) => !existingIds.has(a.id))
      return [...filtered, ...padding].slice(0, 3)
    }
    return filtered.slice(0, 3)
  }, [articles])

  // 2. Filter articles for Culture & Entertainment row (safely fallback & pad to exactly 3 articles if matching are short)
  const cultureArticles = useMemo(() => {
    const filtered = articles.filter((a) =>
      ["Kultura", "Wydarzenia"].includes(a.category) ||
      /(koncert|festiwal|dozynk|dożynk|teatr|muzyk|kultur|swiet|święt|piknik|artys|wystaw|warsztat|bibliotek)/i.test(a.title + " " + a.excerpt)
    )
    if (filtered.length < 3) {
      const existingIds = new Set(filtered.map((a) => a.id))
      const padding = articles.filter((a) => !existingIds.has(a.id))
      return [...filtered, ...padding].slice(0, 3)
    }
    return filtered.slice(0, 3)
  }, [articles])

  const cultureGallery = useMemo(() => {
    const isPhotoGallery = (article: NewsArticle) => {
      if (!article.image) return false
      const t = article.title.toLowerCase()
      // Wykluczamy nudne komunikaty urzędowe
      if (/(uwaga|informacja|komunikat|przerwa|dostaw|zawiadomienie|sesja|rada)/.test(t)) return false
      return true
    }
    const picked = cultureArticles.filter(isPhotoGallery)
    const pickedIds = new Set(picked.map((article) => article.id))
    const fallback = articles.filter((a) => isPhotoGallery(a) && !pickedIds.has(a.id))

    return [...picked, ...fallback].slice(0, 5)
  }, [articles, cultureArticles])

  // 3. Filter articles for Sołectwa row (safely fallback & pad to exactly 3 articles if matching are short)
  const solectwaArticles = useMemo(() => {
    const filtered = articles.filter((a) =>
      a.category === "Sołectwa" ||
      /(sołectw|sołtys|mieszkańc|lokaln|wiejsk|bieżeń|kalej|truskolas|grodzisk|gmin|sołec)/i.test(a.title + " " + a.excerpt)
    )
    if (filtered.length < 3) {
      const existingIds = new Set(filtered.map((a) => a.id))
      const padding = articles.filter((a) => !existingIds.has(a.id))
      return [...filtered, ...padding].slice(0, 3)
    }
    return filtered.slice(0, 3)
  }, [articles])

  // 4. Filter up to 9 articles for the modal popup archive based on category selection
  // If a specific category contains fewer than 9 matches in the live XML feed, we pad it with the next most recent
  // general articles so that the popup is always fully populated, rich, and visually satisfying.
  const popupArticles = useMemo(() => {
    if (!activePopupCategory) return []

    let filtered: NewsArticle[] = []

    if (activePopupCategory === "Sport") {
      filtered = articles.filter((a) =>
        a.category === "Sport" ||
        /(sport|bieg|turniej|boisk|stadion|rower|pilk|piłk|aktyw|zawod|ks |puchar|mecz)/i.test(a.title + " " + a.excerpt)
      )
    } else if (activePopupCategory === "Kultura") {
      filtered = articles.filter((a) =>
        ["Kultura", "Wydarzenia"].includes(a.category) ||
        /(koncert|festiwal|dozynk|dożynk|teatr|muzyk|kultur|swiet|święt|piknik|artys|wystaw|warsztat|bibliotek)/i.test(a.title + " " + a.excerpt)
      )
    } else if (activePopupCategory === "Sołectwa") {
      filtered = articles.filter((a) =>
        a.category === "Sołectwa" ||
        /(sołectw|sołtys|mieszkańc|lokaln|wiejsk|bieżeń|kalej|truskolas|grodzisk|gmin|sołec)/i.test(a.title + " " + a.excerpt)
      )
    }

    // Fallback padding: If we have fewer than 9 articles, pad with general recent articles without duplication
    if (filtered.length < 9) {
      const existingIds = new Set(filtered.map((a) => a.id))
      const paddingArticles = articles.filter((a) => !existingIds.has(a.id))
      return [...filtered, ...paddingArticles].slice(0, 9)
    }

    return filtered.slice(0, 9)
  }, [articles, activePopupCategory])


  const handleCategoryFilter = (cat: string) => {
    toast.success(`Filtrowanie: ${cat}`, {
      description: `Wyświetlam najnowsze wiadomości z kategorii ${cat.toLowerCase()}...`,
      duration: 3000,
      icon: <Sparkles className="h-4 w-4 text-golden-dark" />
    })
  }

  return (
    <section
      id="aktualnosci"
      aria-labelledby="latest-news"
      className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8 py-20 select-none"
    >
      {/* Hero powitalny (Minimalist) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
      >
        <div className="flex-1 w-full max-w-2xl">
          <div className="mb-8 flex items-center gap-3">
             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Oficjalny serwis gminy</span>
             <span className="text-stone-300">•</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">28 sołectw</span>
          </div>

          <h2
            id="latest-news"
            className="text-[2.5rem] font-light leading-[1.1] tracking-tight text-slate-800 lg:text-[3.5rem] mb-6"
          >
            Życie i wydarzenia we <span className="font-semibold text-slate-900 block mt-1">Wręczycy Wielkiej</span>
          </h2>
          
          <p className="text-base leading-relaxed text-stone-500 mb-10 sm:text-lg lg:text-xl font-light">
            Oficjalny serwis informacyjny naszej społeczności. Poznaj najświeższe doniesienia, sukcesy sportowe
            lokalnych klubów, wydarzenia kulturalne GOK oraz bieżące sprawy z każdego z 28 sołectw.
          </p>

          <Link
            href="/aktualnosci"
            className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-slate-900"
          >
            <span className="border-b border-transparent group-hover:border-slate-900 pb-0.5 transition-colors">Wszystkie aktualności</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <div className="flex-1 w-full relative lg:h-[500px]">
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full rounded-[2.5rem] overflow-hidden bg-stone-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
             <img src="https://d2exd72xrrp1s7.cloudfront.net/www/000/1k5/1c/1cnow14o4e28711fbt0j47ofjq3wnm50zu-uhi41226154/0?width=1920&crop=false&q=75" alt="Wręczyca Wielka" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
          </div>
        </div>
      </motion.div>

      {/* Main 2-Column Split Layout */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">

        {/* LEFT COLUMN: Structured News Rows */}
        <div className="flex-1 w-full space-y-16">

          {/* ROW 0: WIADOMOŚCI (LATEST NEWS - MATCHING SECTION STYLE) */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-[#00933f] via-[#008237] to-[#006e2e] border border-[#00933f]/30 rounded-2xl gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/12 text-white border border-white/15 shadow-sm shrink-0">
                  <Newspaper className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">
                    Wiadomości
                  </h3>
                  <span className="text-[10px] text-emerald-100/90 font-bold uppercase tracking-wider block">Najnowsze wydarzenia i doniesienia</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap sm:justify-end">
                <button
                  onClick={() => handleCategoryFilter("Lokalne")}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-100 hover:text-white bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-1.5 transition-all cursor-pointer"
                >
                  <span>Lokalne</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
                <button
                  onClick={() => handleCategoryFilter("Regionalne")}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-100 hover:text-white bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-1.5 transition-all cursor-pointer"
                >
                  <span>Regionalne</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {articles.slice(0, 3).map((article) => (
                <NewsCard key={article.id} article={article} hideCategory={true} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-[#208fcf] via-[#1c81bc] to-[#115682] border border-[#208fcf]/30 rounded-2xl gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/12 text-white border border-white/15 shadow-sm shrink-0">
                  <Trophy className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">
                    Sport w Gminie
                  </h3>
                  <span className="text-[10px] text-sky-100/90 font-bold uppercase tracking-wider block">Wydarzenia, rozgrywki i rekreacja</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap sm:justify-end">
                <button
                  onClick={() => {
                    toast.info("Filtrowanie dyscypliny: Piłka nożna", {
                      description: "Pobieranie aktualności piłkarskich z klubów GKS Wręczyca Wielka, Sokół Wręczyca Wielka, Płomień Czarna Wieś oraz Amator Golce.",
                      duration: 3500,
                      icon: <Trophy className="h-4 w-4 text-[#208fcf]" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-sky-100 hover:text-white bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-1.5 transition-all cursor-pointer"
                >
                  <span>Piłka nożna</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>

                <button
                  onClick={() => {
                    toast.info("Filtrowanie dyscypliny: Rekreacja", {
                      description: "Pobieranie informacji o ścieżkach rowerowych, spływach kajakowych i rekreacji ruchowej.",
                      duration: 3500,
                      icon: <Trophy className="h-4 w-4 text-[#208fcf]" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-sky-100 hover:text-white bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-1.5 transition-all cursor-pointer"
                >
                  <span>Rekreacja</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>

                <button
                  onClick={() => {
                    toast.info("Filtrowanie dyscypliny: Sporty walki", {
                      description: "Pobieranie sukcesów i wydarzeń sekcji karate, kickboxingu oraz innych sztuk walki we Wręczycy Wielkiej.",
                      duration: 3500,
                      icon: <Trophy className="h-4 w-4 text-[#208fcf]" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-sky-100 hover:text-white bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-1.5 transition-all cursor-pointer"
                >
                  <span>Sporty walki</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>

                <button
                  onClick={() => {
                    toast.info("Filtrowanie dyscypliny: Tenis stołowy", {
                      description: "Pobieranie wyników i harmonogramów turniejów oraz rozgrywek ligowych tenisa stołowego.",
                      duration: 3500,
                      icon: <Trophy className="h-4 w-4 text-[#208fcf]" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-sky-100 hover:text-white bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-1.5 transition-all cursor-pointer"
                >
                  <span>Tenis stołowy</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {sportArticles.map((article) => (
                <NewsCard key={article.id} article={article} hideCategory={true} />
              ))}
            </div>
          </div>

          {/* ROW 2: KULTURA I ROZRYWKA */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-[#e0a800] via-[#c49200] to-[#a37900] border border-[#c49200]/30 rounded-2xl gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/12 text-white border border-white/15 shadow-sm shrink-0">
                  <Music className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">
                    Kultura i Rozrywka
                  </h3>
                  <span className="text-[10px] text-amber-50/90 font-bold uppercase tracking-wider block">Festiwale, koncerty i lokalne tradycje</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap sm:justify-end">
                <button
                  onClick={() => {
                    toast.info("Filtrowanie: GOK Wręczyca Wielka", {
                      description: "Pobieranie aktualności z Gminnego Ośrodka Kultury we Wręczycy Wielkiej, w tym zapisów na warsztaty i wystawy.",
                      duration: 3500,
                      icon: <Music className="h-4 w-4 text-golden-dark" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-amber-50 hover:text-white bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-1.5 transition-all cursor-pointer"
                >
                  <span>GOK</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>

                <button
                  onClick={() => {
                    toast.info("Filtrowanie kategorii: Muzyka", {
                      description: "Pobieranie informacji o koncertach Dziecięcej Orkiestry Dętej, chórów i festiwalach muzycznych w gminie.",
                      duration: 3500,
                      icon: <Music className="h-4 w-4 text-golden-dark" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-amber-50 hover:text-white bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-1.5 transition-all cursor-pointer"
                >
                  <span>Muzyka</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>

                <button
                  onClick={() => {
                    toast.info("Filtrowanie kategorii: Rozrywka", {
                      description: "Pobieranie informacji o piknikach rodzinnych, Dniach Wręczycy Wielkiej, rajdach i kinie plenerowym.",
                      duration: 3500,
                      icon: <Music className="h-4 w-4 text-golden-dark" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-amber-50 hover:text-white bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-1.5 transition-all cursor-pointer"
                >
                  <span>Rozrywka</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>

                <button
                  onClick={() => {
                    toast.info("Filtrowanie kategorii: Teatr", {
                      description: "Pobieranie informacji o spektaklach teatralnych, teatrzykach dziecięcych i występach grup dramatycznych.",
                      duration: 3500,
                      icon: <Music className="h-4 w-4 text-golden-dark" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-amber-50 hover:text-white bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-1.5 transition-all cursor-pointer"
                >
                  <span>Teatr</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {cultureArticles.map((article) => (
                <NewsCard key={article.id} article={article} hideCategory={true} />
              ))}
            </div>

            {cultureGallery.length > 0 && (
              <div className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] sm:p-6 lg:p-7">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-stone-50 text-stone-500 ring-1 ring-stone-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                      <Images className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold uppercase tracking-wider text-slate-800 leading-tight">
                        W obiektywie
                      </h3>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mt-1">
                        Fotorelacje z wydarzeń gminnych
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/kultura-i-rozrywka"
                    className="group inline-flex w-fit items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-stone-600 transition-all hover:border-stone-300 hover:bg-stone-100 active:scale-95"
                  >
                    <span>Zobacz galerię</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </div>

                <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 sm:auto-rows-[180px]">
                  {cultureGallery.map((article, index) => (
                    <Link
                      key={`gallery-${article.id}`}
                      href={`/aktualnosci/${article.slug}`}
                      className={`group relative overflow-hidden rounded-[1.25rem] bg-stone-100 shadow-sm ring-1 ring-black/5 hover:ring-black/10 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00933f] ${
                        index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                      } ${index > 2 ? "hidden md:block" : ""}`}
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-[transform,filter] duration-700 group-hover:scale-[1.03] group-hover:brightness-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
                      
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <span className="mb-2 inline-flex rounded-md bg-white/15 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-white/95 backdrop-blur-md border border-white/20">
                          {article.category}
                        </span>
                        <h4 className={`font-semibold leading-[1.3] tracking-tight ${index === 0 ? "text-base sm:text-lg lg:text-xl line-clamp-3" : "text-xs sm:text-sm line-clamp-2"}`}>
                          {article.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Sticky Pinned Sidebar */}
        <NewsSidebar />

      </div>

      {/* 9-ARTICLE ARCHIVE CATEGORY MODAL POPUP (sleek list layout) */}
      <AnimatePresence>
        {activePopupCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">

            {/* Glassmorphic overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePopupCategory(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Window Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-gradient-to-b from-stone-50 to-stone-100 border border-stone-200/80 rounded-[2rem] p-6 sm:p-10 text-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10"
            >
              {/* Decorative subtle ambient circle inside modal */}
              <div className="absolute top-0 right-0 p-40 bg-golden/5 rounded-full blur-3xl pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-start justify-between pb-6 border-b border-stone-200 mb-6 shrink-0 pr-10 relative z-20">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-golden-lightest text-golden-dark px-3.5 py-1 text-[9px] font-black uppercase tracking-widest mb-2 border border-golden-light/40">
                    Archiwum kategorii
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 uppercase">
                    Kategoria: {activePopupCategory === "Kultura" ? "Kultura i Rozrywka" : activePopupCategory} — Ostatnie Artykuły
                  </h3>
                </div>

                {/* Close Cross button */}
                <button
                  onClick={() => setActivePopupCategory(null)}
                  className="absolute top-2 right-2 p-3 rounded-full bg-stone-100 border border-stone-250 text-stone-600 hover:text-white hover:bg-slate-900 active:scale-95 transition-all cursor-pointer z-30"
                  aria-label="Zamknij"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body (Scrollable sleek news list) */}
              <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin relative z-20">
                {popupArticles.length > 0 ? (
                  <div className="space-y-3.5 max-w-4xl mx-auto">
                    {popupArticles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/aktualnosci/${article.slug}`}
                        onClick={() => setActivePopupCategory(null)}
                        className="flex gap-4 p-3.5 bg-white hover:bg-stone-50 border border-stone-200/80 hover:border-stone-300 rounded-2xl transition-all duration-300 group items-center shadow-sm"
                      >
                        {/* Thumbnail */}
                        <div className="h-16 w-24 rounded-xl overflow-hidden shrink-0 bg-stone-100 shadow-sm">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Article Text Content */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-stone-50 text-stone-500 border border-stone-200/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                              {article.category}
                            </span>
                            <span className="text-[9px] font-bold text-stone-400 flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-stone-400/80" />
                              {article.date}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-800 group-hover:text-golden-dark transition-colors leading-snug line-clamp-1">
                            {article.title}
                          </h4>
                          <p className="text-[11px] text-stone-500 font-medium leading-relaxed line-clamp-1">
                            {article.excerpt}
                          </p>
                        </div>

                        {/* Action Arrow */}
                        <div className="h-8 w-8 rounded-full bg-stone-50 text-stone-400 border border-stone-200/50 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 flex items-center justify-center shrink-0 transition-all duration-300">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-sm font-bold text-stone-500">Brak dodatkowych artykułów w tej kategorii.</p>
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  )
}
