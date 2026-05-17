"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Sparkles,
  ArrowRight,
  MapPin,
  Lightbulb,
  Clock,
  Bike,
  Leaf,
  Landmark,
  BookOpen,
  Calendar,
  Route,
} from "lucide-react"

const GUIDE_ITEMS = [
  {
    id: "guide-1",
    title: "Skąd pochodzi nazwa Wręczyca?",
    category: "Ciekawostka",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    description:
      "Nazwa Wręczyca pochodzi od słowa „wręczać" lub „wręcz" – co w staropolszczyźnie wiąże się z dawnym przywilejem bartników przekazujących dary. Pierwsze wzmianki o osadzie sięgają XVI wieku!",
    actionText: "Poznaj historię",
    href: "/kultura-i-rozrywka",
    icon: BookOpen,
    tips: [
      { icon: Calendar, label: "Pierwsza wzmianka", value: "XVI wiek" },
      { icon: MapPin, label: "Lokalizacja", value: "Powiat kłobucki" },
      { icon: Lightbulb, label: "Ciekawostka", value: "Tradycja bartnicza" },
    ],
  },
  {
    id: "guide-2",
    title: "Rezerwat Przyrody „Zamczysko"",
    category: "Przewodnik",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",
    description:
      "Leśny klejnot gminy! Rezerwat chroni naturalne lasy mieszane o charakterze pierwotnym, z pomnikowymi dębami i bukami. Idealne miejsce na wyciszenie i spacer na łonie natury.",
    actionText: "Zobacz mapę",
    href: "/galeria",
    icon: Leaf,
    tips: [
      { icon: Route, label: "Długość trasy", value: "ok. 4,5 km" },
      { icon: Clock, label: "Czas zwiedzania", value: "1,5 – 2 godz." },
      { icon: Lightbulb, label: "Najlepsza pora", value: "Wiosna i jesień" },
    ],
  },
  {
    id: "guide-3",
    title: "Słynne Szlaki Rowerowe",
    category: "Przewodnik",
    image: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&w=1200&q=80",
    description:
      "Gmina oferuje ponad 150 km utwardzonych i oznakowanych szlaków rowerowych. Najpiękniejszy z nich prowadzi przez malownicze doliny rzeczne i torfowiska Kalei, Kulej oraz Węglowic.",
    actionText: "Trasy rowerowe",
    href: "/sport",
    icon: Bike,
    tips: [
      { icon: Route, label: "Łącznie tras", value: "150+ km" },
      { icon: MapPin, label: "Główne sołectwa", value: "Kalej, Kuleje" },
      { icon: Clock, label: "Trudność", value: "Łatwa – średnia" },
    ],
  },
  {
    id: "guide-4",
    title: "Zabytkowy Kościół w Truskolasach",
    category: "Zabytki",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&q=80",
    description:
      "Drewniany kościół św. Mikołaja z XVIII wieku to perła architektury drewnianej w regionie. Kryje w sobie cudowny, słynący łaskami obraz Matki Boskiej Truskolaskiej.",
    actionText: "Odkryj zabytki",
    href: "/kultura-i-rozrywka",
    icon: Landmark,
    tips: [
      { icon: Calendar, label: "Powstanie", value: "XVIII wiek" },
      { icon: MapPin, label: "Miejsce", value: "Truskolasy" },
      { icon: Lightbulb, label: "Skarb", value: "Obraz MB Truskolaskiej" },
    ],
  },
  {
    id: "guide-5",
    title: "Wręczyca Liderem Ekologii i OZE",
    category: "Poradnik",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    description:
      "Ponad 40% gospodarstw domowych w naszej gminie korzysta z odnawialnych źródeł energii dzięki unijnym programom wsparcia i dofinansowaniom do paneli fotowoltaicznych i pomp ciepła.",
    actionText: "Programy dotacji",
    href: "/ogloszenia",
    icon: Leaf,
    tips: [
      { icon: Sparkles, label: "Pokrycie OZE", value: "ponad 40% gosp." },
      { icon: Lightbulb, label: "Dotacje", value: "Programy unijne" },
      { icon: MapPin, label: "Wsparcie", value: "Cała gmina" },
    ],
  },
  {
    id: "guide-6",
    title: "Centrum Kultury we Wręczycy",
    category: "Poradnik",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    description:
      "Gminny Ośrodek Kultury to serce społecznej integracji. Organizuje rocznie kilkadziesiąt koncertów, spektakli oraz sekcji artystycznych, w których rozwija pasje ponad 300 młodych mieszkańców.",
    actionText: "Kalendarz imprez",
    href: "/kultura-i-rozrywka",
    icon: BookOpen,
    tips: [
      { icon: Sparkles, label: "Rocznie wydarzeń", value: "60+" },
      { icon: Lightbulb, label: "Sekcje", value: "Muzyka, teatr, taniec" },
      { icon: MapPin, label: "Uczestnicy", value: "300+ osób" },
    ],
  },
]

