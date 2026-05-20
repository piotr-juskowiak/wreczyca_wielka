"use client"

import { motion } from "framer-motion"
import { Compass, MapPin, ArrowUpRight } from "lucide-react"
import Link from "next/link"

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
  },
  {
    id: "sn-4",
    solectwo: "Węglowice",
    title: "Sukces lokalnego koła gospodyń wiejskich",
    date: "14 maja 2026",
    excerpt: "Nasze gospodynie zdobyły pierwsze miejsce w wojewódzkim konkursie kulinarnym.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "sn-5",
    solectwo: "Kalej",
    title: "Nowa nawierzchnia boiska sportowego",
    date: "12 maja 2026",
    excerpt: "Zakończono prace nad nową murawą, która posłuży lokalnej drużynie młodzieżowej.",
    image: "https://images.unsplash.com/photo-1518605368461-1e1e1fd25b37?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "sn-6",
    solectwo: "Bieżeń",
    title: "Akcja sprzątania lasów i ścieżek rowerowych",
    date: "10 maja 2026",
    excerpt: "Kolejna udana edycja akcji ekologicznej, w której wzięło udział ponad 100 mieszkańców.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop"
  }
]

export function GalleryCarousel() {
  return (
    <section
      id="przewodnik"
      aria-labelledby="guide-title"
      className="relative overflow-hidden bg-stone-50 py-20 lg:py-24 text-slate-900 border-y border-stone-200 select-none"
    >
      <div className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Editorial Style */}
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00933f]/10 border border-[#00933f]/20 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#00933f] mb-4">
            <Compass className="h-3.5 w-3.5 text-[#00933f]" />
            Odkryj naszą gminę
          </span>
          
          <h2 id="guide-title" className="text-3xl md:text-5xl font-light text-slate-900 leading-tight tracking-tight">
            Sołectwa Gminy <span className="font-semibold text-[#00933f] block sm:inline">Wręczyca Wielka</span>
          </h2>
          
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
            Poznaj 28 wyjątkowych miejscowości tworzących naszą gminną społeczność. Wybierz sołectwo z listy po lewej, aby zobaczyć aktualności, alerty i lokalne inicjatywy mieszkańców.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          
          {/* LEFT: Sołectwa List (30%) */}
          <div className="w-full lg:w-[30%] shrink-0 flex flex-col">
            <div className="mb-6 flex items-center justify-between border-b border-stone-200 pb-4 shrink-0">
              <h3 className="text-lg font-bold text-slate-900 tracking-wide">Wybierz sołectwo</h3>
              <span className="text-xs font-medium text-slate-500 bg-white border border-stone-200 px-2 py-1 rounded-md">28 miejscowości</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 flex-1 auto-rows-[1fr]">
              {SOLECTWA.map((sol) => (
                <motion.a
                  key={sol}
                  href={`/solectwa?wybrane=${encodeURIComponent(sol)}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 hover:border-[#00933f]/40 hover:shadow-sm text-slate-600 hover:text-[#00933f] transition-all duration-300 cursor-pointer h-full"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="h-3.5 w-3.5 text-stone-300 group-hover:text-[#00933f] shrink-0 transition-colors" />
                    <span className="text-xs font-medium truncate">
                      {sol}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT: News Grid (70%) */}
          <div className="w-full lg:w-[70%]">
            <div className="mb-6 flex items-center justify-between border-b border-stone-200 pb-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-wide">Najnowsze z sołectw</h3>
              <Link href="/solectwa" className="text-xs font-medium text-[#00933f] hover:text-[#006e2e] transition-colors flex items-center gap-1 group">
                Wszystkie wieści <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {SOLECTWA_NEWS.map((news) => (
                <motion.a
                  key={news.id}
                  href={`/aktualnosci/solectwa/${news.id}`}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-stone-200 hover:border-[#00933f]/30 transition-all duration-300 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,147,63,0.10)] h-full"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 shrink-0 relative">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover transition-[transform,filter] duration-700 group-hover:scale-[1.03] group-hover:brightness-105"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center rounded-lg bg-white/90 backdrop-blur-md px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#006e2e] shadow-sm border border-white/25">
                        <MapPin className="mr-1.5 h-3 w-3" />
                        {news.solectwo}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <time className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
                      {news.date}
                    </time>
                    <h4 className="text-[15px] font-bold text-slate-900 leading-snug mb-2 group-hover:text-[#006e2e] transition-colors line-clamp-2">
                      {news.title}
                    </h4>
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-3 mt-auto">
                      {news.excerpt}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
