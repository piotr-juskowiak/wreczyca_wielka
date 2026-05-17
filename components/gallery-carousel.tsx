"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Image as ImageIcon, ZoomIn } from "lucide-react"

// Rich mock data representing Polish municipal landscape / activities
const GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Zielone Płuca Wręczycy",
    category: "Natura",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
    description: "Malownicze, gęste lasy otaczające naszą gminę oferują setki kilometrów urokliwych tras rowerowych i spacerowych."
  },
  {
    id: "gal-2",
    title: "Centrum Rekreacyjne",
    category: "Inwestycje",
    image: "https://images.unsplash.com/photo-1570129476815-ba368ac77013?auto=format&fit=crop&w=1000&q=80",
    description: "Zrewitalizowany rynek i park miejski tętnią życiem o każdej porze roku, stanowiąc serce lokalnej społeczności."
  },
  {
    id: "gal-3",
    title: "Nowoczesne Centrum Oświaty",
    category: "Edukacja",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80",
    description: "Inwestujemy w przyszłość dzieci, tworząc nowoczesne, ekologiczne i bezpieczne placówki edukacyjne wraz z boiskami."
  },
  {
    id: "gal-4",
    title: "Gminny Dzień Zdrowia",
    category: "Społeczność",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    description: "Druga edycja profilaktycznych badań medycznych spotkała się z ogromnym zainteresowaniem mieszkańców gminy."
  },
  {
    id: "gal-5",
    title: "Aktywny Tryb Życia",
    category: "Sport i Rekreacja",
    image: "https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&w=1000&q=80",
    description: "Nowe ścieżki rekreacyjne, korty oraz siłownie zewnętrzne zachęcają mieszkańców w każdym wieku do ruchu na świeżym powietrzu."
  },
  {
    id: "gal-6",
    title: "Święto Plonów i Dożynki",
    category: "Kultura i Tradycja",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80",
    description: "Barwny korowód i coroczny festiwal dożynkowy są wspaniałym wyrazem wdzięczności za trud lokalnych rolników."
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

  // Track active slide index
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

  // Autoplay functionality with hover pause
  useEffect(() => {
    if (!emblaApi || isHovered) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 3800)

    return () => clearInterval(interval)
  }, [emblaApi, isHovered])

  return (
    <section
      id="galeria"
      aria-labelledby="gallery-title"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden bg-gradient-to-br from-[#1a3520] via-[#244b30] to-[#122416] py-24 text-white border-y border-[#3a5a40]/30 select-none"
    >
      {/* Decorative ambient elements */}
      <div className="absolute -left-64 -top-64 h-96 w-96 rounded-full bg-[#588157]/15 blur-3xl pointer-events-none" />
      <div className="absolute -right-64 -bottom-64 h-96 w-96 rounded-full bg-[#a3b18a]/10 blur-3xl pointer-events-none" />
      
      {/* Background vector leaf ornament effect (created with CSS gradient) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none select-none bg-[radial-gradient(#dad7cd_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 text-[#a3b18a] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest mb-4 border border-white/10 backdrop-blur-md">
              <ImageIcon className="h-3.5 w-3.5" />
              Galeria Zdjęć
            </span>
            <h2 id="gallery-title" className="text-4xl md:text-5xl font-light text-white text-balance leading-tight tracking-tight">
              Życie w naszej gminie
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/60 font-medium">
              Obrazy i chwile uchwycone w obiektywie. Zobacz jak piękna i aktywna jest Wręczyca Wielka.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-sm text-white hover:bg-[#a3b18a] hover:text-[#1a3520] hover:border-[#a3b18a] transition-all cursor-pointer group"
              aria-label="Poprzednie zdjęcie"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={scrollNext}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-sm text-white hover:bg-[#a3b18a] hover:text-[#1a3520] hover:border-[#a3b18a] transition-all cursor-pointer group"
              aria-label="Następne zdjęcie"
            >
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <div className="flex -ml-6">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="pl-6 min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="h-[380px] w-full relative rounded-3xl overflow-hidden group border border-white/10 shadow-sm hover:shadow-xl hover:border-[#a3b18a]/50 transition-all duration-500 bg-[#0d1c12]">
                  
                  {/* Gallery Photo */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out z-0"
                  />

                  {/* Gradient Fade Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300 z-10 pointer-events-none" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 z-20 bg-white/10 border border-white/20 backdrop-blur-md text-[#dad7cd] text-[8px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full pointer-events-none">
                    {item.category}
                  </div>

                  {/* Zoom indicator icon top right */}
                  <div className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ZoomIn className="h-3.5 w-3.5" />
                  </div>

                  {/* Bottom Text Panel */}
                  <div className="absolute bottom-0 inset-x-0 p-6 z-20 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                    <h3 className="text-xl font-light text-white leading-tight mb-2 group-hover:text-[#a3b18a] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#dad7cd]/80 font-medium leading-relaxed line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Dots Pagination */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {GALLERY_ITEMS.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              className="relative p-1.5 focus:outline-none cursor-pointer group"
              aria-label={`Przejdź do slajdu ${index + 1}`}
            >
              <span className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-[#a3b18a] scale-125" 
                  : "bg-white/20 group-hover:bg-white/40"
              }`} />
              
              {index === currentIndex && (
                <motion.span
                  layoutId="activeGalleryDot"
                  className="absolute inset-0 border border-[#a3b18a] rounded-full scale-125"
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
