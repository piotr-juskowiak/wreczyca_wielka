"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Megaphone, MessageSquare, CloudSun, Sun, CloudRain, Cloud, ArrowRight, Calendar, Clock, Quote } from "lucide-react"

const ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "Nowy harmonogram odbioru odpadów",
    excerpt: "Sprawdź zaktualizowany harmonogram odbioru odpadów komunalnych na nadchodzący kwartał dla wszystkich sołectw gminy.",
    date: "17 maja 2026",
    category: "Ogólne",
  },
  {
    id: "ann-2",
    title: "Prace konserwacyjne sieci wodociągowej",
    excerpt: "W dniach 20-22 maja w godzinach 8:00 - 14:00 nastąpią planowane przerwy w dostawie wody w sołectwach Wręczyca Wielka i Grodzisko.",
    date: "15 maja 2026",
    category: "Techniczne",
  },
  {
    id: "ann-3",
    title: "Budżet Obywatelski 2027 — zgłoś projekt",
    excerpt: "Rozpoczął się nabór wniosków do nowej edycji budżetu obywatelskiego. Zgłoś swój pomysł na rozwój naszej wspólnej przestrzeni.",
    date: "12 maja 2026",
    category: "Inicjatywy",
  },
]

const DEFAULT_COMMENTS = [
  {
    id: "com-1",
    author: "Marta K.",
    avatarBg: "bg-white text-digital-blue",
    initials: "MK",
    comment: "Bardzo się cieszę z planów modernizacji boiska szkolnego! Nasze dzieci w końcu będą miały świetne warunki do gry w piłkę.",
    source: "Wypowiedź pod: Inwestycje w oświatę",
    time: "2 godz. temu",
    timestamp: Date.now() - 7200000,
  },
  {
    id: "com-2",
    author: "Tomasz W.",
    avatarBg: "bg-white text-municipal-gold",
    initials: "TW",
    comment: "Czy są już znane szczegóły na temat dofinansowania wymiany starych pieców na ten rok? Chętnie skorzystam z programu.",
    source: "Wypowiedź pod: Czyste powietrze",
    time: "5 godz. temu",
    timestamp: Date.now() - 18000000,
  },
  {
    id: "com-3",
    author: "Ewa i Piotr",
    avatarBg: "bg-white text-vibrant-emerald-solid",
    initials: "EP",
    comment: "Koncert orkiestry dętej na rynku był po prostu wspaniały! Oby więcej takich kulturalnych wydarzeń plenerowych w te wakacje.",
    source: "Wypowiedź pod: Majowy festiwal",
    time: "1 dzień temu",
    timestamp: Date.now() - 86400000,
  },
]

const WEATHER_FORECAST = [
  { day: "Poniedziałek", tempDay: 19, tempNight: 10, icon: Sun, desc: "Słonecznie", color: "text-[#a3b18a]" },
  { day: "Wtorek", tempDay: 21, tempNight: 12, icon: Sun, desc: "Słonecznie", color: "text-[#a3b18a]" },
  { day: "Środa", tempDay: 22, tempNight: 13, icon: CloudSun, desc: "Umiarkowane zachmurzenie", color: "text-sky-500" },
  { day: "Czwartek", tempDay: 17, tempNight: 11, icon: CloudRain, desc: "Przelotny deszcz", color: "text-blue-400" },
  { day: "Piątek", tempDay: 16, tempNight: 9, icon: Cloud, desc: "Zachmurzenie całkowite", color: "text-stone-400" },
  { day: "Sobota", tempDay: 18, tempNight: 10, icon: CloudSun, desc: "Częściowe zachmurzenie", color: "text-sky-500" },
  { day: "Niedziela", tempDay: 20, tempNight: 11, icon: Sun, desc: "Słonecznie", color: "text-[#a3b18a]" },
]