const getCategoryStyle = (category: string) => {
  switch (category) {
    case "Ciekawostka":
      return "bg-municipal-gold-light text-municipal-gold border-municipal-gold/30"
    case "Zabytki":
      return "bg-vibrant-emerald-light text-white border-vibrant-emerald-solid/40"
    case "Przewodnik":
    case "Poradnik":
    default:
      return "bg-digital-blue-light text-digital-blue border-digital-blue/25"
  }
}

export function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const total = GUIDE_ITEMS.length
  const active = GUIDE_ITEMS[currentIndex]
  const Icon = active.icon

  const next = useCallback(() => setCurrentIndex((p) => (p + 1) % total), [total])
  const prev = useCallback(() => setCurrentIndex((p) => (p - 1 + total) % total), [total])

  useEffect(() => {
    if (isHovered) return
    const t = setInterval(next, 6500)
    return () => clearInterval(t)
  }, [next, isHovered])

  return (
    <section
      id="przewodnik"
      aria-labelledby="guide-title"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden bg-gradient-to-br from-[#0f1c2e] via-[#162539] to-[#0a1422] py-20 lg:py-24 text-white border-y border-slate-800/40 select-none"
    >
      {/* Ambient glows */}
      <div className="absolute -left-64 -top-64 h-96 w-96 rounded-full bg-digital-blue/15 blur-3xl pointer-events-none" />
      <div className="absolute -right-64 -bottom-64 h-96 w-96 rounded-full bg-municipal-gold/8 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 text-municipal-gold px-4 py-1.5 text-[10px] font-black uppercase tracking-widest mb-4 border border-white/10 backdrop-blur-md">
              <Compass className="h-3.5 w-3.5 text-municipal-gold" />
              Odkryj naszą gminę
            </span>
            <h2 id="guide-title" className="text-4xl md:text-5xl font-light text-white text-balance leading-tight tracking-tight">
              Przewodnik i Ciekawostki
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/65 font-medium leading-relaxed">
              Poznaj bogatą historię, unikalne rezerwaty przyrody, ścieżki rowerowe oraz codzienne ekologiczne inicjatywy mieszkańców Wręczycy Wielkiej.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white/80">
              <span className="text-municipal-gold">{String(currentIndex + 1).padStart(2, "0")}</span>
              <span className="text-white/30">/</span>
              <span>{String(total).padStart(2, "0")}</span>
            </span>
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-municipal-gold hover:text-[#0f1c2e] hover:border-municipal-gold transition-all cursor-pointer group"
              aria-label="Poprzedni przewodnik"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-municipal-gold hover:text-[#0f1c2e] hover:border-municipal-gold transition-all cursor-pointer group"
              aria-label="Następny przewodnik"
            >
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* MAIN GUIDE LAYOUT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
          >

            {/* LEFT — hero card with image + summary */}
            <div className="lg:col-span-7 relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group min-h-[480px] lg:min-h-[520px] bg-[#0a1422]">
              <motion.img
                src={active.image}
                alt={active.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1.02 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f1c2e]/40 via-transparent to-transparent" />

              {/* Top tags */}
              <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between gap-3">
                <div className={`inline-flex items-center gap-2 backdrop-blur-md text-[9px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border ${getCategoryStyle(active.category)}`}>
                  <Icon className="h-3 w-3" />
                  <span>{active.category}</span>
                </div>
                <div className="h-9 w-9 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5 text-municipal-gold" />
                </div>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 inset-x-0 z-10 p-6 sm:p-8 lg:p-10">
                <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-light text-white leading-[1.15] tracking-tight mb-3 text-balance">
                  {active.title}
                </h3>
                <p className="text-sm sm:text-[15px] text-white/80 leading-relaxed font-medium max-w-2xl line-clamp-3">
                  {active.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={active.href}
                    className="group/btn inline-flex items-center gap-3 rounded-full bg-municipal-gold pl-5 pr-1.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#0f1c2e] hover:bg-white transition-all duration-300 shadow-lg shadow-municipal-gold/20"
                  >
                    <span>{active.actionText}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0f1c2e]/10 group-hover/btn:bg-[#0f1c2e]/20 transition-all">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </a>
                  <a
                    href="/galeria"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/85 hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all"
                  >
                    <MapPin className="h-3 w-3 text-municipal-gold" />
                    <span>Galeria</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT — tips list & quick navigation */}
            <div className="lg:col-span-5 flex flex-col gap-5">

              {/* Quick facts / tips card */}
              <div className="rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 p-6 lg:p-7 shadow-lg">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-municipal-gold text-[#0f1c2e] shadow-md shadow-municipal-gold/20">
                    <Lightbulb className="h-4.5 w-4.5" strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-municipal-gold">
                      W skrócie
                    </div>
                    <div className="text-xs font-bold text-white/70 uppercase tracking-wider">
                      Najważniejsze informacje
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {active.tips.map((tip, i) => {
                    const TipIcon = tip.icon
                    return (
                      <motion.li
                        key={`${active.id}-tip-${i}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                        className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-municipal-gold/25 transition-all duration-300"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-digital-blue/15 text-digital-blue border border-digital-blue/20">
                          <TipIcon className="h-4 w-4" strokeWidth={2.2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-0.5">
                            {tip.label}
                          </div>
                          <div className="text-sm font-semibold text-white truncate">
                            {tip.value}
                          </div>
                        </div>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>

              {/* Mini guide list / pagination chips */}
              <div className="rounded-[2rem] bg-white/[0.03] border border-white/10 p-5 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/70">
                    Wszystkie tematy
                  </div>
                  <div className="text-[10px] font-bold text-white/40">
                    Kliknij, aby zmienić
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {GUIDE_ITEMS.map((g, idx) => {
                    const isActive = idx === currentIndex
                    const GIcon = g.icon
                    return (
                      <button
                        key={g.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-left transition-all duration-300 ${
                          isActive
                            ? "bg-municipal-gold/15 border-municipal-gold/40 shadow-sm"
                            : "bg-transparent border-white/[0.06] hover:bg-white/[0.05] hover:border-white/15"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                            isActive
                              ? "bg-municipal-gold text-[#0f1c2e]"
                              : "bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white"
                          }`}
                        >
                          <GIcon className="h-3.5 w-3.5" />
                        </span>
                        <span
                          className={`text-xs font-semibold flex-1 truncate ${
                            isActive ? "text-white" : "text-white/65 group-hover:text-white"
                          }`}
                        >
                          {g.title}
                        </span>
                        <span
                          className={`text-[9px] font-black uppercase tracking-wider shrink-0 ${
                            isActive ? "text-municipal-gold" : "text-white/30"
                          }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {GUIDE_ITEMS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="relative p-1.5 focus:outline-none cursor-pointer group"
              aria-label={`Przejdź do tematu ${index + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-municipal-gold w-8 h-1.5"
                    : "bg-white/20 group-hover:bg-white/40 w-1.5 h-1.5"
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
