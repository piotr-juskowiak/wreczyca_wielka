"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Megaphone, MessageSquare, CloudSun, Sun, CloudRain, Cloud, ArrowRight, Calendar, User, Clock } from "lucide-react"

// Mock Data for Ogłoszenia UG
const ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "Nowy harmonogram odbioru odpadów",
    excerpt: "Sprawdź zaktualizowany harmonogram odbioru odpadów komunalnych na nadchodzący kwartał dla wszystkich sołectw gminy.",
    date: "17 maja 2026",
    category: "Ogólne"
  },
  {
    id: "ann-2",
    title: "Prace konserwacyjne sieci wodociągowej",
    excerpt: "W dniach 20-22 maja w godzinach 8:00 - 14:00 nastąpią planowane przerwy w dostawie wody w sołectwach Wręczyca Wielka i Grodzisko.",
    date: "15 maja 2026",
    category: "Techniczne"
  },
  {
    id: "ann-3",
    title: "Budżet Obywatelski 2027 — zgłoś projekt",
    excerpt: "Rozpoczął się nabór wniosków do nowej edycji budżetu obywatelskiego. Zgłoś swój pomysł na rozwój naszej wspólnej przestrzeni.",
    date: "12 maja 2026",
    category: "Inicjatywy"
  }
]

// Mock Data for Najnowsze Komentarze (Default Seed)
const DEFAULT_COMMENTS = [
  {
    id: "com-1",
    author: "Marta K.",
    avatarBg: "bg-[#2e854b]/20 text-[#0f172a]",
    initials: "MK",
    comment: "Bardzo się cieszę z planów modernizacji boiska szkolnego! Nasze dzieci w końcu będą miały świetne warunki do gry w piłkę.",
    source: "Wypowiedź pod: Inwestycje w oświatę",
    time: "2 godz. temu",
    timestamp: Date.now() - 7200000 // 2 hrs ago
  },
  {
    id: "com-2",
    author: "Tomasz W.",
    avatarBg: "bg-[#5cb87e]/20 text-[#2c5e3b]",
    initials: "TW",
    comment: "Czy są już znane szczegóły na temat dofinansowania wymiany starych pieców na ten rok? Chętnie skorzystam z programu.",
    source: "Wypowiedź pod: Czyste powietrze",
    time: "5 godz. temu",
    timestamp: Date.now() - 18000000 // 5 hrs ago
  },
  {
    id: "com-3",
    author: "Ewa i Piotr",
    avatarBg: "bg-[#cbd5e1]/45 text-[#2c5e3b]",
    initials: "EP",
    comment: "Koncert orkiestry dętej na rynku był po prostu wspaniały! Oby więcej takich kulturalnych wydarzeń plenerowych w te wakacje.",
    source: "Wypowiedź pod: Majowy festiwal",
    time: "1 dzień temu",
    timestamp: Date.now() - 86400000 // 1 day ago
  }
]

