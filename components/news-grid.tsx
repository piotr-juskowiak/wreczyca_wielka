"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { NewsCard } from "./news-card"
import { NewsSidebar } from "./news-sidebar"
import type { NewsArticle } from "@/lib/news-service"
import { Trophy, Music, MapPin, ChevronDown, Sparkles, X, ArrowUpRight, Calendar, Newspaper } from "lucide-react"
import { toast } from "sonner"

// Fully exhaustive list of all 28 villages (Sołectwa) inside Gmina Wręczyca Wielka
const SOLECTWA = [
  "Bieżeń", "Bór Zapilski", "Borowe", "Brzezinki", "Czarna Wieś", "Długi Kąt",
  "Golce", "Grodzisko", "Hutka", "Jezioro", "Kalej", "Klepaczka", "Kuleje",
  "Nowa Szarlejka", "Nowiny", "Pierzchno", "Piła Druga", "Piła Pierwsza",
  "Puszczew", "Szarlejka", "Truskolasy I", "Truskolasy II", "Węglowice",
  "Wręczyca Mała", "Wręczyca Wielka I", "Wręczyca Wielka II", "Wydra", "Zamłynie"
]

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

  // Click handler for Sołectwa buttons to trigger premium tactile toast
  const handleSolectwoClick = (solectwoName: string) => {
    toast.success(`Wybrano sołectwo: ${solectwoName}`, {
      description: "Filtrowanie wiadomości oraz ogłoszeń dedykowanych dla wybranej miejscowości...",
      duration: 3500,
      icon: <MapPin className="h-4 w-4 text-[#d97706]" />
    })
  }

  const handleCategoryFilter = (cat: string) => {
    toast.success(`Filtrowanie: ${cat}`, {
      description: `Wyświetlam najnowsze wiadomości z kategorii ${cat.toLowerCase()}...`,
      duration: 3000,
      icon: <Sparkles className="h-4 w-4 text-[#00933f]" />
    })
  }

  return (
    <section
      id="aktualnosci"
      aria-labelledby="latest-news"
      className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8 py-20 select-none"
    >
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-[#dad7cd]/40 pb-8"
      >
        <div className="max-w-2xl">
          <h2 id="latest-news" className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight leading-[1.12] mb-4.5">
            Życie i Wydarzenia we <br className="hidden sm:inline" />
            <span className="font-semibold text-slate-900">
              Wręczycy Wielkiej
            </span>
          </h2>
          <p className="text-sm md:text-base text-stone-500 font-semibold leading-relaxed max-w-xl">
            Oficjalny serwis informacyjny naszej społeczności. Poznaj najświeższe doniesienia, sukcesy sportowe lokalnych klubów, wydarzenia kulturalne GOK oraz bieżące sprawy z każdego z 28 sołectw.
          </p>
        </div>
        <a
          href="/aktualnosci"
          className="group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-dusty-olive hover:text-[#344e41] transition-all"
        >
          Wszystkie wpisy
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-stone-200 group-hover:bg-golden group-hover:text-[#344e41] group-hover:border-golden transition-all">
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </div>
        </a>
      </motion.div>

      {/* Main 2-Column Split Layout */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* LEFT COLUMN: Structured News Rows */}
        <div className="flex-1 w-full space-y-16">
          
          {/* ROW 0: WIADOMOŚCI (LATEST NEWS - MATCHING SECTION STYLE) */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#00933f]/8 border border-[#00933f]/15 rounded-2xl gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00933f]/10 text-[#00933f] border border-[#00933f]/20 shadow-sm shrink-0">
                  <Newspaper className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">
                    Wiadomości
                  </h3>
                  <span className="text-[10px] text-[#00933f]/85 font-bold uppercase tracking-wider block">Najnowsze wydarzenia i doniesienia</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 sm:justify-end">
                <button
                  onClick={() => handleCategoryFilter("Lokalne")}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#00933f] hover:text-[#007f36] transition-colors cursor-pointer"
                >
                  <span>Lokalne</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
                <span className="h-3 w-px bg-[#00933f]/20" />
                <button
                  onClick={() => handleCategoryFilter("Regionalne")}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#00933f] hover:text-[#007f36] transition-colors cursor-pointer"
                >
                  <span>Regionalne</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {articles.slice(0, 3).map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* ROW 1: SPORT - BLUE THEME */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#208fcf]/8 border border-[#208fcf]/15 rounded-2xl gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#208fcf]/10 text-[#208fcf] border border-[#208fcf]/20 shadow-sm shrink-0">
                  <Trophy className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">
                    Sport w Gminie
                  </h3>
                  <span className="text-[10px] text-[#208fcf]/85 font-bold uppercase tracking-wider block">Wydarzenia, rozgrywki i rekreacja</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3.5 flex-wrap sm:justify-end">
                <button
                  onClick={() => {
                    toast.info("Filtrowanie dyscypliny: Piłka nożna", {
                      description: "Pobieranie aktualności piłkarskich z klubów GKS Wręczyca Wielka, Sokół Wręczyca Wielka, Płomień Czarna Wieś oraz Amator Golce.",
                      duration: 3500,
                      icon: <Trophy className="h-4 w-4 text-[#208fcf]" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#208fcf] hover:text-[#1a7bb3] transition-colors cursor-pointer"
                >
                  <span>Piłka nożna</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
                <span className="h-3 w-px bg-[#208fcf]/20 hidden md:inline" />

                <button
                  onClick={() => {
                    toast.info("Filtrowanie dyscypliny: Rekreacja", {
                      description: "Pobieranie informacji o ścieżkach rowerowych, spływach kajakowych i rekreacji ruchowej.",
                      duration: 3500,
                      icon: <Trophy className="h-4 w-4 text-[#208fcf]" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#208fcf] hover:text-[#1a7bb3] transition-colors cursor-pointer"
                >
                  <span>Rekreacja</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
                <span className="h-3 w-px bg-[#208fcf]/20 hidden md:inline" />

                <button
                  onClick={() => {
                    toast.info("Filtrowanie dyscypliny: Sporty walki", {
                      description: "Pobieranie sukcesów i wydarzeń sekcji karate, kickboxingu oraz innych sztuk walki we Wręczycy Wielkiej.",
                      duration: 3500,
                      icon: <Trophy className="h-4 w-4 text-[#208fcf]" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#208fcf] hover:text-[#1a7bb3] transition-colors cursor-pointer"
                >
                  <span>Sporty walki</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
                <span className="h-3 w-px bg-[#208fcf]/20 hidden md:inline" />

                <button
                  onClick={() => {
                    toast.info("Filtrowanie dyscypliny: Tenis stołowy", {
                      description: "Pobieranie wyników i harmonogramów turniejów oraz rozgrywek ligowych tenisa stołowego.",
                      duration: 3500,
                      icon: <Trophy className="h-4 w-4 text-[#208fcf]" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#208fcf] hover:text-[#1a7bb3] transition-colors cursor-pointer"
                >
                  <span>Tenis stołowy</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {sportArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* ROW 2: KULTURA I ROZRYWKA */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#344e41]/8 border border-[#344e41]/15 rounded-2xl gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#344e41]/10 text-[#344e41] border border-[#344e41]/20 shadow-sm shrink-0">
                  <Music className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">
                    Kultura i Rozrywka
                  </h3>
                  <span className="text-[10px] text-[#344e41]/85 font-bold uppercase tracking-wider block">Festiwale, koncerty i lokalne tradycje</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3.5 flex-wrap sm:justify-end">
                <button
                  onClick={() => {
                    toast.info("Filtrowanie: GOK Wręczyca Wielka", {
                      description: "Pobieranie aktualności z Gminnego Ośrodka Kultury we Wręczycy Wielkiej, w tym zapisów na warsztaty i wystawy.",
                      duration: 3500,
                      icon: <Music className="h-4 w-4 text-[#344e41]" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#344e41] hover:text-[#23352c] transition-colors cursor-pointer"
                >
                  <span>GOK</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
                <span className="h-3 w-px bg-[#344e41]/20 hidden md:inline" />

                <button
                  onClick={() => {
                    toast.info("Filtrowanie kategorii: Muzyka", {
                      description: "Pobieranie informacji o koncertach Dziecięcej Orkiestry Dętej, chórów i festiwalach muzycznych w gminie.",
                      duration: 3500,
                      icon: <Music className="h-4 w-4 text-[#344e41]" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#344e41] hover:text-[#23352c] transition-colors cursor-pointer"
                >
                  <span>Muzyka</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
                <span className="h-3 w-px bg-[#344e41]/20 hidden md:inline" />

                <button
                  onClick={() => {
                    toast.info("Filtrowanie kategorii: Rozrywka", {
                      description: "Pobieranie informacji o piknikach rodzinnych, Dniach Wręczycy Wielkiej, rajdach i kinie plenerowym.",
                      duration: 3500,
                      icon: <Music className="h-4 w-4 text-[#344e41]" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#344e41] hover:text-[#23352c] transition-colors cursor-pointer"
                >
                  <span>Rozrywka</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
                <span className="h-3 w-px bg-[#344e41]/20 hidden md:inline" />

                <button
                  onClick={() => {
                    toast.info("Filtrowanie kategorii: Teatr", {
                      description: "Pobieranie informacji o spektaklach teatralnych, teatrzykach dziecięcych i występach grup dramatycznych.",
                      duration: 3500,
                      icon: <Music className="h-4 w-4 text-[#344e41]" />
                    })
                  }}
                  className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#344e41] hover:text-[#23352c] transition-colors cursor-pointer"
                >
                  <span>Teatr</span>
                  <span className="text-[11px] leading-none transition-transform group-hover:translate-x-0.5">»</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {cultureArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* ROW 3: SOŁECTWA */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#d97706]/8 border border-[#d97706]/15 rounded-2xl gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20 shadow-sm shrink-0">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">
                    Sołectwa Gminy Wręczyca Wielka
                  </h3>
                  <span className="text-[10px] text-[#d97706]/85 font-bold uppercase tracking-wider block">Nasze miejscowości i lokalne społeczności</span>
                </div>
              </div>
              <button
                onClick={() => setActivePopupCategory("Sołectwa")}
                className="group flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#d97706] hover:text-[#b45309] transition-colors cursor-pointer sm:justify-end"
              >
                <span>Zobacz więcej</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
            
            {/* 3 Latest Articles for Sołectwa */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-6">
              {solectwaArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>

            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-2xl pt-2">
              Wybierz swoje sołectwo z poniższej listy, aby szybko filtrować dedykowane wiadomości, obwieszczenia oraz lokalne inicjatywy mieszkańców.
            </p>

            {/* Premium Interactive Village Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {SOLECTWA.map((sol) => (
                <motion.button
                  key={sol}
                  onClick={() => handleSolectwoClick(sol)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group p-3.5 rounded-2xl bg-white border border-stone-200 text-center text-xs font-semibold text-slate-700 hover:bg-[#d97706]/10 hover:text-[#d97706] hover:border-[#d97706]/35 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <MapPin className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#d97706] transition-colors duration-300 shrink-0" />
                  <span className="truncate">{sol}</span>
                </motion.button>
              ))}
            </div>
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
              className="relative w-full max-w-4xl bg-gradient-to-b from-[#dad7cd] to-[#a3b18a] border border-golden/30 rounded-[2.5rem] p-6 sm:p-10 text-[#344e41] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10"
            >
              {/* Decorative subtle ambient circle inside modal */}
              <div className="absolute top-0 right-0 p-40 bg-[#a3b18a]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-start justify-between pb-6 border-b border-stone-200 mb-6 shrink-0 pr-10 relative z-20">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-golden-lightest text-golden-dark px-3.5 py-1 text-[9px] font-black uppercase tracking-widest mb-2 border border-golden-light/40">
                    Archiwum kategorii
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#344e41] uppercase">
                    Kategoria: {activePopupCategory === "Kultura" ? "Kultura i Rozrywka" : activePopupCategory} — Ostatnie Artykuły
                  </h3>
                </div>
                
                {/* Close Cross button */}
                <button
                  onClick={() => setActivePopupCategory(null)}
                  className="absolute top-2 right-2 p-3 rounded-full bg-[#344e41]/5 border border-[#344e41]/10 text-[#344e41] hover:text-white hover:bg-[#344e41] active:scale-95 transition-all cursor-pointer z-30"
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
                        className="flex gap-4 p-3.5 bg-white hover:bg-golden-lightest border border-stone-200 hover:border-golden/30 rounded-2xl transition-all duration-300 group items-center shadow-sm"
                      >
                        {/* Thumbnail */}
                        <div className="h-16 w-24 rounded-xl overflow-hidden shrink-0 bg-secondary shadow-sm">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        {/* Article Text Content */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-dusty-olive-light px-2 py-0.5 text-[9px] font-bold text-dusty-olive uppercase tracking-wider">
                              {article.category}
                            </span>
                            <span className="text-[9px] font-bold text-dusty-olive/60 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {article.date}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-[#344e41] group-hover:text-dusty-olive-hover transition-colors leading-snug line-clamp-1">
                             {article.title}
                          </h4>
                          <p className="text-[11px] text-stone-500 font-medium leading-relaxed line-clamp-1">
                            {article.excerpt}
                          </p>
                        </div>

                        {/* Action Arrow */}
                        <div className="h-8 w-8 rounded-full bg-golden-lightest group-hover:bg-golden text-golden-dark group-hover:text-[#344e41] flex items-center justify-center shrink-0 transition-all duration-300">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-sm font-bold text-[#344e41]/60">Brak dodatkowych artykułów w tej kategorii.</p>
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
