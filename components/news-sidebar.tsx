"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Megaphone,
  MessageSquare,
  CloudSun,
  Sun,
  CloudRain,
  Cloud,
  ArrowRight,
  Calendar,
  ChevronRight,
  Landmark,
  Info,
} from "lucide-react"
import { toast } from "sonner"

const ANNOUNCEMENTS_HEADER_IMAGE = "https://i.imgur.com/y1KOVK4.png"
const COMMENTS_HEADER_IMAGE = "https://i.imgur.com/34TpIGu.png"
const GREEN_BADGE = "bg-emerald-50 text-[#008237] border-emerald-200/70"

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

const MOST_COMMENTED_ARTICLES = [
  {
    id: "mc-1",
    title: "Tomasz Osiński zostanie nowym radnym gminy Wręczyca Wielka",
    commentsCount: 41,
    category: "Samorząd",
    slug: "tomasz-osinski-zostanie-nowym-radnym-gminy-wreczyca-wielka",
  },
  {
    id: "mc-2",
    title: "Żenująca propozycja stawek dla druhów OSP w gminie Wręczyca Wielka",
    commentsCount: 26,
    category: "Bezpieczeństwo",
    slug: "zenujaca-propozycja-stawek-dla-druhow-osp-w-gminie-wreczyca-wielka",
  },
  {
    id: "mc-3",
    title: "Adam Skalik nowym komendantem gminnym ZOSPRP we Wręczycy Wielkiej! Ogromna porażka PSL i jej działaczy!",
    commentsCount: 26,
    category: "Polityka",
    slug: "adam-skalik-nowym-komendantem-gminnym-zosprp-we-wreczycy-wielkiej-ogromna-porazka-psl-i-jej-dzialaczy",
  },
  {
    id: "mc-4",
    title: "Strażacy myją przystanki – zdjęcie musi być!",
    commentsCount: 26,
    category: "Lokalne",
    slug: "strazacy-myja-przystanki-zdjecie-musi-byc",
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
        <motion.div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-stone-200 shadow-sm text-stone-400 mb-3 group-hover:scale-105 transition-transform duration-300">
            <Megaphone className="h-5 w-5 text-stone-400/80" strokeWidth={1.8} />
          </div>

          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">
            Miejsce na Twoją reklamę
          </h3>

          <p className="text-[11px] text-stone-400 font-normal max-w-[240px] leading-normal mb-3.5">
            Dotrzyj do tysięcy mieszkańców gminy Wręczyca Wielka każdego dnia.
          </p>

          <button
            onClick={() => {
              toast.info("Biuro Ogłoszeń i Reklam", {
                description: "Napisz na e-mail: kontakt@wreczycawielka.pl lub zadzwoń pod nr tel. (34) 317 01 10 w celu ustalenia szczegółów.",
                duration: 6000,
                icon: <Megaphone className="h-4 w-4 text-golden-dark" />
              })
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white hover:bg-slate-900 border border-stone-200 hover:border-slate-900 text-stone-600 hover:text-white px-3.5 py-2 text-[9px] font-semibold uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer"
          >
            <span>Skontaktuj się</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </motion.div>

      {/* 1. Ogłoszenia UG */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="overflow-hidden rounded-3xl bg-card shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.14)] transition-all duration-300"
        aria-labelledby="sidebar-announcements"
      >
        <div 
          className="relative flex items-center justify-center gap-3 px-5 py-6 overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${ANNOUNCEMENTS_HEADER_IMAGE})` }}
        >
          {/* Bardzo delikatne przyciemnienie tylko po to, by biały tekst był czytelny na jasnym zdjęciu */}
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative z-10 flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-md border border-white/30">
              <Landmark className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h3
              id="sidebar-announcements"
              className="text-[13px] font-black uppercase tracking-[0.2em] text-white drop-shadow-md"
            >
              Ogłoszenia UG
            </h3>
          </div>
        </div>

        <div className="p-5">
        <ol className="divide-y divide-border/60">
          {ANNOUNCEMENTS.map((ann, index) => (
              <li key={ann.id}>
                <article className="group relative flex gap-3 rounded-xl px-1 py-3.5 transition-colors hover:bg-emerald-50/60">
                  <div className="flex w-11 shrink-0 flex-col items-center pt-0.5">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-4 ring-background shadow-sm z-10"
                      aria-hidden
                    >
                      <Info className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    {index < ANNOUNCEMENTS.length - 1 && (
                      <span
                        className="mt-1 w-px flex-1 min-h-[2.5rem] bg-emerald-100/70"
                        aria-hidden
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pt-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <time className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                        <Calendar className="h-3 w-3 shrink-0" aria-hidden />
                        {ann.date}
                      </time>
                    </div>
                    <h4 className="text-[13px] font-semibold leading-snug text-foreground transition-colors group-hover:text-[#00933f] line-clamp-2">
                      {ann.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {ann.excerpt}
                    </p>
                  </div>

                  <ChevronRight
                    className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-[#00933f]"
                    aria-hidden
                  />
                </article>
              </li>
            ))}
        </ol>

        {/* Usunięto przycisk Wszystkie ogłoszenia na prośbę użytkownika */}
        </div>
      </motion.div>

      {/* 2. Głos mieszkańców */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="overflow-hidden rounded-3xl bg-card shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.14)] transition-all duration-300"
        aria-labelledby="sidebar-residents-voice"
      >
        <div 
          className="relative flex items-center justify-center gap-3 px-5 py-6 overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${COMMENTS_HEADER_IMAGE})` }}
        >
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative z-10 flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-md border border-white/30">
              <MessageSquare className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h3
              id="sidebar-residents-voice"
              className="text-[13px] font-black uppercase tracking-[0.2em] text-white drop-shadow-md"
            >
              Głos mieszkańców
            </h3>
          </div>
        </div>

        <div className="p-5">
        <ol className="divide-y divide-border/60">
          {MOST_COMMENTED_ARTICLES.map((article, index) => (
              <li key={article.id}>
                <Link
                  href={`/aktualnosci/${article.slug}`}
                  className="group flex items-start gap-3.5 rounded-xl px-1 py-3.5 transition-colors hover:bg-emerald-50/60"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-[13px] font-black tabular-nums text-stone-500 transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                    aria-hidden
                  >
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-[13px] font-semibold leading-snug text-slate-800 transition-colors group-hover:text-[#00933f] line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className={`rounded-md border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${GREEN_BADGE}`}>
                        {article.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00933f]">
                        <MessageSquare className="h-3 w-3" aria-hidden />
                        {article.commentsCount}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    className="mt-1.5 h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-[#00933f]"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
        </ol>

        {/* Usunięto przycisk Wszystkie dyskusje na prośbę użytkownika */}
        </div>
      </motion.div>

      {/* 3. WEATHER FORECAST */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="overflow-hidden rounded-3xl bg-card shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.14)] transition-all duration-300"
        aria-labelledby="sidebar-weather"
      >
        <div className="p-6">

        <div className="relative overflow-hidden flex items-center justify-between text-white p-5 rounded-2xl mb-6 shadow-md border border-slate-200/10 group/weather">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/weather:scale-105 pointer-events-none"
            style={{ backgroundImage: "url('/weather-sunny.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/40 to-slate-950/60 pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <span className="text-[9px] font-semibold uppercase tracking-widest text-amber-300 animate-pulse">Pogoda Wręczyca Wlk.</span>
            <div className="text-4xl font-extralight tracking-tighter">18°C</div>
            <div className="text-[10px] font-normal text-white/95">Słonecznie i ciepło</div>
          </div>
          <div className="relative z-10 text-right space-y-1 text-white/90">
            <Sun className="h-10 w-10 text-amber-300 stroke-[1.5] filter drop-shadow-[0_2px_12px_rgba(251,191,36,0.6)] inline-block" />
            <div className="text-[9px] font-normal uppercase tracking-widest block">Wilgotność: 62%</div>
            <div className="text-[9px] font-normal uppercase tracking-widest block">Wiatr: 12 km/h</div>
          </div>
        </div>

        <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1.5 scrollbar-thin">
          {WEATHER_FORECAST.map((w, idx) => {
            const Icon = w.icon
            return (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <span className="text-xs font-normal text-foreground w-28 text-left">
                  {w.day}
                </span>

                <div className="flex items-center gap-2 justify-start flex-1 px-2">
                  <Icon className={`h-4.5 w-4.5 ${w.color} shrink-0`} />
                  <span className="text-[10px] font-medium text-muted-foreground hidden sm:inline-block">
                    {w.desc}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <span className="text-xs font-semibold text-foreground">{w.tempDay}°</span>
                  <span className="text-xs text-muted-foreground font-normal">{w.tempNight}°</span>
                </div>
              </div>
            )
          })}
        </div>
        </div>
      </motion.div>

    </aside>
  )
}
