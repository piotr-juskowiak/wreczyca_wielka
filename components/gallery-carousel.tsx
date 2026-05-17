"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, BookOpen, Compass, Sparkles, ArrowRight } from "lucide-react"

// Premium curated guides and curiosities about Gmina Wręczyca Wielka
const GUIDE_ITEMS = [
  {
    id: "guide-1",
    title: "Skąd pochodzi nazwa Wręczyca?",
    category: "Ciekawostka",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
    description: "Nazwa Wręczyca pochodzi od słowa 'wręczać' lub 'wręcz' – co w staropolszczyźnie wiąże się z dawnym przywilejem bartników przekazujących dary. Pierwsze wzmianki o osadzie sięgają XVI wieku!",
    actionText: "Poznaj historię",
    href: "/kultura-i-rozrywka"
  },
  {
    id: "guide-2",
    title: "Rezerwat Przyrody 'Zamczysko'",
    category: "Przewodnik",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=80",
    description: "To leśny klejnot gminy! Rezerwat chroni naturalne lasy mieszane o charakterze pierwotnym, z pomnikowymi dębami i bukami. Idealne miejsce na wyciszenie i spacer na łonie natury.",
    actionText: "Zobacz mapę",
    href: "/galeria"
  },
  {
    id: "guide-3",
    title: "Słynne Szlaki Rowerowe",
    category: "Przewodnik",
    image: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&w=1000&q=80",
    description: "Gmina oferuje ponad 150 km utwardzonych i oznakowanych szlaków rowerowych. Najpiękniejszy z nich prowadzi przez malownicze doliny rzeczne i torfowiska Kalei, Kulej oraz Węglowic.",
    actionText: "Trasy rowerowe",
    href: "/sport"
  },
  {
    id: "guide-4",
    title: "Zabytkowy Kościół w Truskolasach",
    category: "Zabytki",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1000&q=80",
    description: "Drewniany kościół św. Mikołaja z XVIII wieku to perła architektury drewnianej w regionie. Kryje w sobie cudowny, słynący łaskami obraz Matki Boskiej Truskolaskiej.",
    actionText: "Odkryj zabytki",
    href: "/kultura-i-rozrywka"
  },
  {
    id: "guide-5",
    title: "Wręczyca Liderem Ekologii i OZE",
    category: "Poradnik",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80",
    description: "Ponad 40% gospodarstw domowych w naszej gminie korzysta z odnawialnych źródeł energii (OZE) dzięki unijnym programom wsparcia i dofinansowaniom do paneli fotowoltaicznych i pomp ciepła.",
    actionText: "Programy dotacji",
    href: "/ogloszenia"
  },
  {
    id: "guide-6",
    title: "Centrum Kultury we Wręczycy",
    category: "Poradnik",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80",
    description: "Gminny Ośrodek Kultury to serce społecznej integracji. Organizuje rocznie kilkadziesiąt koncertów, spektakli oraz sekcji artystycznych, w których rozwija swoje pasje ponad 300 młodych mieszkańców.",
    actionText: "Kalendarz imprez",
    href: "/kultura-i-rozrywka"
  }
]

export function GalleryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi?.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  // Autoplay with hover pause
  useEffect(() => {
    if (!emblaApi || isHovered) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 4500)

    return () => clearInterval(interval)
  }, [emblaApi, isHovered])

  // Dynamic colors for category tags to enhance layout richness
  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "Ciekawostka":
        return "bg-municipal-gold-light text-municipal-gold border-municipal-gold/30"
      case "Zabytki":
        return "bg-vibrant-emerald-light text-white border-vibrant-emerald-solid/30"
      case "Przewodnik":
      case "Poradnik":
      default:
        return "bg-digital-blue-light text-digital-blue border-digital-blue/20"
    }
  }

  return (
    <section
      id="przewodnik"
      aria-labelledby="guide-title"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden bg-gradient-to-br from-[#0f1c2e] via-[#162539] to-[#0a1422] py-24 text-white border-y border-slate-800/40 select-none"
    >
      {/* Premium ambient light glow effects */}
      <div className="absolute -left-64 -top-64 h-96 w-96 rounded-full bg-digital-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-64 -bottom-64 h-96 w-96 rounded-full bg-municipal-gold/5 blur-3xl pointer-events-none" />
      
      {/* Background elegant dots pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.015] pointer-events-none select-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 text-municipal-gold px-4 py-1.5 text-[10px] font-black uppercase tracking-widest mb-4 border border-white/10 backdrop-blur-md">
              <Compass className="h-3.5 w-3.5 text-municipal-gold" />
              Odkryj naszą gminę
            </span>
            <h2 id="guide-title" className="text-4xl md:text-5xl font-light text-white text-balance leading-tight tracking-tight">
              Przewodnik i Ciekawostki
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/60 font-medium leading-relaxed">
              Poznaj bogatą historię, unikalne rezerwaty przyrody, ścieżki rowerowe oraz codzienne ekologiczne inicjatywy mieszkańców Wręczycy Wielkiej.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-sm text-white hover:bg-digital-blue hover:border-digital-blue transition-all cursor-pointer group"
              aria-label="Poprzedni slajd"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={scrollNext}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-sm text-white hover:bg-digital-blue hover:border-digital-blue transition-all cursor-pointer group"
              aria-label="Następny slajd"
            >
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Sliding Embla Carousel */}
        <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <div className="flex -ml-6">
            {GUIDE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="pl-6 min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="h-[400px] w-full relative rounded-3xl overflow-hidden group border border-white/10 shadow-sm hover:shadow-xl hover:border-digital-blue/45 transition-all duration-500 bg-[#0a1422]">
                  
                  {/* Item Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out z-0"
                  />

                  {/* Gradient bottom panel overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300 z-10 pointer-events-none" />

                  {/* Dynamic Category Badge Tag */}
                  <div className={`absolute top-4 left-4 z-20 border backdrop-blur-md text-[8px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full pointer-events-none ${getBadgeStyle(item.category)}`}>
                    {item.category}
                  </div>

                  {/* Right Sparkle icon for quick information indicator */}
                  <div className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full bg-white/15 border border-white/10 backdrop-blur-md text-white flex items-center justify-center pointer-events-none">
                    <Sparkles className={`h-3.5 w-3.5 ${item.category === "Ciekawostka" ? "text-municipal-gold" : "text-white"}`} />
                  </div>

                  {/* Bottom Text Panel */}
                  <div className="absolute bottom-0 inset-x-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none flex flex-col justify-end min-h-[180px]">
                    <h3 className="text-xl font-light text-white leading-snug mb-2 group-hover:text-municipal-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#cbd5e1]/80 font-medium leading-relaxed line-clamp-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 mb-4">
                      {item.description}
                    </p>
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-municipal-gold group-hover:text-white transition-colors duration-300 pointer-events-auto w-fit"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sliding Dot Pagination */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {GUIDE_ITEMS.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              className="relative p-1.5 focus:outline-none cursor-pointer group"
              aria-label={`Przejdź do slajdu ${index + 1}`}
            >
              <span className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-municipal-gold scale-125" 
                  : "bg-white/20 group-hover:bg-white/40"
              }`} />
              
              {index === currentIndex && (
                <motion.span
                  layoutId="activeGalleryDot"
                  className="absolute inset-0 border border-municipal-gold rounded-full scale-125"
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              )}
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