// Mock Data for Weather Forecast
const WEATHER_FORECAST = [
  { day: "Poniedziałek", tempDay: 19, tempNight: 10, icon: Sun, desc: "Słonecznie", color: "text-amber-500" },
  { day: "Wtorek", tempDay: 21, tempNight: 12, icon: Sun, desc: "Słonecznie", color: "text-amber-500" },
  { day: "Środa", tempDay: 22, tempNight: 13, icon: CloudSun, desc: "Umiarkowane zachmurzenie", color: "text-[#5cb87e]" },
  { day: "Czwartek", tempDay: 17, tempNight: 11, icon: CloudRain, desc: "Przelotny deszcz", color: "text-blue-400" },
  { day: "Piątek", tempDay: 16, tempNight: 9, icon: Cloud, desc: "Zachmurzenie całkowite", color: "text-[#5cb87e]" },
  { day: "Sobota", tempDay: 18, tempNight: 10, icon: CloudSun, desc: "Częściowe zachmurzenie", color: "text-[#5cb87e]" },
  { day: "Niedziela", tempDay: 20, tempNight: 11, icon: Sun, desc: "Słonecznie", color: "text-amber-500" }
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
        // Seed default comments if no database exists yet
        localStorage.setItem("wreczyca_comments", JSON.stringify(DEFAULT_COMMENTS))
        allComments = DEFAULT_COMMENTS
      }

      // Sort by timestamp descending (newest comments first) and take the top 3
      const sorted = allComments
        .sort((a: any, b: any) => b.timestamp - a.timestamp)
        .slice(0, 3)
      setComments(sorted)
    } catch (e) {
      console.error("Failed to load latest comments in sidebar:", e)
      setComments(DEFAULT_COMMENTS.slice(0, 3))
    }
  }

  useEffect(() => {
    loadLatestComments()

    // Listen for real-time comment additions from individual article pages
    window.addEventListener("commentsUpdated", loadLatestComments)
    return () => window.removeEventListener("commentsUpdated", loadLatestComments)
  }, [])

  return (
    <aside className="w-full lg:w-[380px] shrink-0 space-y-8 select-none">
      
      {/* 1. MUNICIPAL ANNOUNCEMENTS WIDGET (OGŁOSZENIA UG) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="rounded-3xl border border-slate-300 bg-gradient-to-br from-white to-slate-50/70 p-6 shadow-md shadow-[#2c5e3b]/5 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2c5e3b]/10 text-[#2c5e3b]">
            <Megaphone className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#0f172a]">
              Ogłoszenia Urzędu Gminy
            </h3>
            <span className="text-[10px] text-[#5cb87e] font-bold uppercase tracking-wider">Biuletyn Informacyjny</span>
          </div>
        </div>

        <div className="space-y-5">
          {ANNOUNCEMENTS.map((ann) => (
            <div
              key={ann.id}
              className="group cursor-pointer border-b border-[#cbd5e1]/30 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[9px] font-black uppercase tracking-wider text-municipal-gold bg-municipal-gold-light px-2.5 py-0.5 rounded-full border border-municipal-gold/30">
                  {ann.category}
                </span>
                <span className="text-[9px] font-bold text-[#2c5e3b]/40 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {ann.date}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-[#0f172a] group-hover:text-[#2e854b] transition-colors duration-200 line-clamp-1 leading-snug">
                {ann.title}
              </h4>
              <p className="mt-1 text-xs text-[#2c5e3b]/60 font-medium line-clamp-2 leading-relaxed">
                {ann.excerpt}
              </p>
            </div>
          ))}
        </div>

        <a
          href="/ogloszenia"
          className="group mt-6 flex items-center justify-center gap-2 rounded-2xl border border-[#cbd5e1]/50 bg-[#f1f5f9]/50 py-3 text-[10px] font-black uppercase tracking-wider text-[#2c5e3b] hover:bg-[#2c5e3b] hover:text-white hover:border-[#2c5e3b] transition-all duration-300"
        >
          <span>Wszystkie ogłoszenia</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </motion.div>

      {/* 2. LATEST COMMENTS WIDGET (KOMENTARZE NAJNOWSZE) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="rounded-3xl border border-slate-300 bg-gradient-to-br from-white to-slate-50/70 p-6 shadow-md shadow-[#2c5e3b]/5 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2c5e3b]/10 text-[#2c5e3b]">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#0f172a]">
              Głos Mieszkańców
            </h3>
            <span className="text-[10px] text-[#5cb87e] font-bold uppercase tracking-wider">Najnowsze opinie</span>
          </div>
        </div>

        <div className="space-y-4">
          {comments.map((com) => (
            <div
              key={com.id}
              className="flex gap-3 bg-[#f1f5f9]/30 hover:bg-[#f1f5f9]/60 p-3.5 rounded-2xl border border-[#cbd5e1]/20 transition-all duration-200"
            >
              <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center font-bold text-xs ${com.avatarBg}`}>
                {com.initials}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#0f172a]">{com.author}</span>
                  <span className="text-[9px] font-bold text-[#2c5e3b]/30 flex items-center gap-0.5">
                    <Clock className="h-2.5 w-2.5" /> {com.time}
                  </span>
                </div>
                <p className="text-[11px] text-[#2c5e3b]/70 font-medium italic leading-relaxed line-clamp-3">
                  "{com.comment}"
                </p>
                <div className="text-[9px] font-black uppercase tracking-wider text-municipal-gold pt-0.5 truncate max-w-[240px]">
                  {com.source}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. WEATHER FORECAST WIDGET (DŁUŻSZA PROGNOZA POGODY) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="rounded-3xl border border-slate-300 bg-gradient-to-br from-white to-slate-50/70 p-6 shadow-md shadow-[#2c5e3b]/5 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2c5e3b]/10 text-[#2c5e3b]">
            <CloudSun className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#0f172a]">
              Pogoda Wręczyca Wielka
            </h3>
            <span className="text-[10px] text-[#5cb87e] font-bold uppercase tracking-wider">Prognoza 7-dniowa</span>
          </div>
        </div>

        {/* Current weather summary */}
        <div className="flex items-center justify-between bg-gradient-to-br from-[#2c5e3b] to-[#2e854b] text-white p-5 rounded-2xl mb-6 shadow-sm shadow-[#2c5e3b]/25">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-municipal-gold animate-pulse">Aktualnie</span>
            <div className="text-4xl font-extralight tracking-tighter">18°C</div>
            <div className="text-[10px] font-bold text-[#cbd5e1]">Słonecznie i ciepło</div>
          </div>
          <div className="text-right space-y-1 text-[#cbd5e1]">
            <Sun className="h-10 w-10 text-amber-400 stroke-[1.5] filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)] inline-block" />
            <div className="text-[9px] font-bold uppercase tracking-widest block">Wilgotność: 62%</div>
            <div className="text-[9px] font-bold uppercase tracking-widest block">Wiatr: 12 km/h</div>
          </div>
        </div>

        {/* 5-day detailed rows */}
        <div className="space-y-3.5">
          {WEATHER_FORECAST.map((w, idx) => {
            const Icon = w.icon
            return (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-[#cbd5e1]/20 pb-3 last:border-0 last:pb-0"
              >
                {/* Day name */}
                <span className="text-xs font-bold text-[#0f172a] w-28 text-left">
                  {w.day}
                </span>

                {/* Weather status */}
                <div className="flex items-center gap-2 justify-start flex-1 px-2">
                  <Icon className={`h-4.5 w-4.5 ${w.color} shrink-0`} />
                  <span className="text-[10px] font-medium text-[#2c5e3b]/60 hidden sm:inline-block">
                    {w.desc}
                  </span>
                </div>

                {/* Temperatures */}
                <div className="flex items-center gap-3 text-right">
                  <span className="text-xs font-bold text-[#0f172a]">{w.tempDay}°</span>
                  <span className="text-xs text-[#2c5e3b]/40 font-medium">{w.tempNight}°</span>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

    </aside>
  )
}
