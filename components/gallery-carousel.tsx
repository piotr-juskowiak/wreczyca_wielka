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

export function GalleryCarousel() {
  return (
    <section
      id="przewodnik"
      aria-labelledby="guide-title"
      className="relative overflow-hidden bg-gradient-to-br from-[#1c2e20] via-[#121f15] to-[#0a120c] py-20 lg:py-24 text-white border-y border-stone-900/60 select-none"
    >
      {/* Background Image under Dark Cinematic Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none">
        <img 
          src="https://d-art.ppstatic.pl/kadry/k/r/a0/b9/5a9e7fddb86d4_o_xlarge.jpg" 
          alt="Gmina Wręczyca Wielka" 
          className="h-full w-full object-cover object-center grayscale contrast-125 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c2e20]/95 via-[#121f15]/90 to-[#0a120c]/98" />
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
