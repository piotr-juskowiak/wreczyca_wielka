"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Megaphone, MessageSquare, CloudSun, Sun, CloudRain, Cloud, ArrowRight, Calendar, Clock, Quote, Sparkles, Building2 } from "lucide-react"
import { toast } from "sonner"

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
    avatarBg: "bg-white text-dusty-olive",
    initials: "MK",
    comment: "Bardzo się cieszę z planów modernizacji boiska szkolnego! Nasze dzieci w końcu będą miały świetne warunki do gry w piłkę.",
    source: "Wypowiedź pod: Inwestycje w oświatę",
    time: "2 godz. temu",
    timestamp: Date.now() - 7200000,
  },
  {
    id: "com-2",
    author: "Tomasz W.",
    avatarBg: "bg-white text-toffee-brown",
    initials: "TW",
    comment: "Czy są już znane szczegóły na temat dofinansowania wymiany starych pieców na ten rok? Chętnie skorzystam z programu.",
    source: "Wypowiedź pod: Czyste powietrze",
    time: "5 godz. temu",
    timestamp: Date.now() - 18000000,
  },
  {
    id: "com-3",
    author: "Ewa i Piotr",
    avatarBg: "bg-white text-charcoal-brown-solid",
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
  { day: "Poniedziałek (25.05)", tempDay: 22, tempNight: 12, icon: Sun, desc: "Ciepło i słonecznie", color: "text-[#a3b18a]" },
  { day: "Wtorek (26.05)", tempDay: 23, tempNight: 13, icon: Sun, desc: "Bezchmurnie", color: "text-[#a3b18a]" },
  { day: "Środa (27.05)", tempDay: 20, tempNight: 11, icon: CloudSun, desc: "Lekkie zachmurzenie", color: "text-sky-500" },
  { day: "Czwartek (28.05)", tempDay: 18, tempNight: 10, icon: CloudRain, desc: "Możliwe opady", color: "text-blue-400" },
  { day: "Piątek (29.05)", tempDay: 16, tempNight: 8, icon: Cloud, desc: "Pochmurno", color: "text-stone-400" },
  { day: "Sobota (30.05)", tempDay: 19, tempNight: 9, icon: CloudSun, desc: "Przejaśnienia", color: "text-sky-500" },
  { day: "Niedziela (31.05)", tempDay: 21, tempNight: 11, icon: Sun, desc: "Słonecznie", color: "text-[#a3b18a]" },
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

      {/* 0. PROFESSIONAL ADVERTISING PLACEHOLDER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative overflow-hidden rounded-[2rem] bg-stone-50/50 border border-dashed border-stone-300/80 p-6 flex flex-col items-center justify-center text-center group h-[220px] shadow-sm hover:bg-stone-50 hover:border-stone-400/80 transition-all duration-300"
      >
        {/* Subtle decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Elegant Gray Icon */}
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-stone-200 shadow-sm text-stone-400 mb-3 group-hover:scale-105 transition-transform duration-300">
            <Megaphone className="h-5 w-5 text-stone-400/80" strokeWidth={1.8} />
          </div>

          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">
            Miejsce na Twoją reklamę
          </h3>

          <p className="text-[11px] text-stone-400 font-medium max-w-[240px] leading-normal mb-3.5">
            Dotrzyj do tysięcy mieszkańców gminy Wręczyca Wielka każdego dnia.
          </p>

          <button
            onClick={() => {
              toast.info("Biuro Ogłoszeń i Reklam", {
                description: "Napisz na e-mail: ug@wreczyca-wielka.pl lub zadzwoń pod nr tel. (34) 317 01 10 w celu ustalenia szczegółów.",
                duration: 6000,
                icon: <Megaphone className="h-4 w-4 text-golden-dark" />
              })
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white hover:bg-slate-900 border border-stone-200 hover:border-slate-900 text-stone-600 hover:text-white px-3.5 py-2 text-[9px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer"
          >
            <span>Skontaktuj się</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </motion.div>

      {/* 1. MUNICIPAL ANNOUNCEMENTS — SAGE GREEN TINTED BACKDROP */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="rounded-[2rem] border border-[#00933f]/10 bg-[#00933f]/5 p-6 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-[#00933f]/25 text-[#00933f] shadow-sm">
              <Megaphone className="h-4 w-4" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">
                Ogłoszenia Urzędu Gminy
              </h3>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                Biuletyn informacyjny
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {ANNOUNCEMENTS.map((ann) => (
              <div
                key={ann.id}
                className="group cursor-pointer border-b border-[#00933f]/10 last:border-0 pb-4 last:pb-0"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[9px] font-bold text-[#00933f] bg-[#00933f]/8 border border-[#00933f]/15 px-2 py-0.5 rounded-md">
                    {ann.category}
                  </span>
                  <span className="text-[9px] font-medium text-stone-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-stone-400/80" /> {ann.date}
                  </span>
                </div>
                <h4 className="text-[13px] font-bold text-slate-800 group-hover:text-[#00933f] transition-colors duration-200 line-clamp-1 leading-snug">
                  {ann.title}
                </h4>
                <p className="mt-1 text-[11px] text-slate-500 font-normal line-clamp-2 leading-relaxed">
                  {ann.excerpt}
                </p>
              </div>
            ))}
          </div>

          <a
            href="/ogloszenia"
            className="group mt-5 flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-[#00933f] border border-stone-200/80 hover:border-[#00933f] py-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all duration-300 shadow-sm"
          >
            <span>Wszystkie ogłoszenia</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.div>

      {/* 2. LATEST COMMENTS — WARM GOLD TINTED BACKDROP */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="rounded-[2rem] border border-[#c49200]/10 bg-[#c49200]/5 p-6 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-[#c49200]/25 text-[#c49200] shadow-sm">
              <MessageSquare className="h-4 w-4" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">
                Głos Mieszkańców
              </h3>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                Najnowsze opinie i pomysły
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {comments.map((com) => (
              <div
                key={com.id}
                className="group/item flex gap-3 border-b border-[#c49200]/10 last:border-0 pb-4 last:pb-0"
              >
                <div
                  className="h-7.5 w-7.5 rounded-lg shrink-0 flex items-center justify-center font-black text-[9px] shadow-sm bg-white border border-[#c49200]/25 text-[#c49200]"
                >
                  {com.initials}
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-slate-700">
                      {com.author}
                    </span>
                    <span className="text-[9px] font-medium text-stone-400 flex items-center gap-0.5 shrink-0">
                      <Clock className="h-2.5 w-2.5 text-stone-400" /> {com.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-normal leading-relaxed italic">
                    &quot;{com.comment}&quot;
                  </p>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-[#c49200]/80 group-hover/item:text-[#c49200] transition-colors cursor-pointer pt-0.5 truncate">
                    {com.source}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="/glos-mieszkancow"
            className="group/btn mt-5 flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-[#c49200] border border-stone-200/80 hover:border-[#c49200] py-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all duration-300 shadow-sm"
          >
            <span>Dołącz do dyskusji</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
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
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-dusty-olive-light text-dusty-olive">
            <CloudSun className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-foreground">
              Pogoda Wręczyca Wielka
            </h3>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
              Prognoza 14-dniowa
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gradient-to-br from-[#588157] to-[#3a5a40] text-white p-5 rounded-2xl mb-6 shadow-md shadow-dusty-olive/20">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-toffee-brown animate-pulse">Aktualnie</span>
            <div className="text-4xl font-extralight tracking-tighter">18°C</div>
            <div className="text-[10px] font-bold text-white/80">Słonecznie i ciepło</div>
          </div>
          <div className="text-right space-y-1 text-white/80">
            <Sun className="h-10 w-10 text-amber-300 stroke-[1.5] filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)] inline-block" />
            <div className="text-[9px] font-bold uppercase tracking-widest block">Wilgotność: 62%</div>
            <div className="text-[9px] font-bold uppercase tracking-widest block">Wiatr: 12 km/h</div>
          </div>
        </div>

        <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-1.5 scrollbar-thin">
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
