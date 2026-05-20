"use client"

import { motion } from "framer-motion"
import { Compass, MapPin, ChevronRight } from "lucide-react"

const SOLECTWA = [
  "Bieżeń", "Bór Zapilski", "Borowe", "Brzezinki", "Czarna Wieś", "Długi Kąt",
  "Golce", "Grodzisko", "Hutka", "Jezioro", "Kalej", "Klepaczka", "Kuleje",
  "Nowa Szarlejka", "Nowiny", "Pierzchno", "Piła Druga", "Piła Pierwsza",
  "Puszczew", "Szarlejka", "Truskolasy I", "Truskolasy II", "Węglowice",
  "Wręczyca Mała", "Wręczyca Wielka I", "Wręczyca Wielka II", "Wydra", "Zamłynie"
]

const SOLECTWA_NEWS = [
  {
    id: "sn-1",
    solectwo: "Truskolasy",
    title: "Nowe oświetlenie LED na głównej ulicy",
    date: "19 maja 2026",
    excerpt: "Zakończono modernizację oświetlenia drogowego, co znacząco poprawi bezpieczeństwo po zmroku.",
    image: "https://images.unsplash.com/photo-1517400508447-f8dd518b86e3?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "sn-2",
    solectwo: "Kuleje",
    title: "Rozbudowa placu zabaw i siłowni plenerowej",
    date: "18 maja 2026",
    excerpt: "Wkrótce ruszą prace nad powiększeniem strefy rekreacyjnej dla dzieci i dorosłych.",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "sn-3",
    solectwo: "Grodzisko",
    title: "Zebranie wiejskie ws. funduszu sołeckiego",
    date: "16 maja 2026",
    excerpt: "Zapraszamy wszystkich mieszkańców na spotkanie dotyczące podziału środków na rok 2027.",
    image: "https://images.unsplash.com/photo-1577416412292-747c6607f055?q=80&w=600&auto=format&fit=crop"
  }
]

export function GalleryCarousel() {
  return (
    <section
      id="przewodnik"
      aria-labelledby="guide-title"
      className="relative overflow-hidden bg-gradient-to-br from-[#1c2e20] via-[#121f15] to-[#0a120c] py-20 lg:py-24 text-white border-y border-stone-900/60 select-none"
    >
      {/* Background Image under Dark Cinematic Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none select-none">
        <img 
          src="https://d-art.ppstatic.pl/kadry/k/r/a0/b9/5a9e7fddb86d4_o_xlarge.jpg" 
          alt="Gmina Wręczyca Wielka" 
          className="h-full w-full object-cover object-center grayscale contrast-100 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c2e20]/85 via-[#121f15]/80 to-[#0a120c]/90" />
      </div>

      {/* Bottom gradient fade & soft blur transition */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0a120c] via-[#0a120c]/45 to-transparent backdrop-blur-[3px] pointer-events-none z-10" />

      {/* Ambient premium glowing blobs */}
      <div className="absolute top-1/4 left-1/3 -translate-y-1/2 w-[40%] aspect-square rounded-full bg-[#588157]/[0.08] blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[35%] aspect-square rounded-full bg-[#a3b18a]/[0.05] blur-[120px] pointer-events-none z-0" />
      
      {/* Subtle background radial dot pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#dad7cd_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header - Editorial Style */}
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] border border-white/10 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#a3b18a] mb-4 backdrop-blur-sm">
            <Compass className="h-3.5 w-3.5 text-[#a3b18a]" />
            Odkryj naszą gminę
          </span>
          
          <h2 id="guide-title" className="text-3xl md:text-5xl font-light text-white leading-tight tracking-tight">
            Sołectwa Gminy <span className="font-normal text-[#a3b18a] block sm:inline">Wręczyca Wielka</span>
          </h2>
          
          <p className="mt-4 text-xs sm:text-sm text-stone-400 font-normal leading-relaxed max-w-xl">
            Poznaj 28 wyjątkowych miejscowości tworzących naszą gminną społeczność. Wybierz sołectwo, aby filtrować wiadomości, alerty i inicjatywy mieszkańców z Twojej okolicy.
          </p>
        </div>

        {/* Latest News from Villages */}
        <div className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {SOLECTWA_NEWS.map((news) => (
            <motion.a
              key={news.id}
              href={`/aktualnosci/solectwa/${news.id}`}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 shadow-lg hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#121f15]">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                />
              </div>
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#a3b18a] border border-white/10 shadow-sm">
                  <MapPin className="mr-1 h-3 w-3" />
                  {news.solectwo}
                </span>
              </div>
              <div className="p-5">
                <time className="block text-[9px] font-semibold uppercase tracking-widest text-white/40 mb-2">
                  {news.date}
                </time>
                <h3 className="text-[14px] font-medium text-white/95 leading-snug mb-2 group-hover:text-[#a3b18a] transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-[11.5px] text-white/50 leading-relaxed line-clamp-2">
                  {news.excerpt}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Interactive Village Grid - Premium Dark Glassmorphism */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
          {SOLECTWA.map((sol) => (
            <motion.a
              key={sol}
              href={`/solectwa?wybrane=${encodeURIComponent(sol)}`}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-[#3a5a40]/90 hover:border-[#a3b18a]/30 text-white/90 hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_30px_rgba(58,90,64,0.25)] cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Custom MapPin Container */}
                <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] group-hover:bg-white/20 text-[#a3b18a] group-hover:text-white transition-all duration-300 shadow-inner">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="text-[11.5px] font-medium truncate leading-none tracking-tight">
                  {sol}
                </span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-white/30 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5" />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
