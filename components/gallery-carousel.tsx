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
      className="relative overflow-hidden bg-gradient-to-br from-[#365239] via-[#2a402c] to-[#142116] py-20 lg:py-24 text-white border-y border-stone-850/40 select-none"
    >
      {/* Background Image under Dark Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none select-none">
        <img 
          src="https://d-art.ppstatic.pl/kadry/k/r/a0/b9/5a9e7fddb86d4_o_xlarge.jpg" 
          alt="Gmina Wręczyca Wielka" 
          className="h-full w-full object-cover object-center grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#365239]/90 via-[#2a402c]/80 to-[#142116]/95 mix-blend-multiply" />
      </div>

      {/* Bottom gradient fade & soft blur transition */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#142116] via-[#142116]/45 to-transparent backdrop-blur-[3px] pointer-events-none z-10" />

      {/* Ambient glows */}
      <div className="absolute -left-64 -top-64 h-96 w-96 rounded-full bg-dusty-olive/15 blur-3xl pointer-events-none" />
      <div className="absolute -right-64 -bottom-64 h-96 w-96 rounded-full bg-golden/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none bg-[radial-gradient(#dad7cd_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-golden/10 text-golden px-4 py-1.5 text-[10px] font-black uppercase tracking-widest mb-4 border border-golden/25 backdrop-blur-md">
            <Compass className="h-3.5 w-3.5 text-golden" />
            Odkryj naszą gminę
          </span>
          <h2 id="guide-title" className="text-4xl md:text-5xl font-light text-white text-balance leading-tight tracking-tight">
            Sołectwa Gminy Wręczyca Wielka
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/65 font-medium leading-relaxed max-w-xl">
            Poznaj 28 wyjątkowych miejscowości tworzących naszą gminę. Wybierz sołectwo, aby zobaczyć dedykowane wiadomości, alerty oraz lokalne inicjatywy mieszkańców.
          </p>
        </div>

        {/* Interactive Village Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
          {SOLECTWA.map((sol) => (
            <motion.a
              key={sol}
              href={`/solectwa?wybrane=${encodeURIComponent(sol)}`}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-white border border-white/20 hover:bg-[#365239] hover:border-[#365239] text-slate-800 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#365239]/8 group-hover:bg-white/20 text-[#365239] group-hover:text-white transition-colors">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold truncate leading-none">{sol}</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