export function NewsSidebar() {
  const [comments, setComments] = useState<any[]>([])

  const loadLatestComments = () => {
    try {
      const stored = localStorage.getItem("wreczyca_comments")
      let allComments = []
      if (stored) {
        allComments = JSON.parse(stored)
      } else {
        localStorage.setItem("wreczyca_comments", JSON.stringify(DEFAULT_COMMENTS))
        allComments = DEFAULT_COMMENTS
      }
      const sorted = allComments.sort((a: any, b: any) => b.timestamp - a.timestamp).slice(0, 3)
      setComments(sorted)
    } catch (e) {
      console.error("Failed to load latest comments in sidebar:", e)
      setComments(DEFAULT_COMMENTS.slice(0, 3))
    }
  }

  useEffect(() => {
    loadLatestComments()
    window.addEventListener("commentsUpdated", loadLatestComments)
    return () => window.removeEventListener("commentsUpdated", loadLatestComments)
  }, [])

  return (
    <aside className="w-full lg:w-[380px] shrink-0 space-y-8 select-none">

      {/* 1. MUNICIPAL ANNOUNCEMENTS — DELICATE GOLD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#a3b18a]/85 via-[#588157]/80 to-[#3a5a40]/75 backdrop-blur-2xl p-6 shadow-xl shadow-[#a3b18a]/10 border border-[#a3b18a]/30"
      >
        {/* Ambient pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-municipal-gold shadow-lg">
              <Megaphone className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white">
                Ogłoszenia Urzędu Gminy
              </h3>
              <span className="text-[10px] text-white/85 font-bold uppercase tracking-wider">
                Biuletyn informacyjny
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {ANNOUNCEMENTS.map((ann) => (
              <div
                key={ann.id}
                className="group cursor-pointer rounded-2xl bg-white/90 hover:bg-white border border-white/30 hover:shadow-lg p-4 transition-all duration-300 backdrop-blur-md"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[9px] font-black uppercase tracking-wider text-white bg-municipal-gold px-2.5 py-0.5 rounded-full">
                    {ann.category}
                  </span>
                  <span className="text-[9px] font-bold text-[#344e41]/60 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {ann.date}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[#344e41] group-hover:text-municipal-gold transition-colors duration-200 line-clamp-1 leading-snug">
                  {ann.title}
                </h4>
                <p className="mt-1 text-xs text-[#344e41]/80 font-medium line-clamp-2 leading-relaxed">
                  {ann.excerpt}
                </p>
              </div>
            ))}
          </div>

          <a
            href="/ogloszenia"
            className="group mt-6 flex items-center justify-center gap-2 rounded-2xl bg-[#344e41]/90 backdrop-blur-sm py-3 text-[10px] font-black uppercase tracking-wider text-white hover:bg-[#344e41] transition-all duration-300 shadow-lg"
          >
            <span>Wszystkie ogłoszenia</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.div>

      {/* 2. LATEST COMMENTS — DELICATE GOLD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#a3b18a]/85 via-[#588157]/80 to-[#3a5a40]/75 backdrop-blur-2xl p-6 shadow-xl shadow-[#a3b18a]/10 border border-[#a3b18a]/30"
      >
        {/* Ambient pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-municipal-gold shadow-lg">
              <MessageSquare className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white">
                Głos Mieszkańców
              </h3>
              <span className="text-[10px] text-white/85 font-bold uppercase tracking-wider">
                Najnowsze opinie
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {comments.map((com) => (
              <div
                key={com.id}
                className="relative rounded-2xl bg-white/90 hover:bg-white backdrop-blur-md p-4 border border-white/30 hover:shadow-lg transition-all duration-300"
              >
                <Quote className="absolute top-3 right-3 h-5 w-5 text-municipal-gold/30" />
                <div className="flex gap-3">
                  <div
                    className={`h-9 w-9 rounded-full shrink-0 flex items-center justify-center font-bold text-xs shadow-sm ${com.avatarBg}`}
                  >
                    {com.initials}
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#344e41] truncate">
                        {com.author}
                      </span>
                      <span className="text-[9px] font-bold text-[#344e41]/60 flex items-center gap-0.5 shrink-0">
                        <Clock className="h-2.5 w-2.5" /> {com.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#344e41]/80 font-medium italic leading-relaxed line-clamp-3">
                      &quot;{com.comment}&quot;
                    </p>
                    <div className="text-[9px] font-black uppercase tracking-wider text-municipal-gold pt-0.5 truncate">
                      {com.source}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="/glos-mieszkancow"
            className="group mt-6 flex items-center justify-center gap-2 rounded-2xl bg-[#344e41]/90 backdrop-blur-sm py-3 text-[10px] font-black uppercase tracking-wider text-white hover:bg-[#344e41] transition-all duration-300 shadow-lg"
          >
            <span>Dołącz do dyskusji</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.div>

      {/* 3. WEATHER FORECAST */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-digital-blue-light text-digital-blue">
            <CloudSun className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-foreground">
              Pogoda Wręczyca Wielka
            </h3>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
              Prognoza 7-dniowa
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gradient-to-br from-[#588157] to-[#3a5a40] text-white p-5 rounded-2xl mb-6 shadow-md shadow-digital-blue/20">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-municipal-gold animate-pulse">Aktualnie</span>
            <div className="text-4xl font-extralight tracking-tighter">18°C</div>
            <div className="text-[10px] font-bold text-white/80">Słonecznie i ciepło</div>
          </div>
          <div className="text-right space-y-1 text-white/80">
            <Sun className="h-10 w-10 text-amber-300 stroke-[1.5] filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)] inline-block" />
            <div className="text-[9px] font-bold uppercase tracking-widest block">Wilgotność: 62%</div>
            <div className="text-[9px] font-bold uppercase tracking-widest block">Wiatr: 12 km/h</div>
          </div>
        </div>

        <div className="space-y-3.5">
          {WEATHER_FORECAST.map((w, idx) => {
            const Icon = w.icon
            return (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <span className="text-xs font-bold text-foreground w-28 text-left">
                  {w.day}
                </span>

                <div className="flex items-center gap-2 justify-start flex-1 px-2">
                  <Icon className={`h-4.5 w-4.5 ${w.color} shrink-0`} />
                  <span className="text-[10px] font-medium text-muted-foreground hidden sm:inline-block">
                    {w.desc}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <span className="text-xs font-bold text-foreground">{w.tempDay}°</span>
                  <span className="text-xs text-muted-foreground font-medium">{w.tempNight}°</span>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

    </aside>
  )
}
