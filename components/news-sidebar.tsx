"use client"

import { motion } from "framer-motion"
import { Megaphone, MessageSquare, CloudSun, Sun, CloudRain, Cloud, ArrowRight, Calendar, Clock } from "lucide-react"
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

      {/* 1. MUNICIPAL ANNOUNCEMENTS — PREMIUM NATURAL CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative overflow-hidden rounded-[2.25rem] border border-stone-200 bg-white/70 backdrop-blur-md p-6 shadow-sm hover:shadow-[0_12px_30px_rgba(58,90,64,0.06)] transition-all duration-500 text-stone-855"
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />
        
        {/* Subtle background decorative circle */}
        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-primary/[0.02] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/10 text-primary shadow-[0_2px_10px_rgba(58,90,64,0.05)]">
              <Megaphone className="h-4.5 w-4.5" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-widest text-stone-800 leading-tight">
                Ogłoszenia Urzędu Gminy
              </h3>
              <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block mt-0.5">
                Oficjalny Biuletyn Informacyjny
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {ANNOUNCEMENTS.map((ann) => {
              // Custom left accent color or tag styling based on category
              let accentColor = "border-l-primary"
              let tagStyle = "text-primary bg-primary/5 border border-primary/10"
              
              if (ann.category === "Techniczne") {
                accentColor = "border-l-amber-500"
                tagStyle = "text-amber-800 bg-amber-50 border border-amber-200/50"
              } else if (ann.category === "Inicjatywy") {
                accentColor = "border-l-toffee-brown"
                tagStyle = "text-[#65764d] bg-toffee-brown/10 border border-toffee-brown/20"
              }

              return (
                <div
                  key={ann.id}
                  className={`group cursor-pointer bg-[#faf9f5]/60 hover:bg-white rounded-2xl p-4.5 border border-stone-200/50 border-l-[3.5px] ${accentColor} shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_20px_rgba(58,90,64,0.06)] hover:-translate-y-[2px] transition-all duration-300 text-left`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${tagStyle}`}>
                      {ann.category}
                    </span>
                    <span className="text-[10.5px] font-normal text-stone-400 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-stone-300" /> {ann.date}
                    </span>
                  </div>
                  <h4 className="text-[13px] font-bold text-[#2e3f35] group-hover:text-primary transition-colors duration-200 line-clamp-1 leading-snug">
                    {ann.title}
                  </h4>
                  <p className="mt-1.5 text-[11.5px] text-stone-500 font-normal line-clamp-2 leading-relaxed">
                    {ann.excerpt}
                  </p>
                </div>
              )
            })}
          </div>

          <a
            href="/ogloszenia"
            className="group mt-5 flex items-center justify-center gap-2 rounded-xl bg-transparent hover:bg-primary border border-primary/20 hover:border-primary py-3 text-[10px] font-semibold uppercase tracking-widest text-primary hover:text-white transition-all duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.01)] cursor-pointer"
          >
            <span>Wszystkie ogłoszenia</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.div>

      {/* 2. MOST COMMENTED — PREMIUM NATURAL CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="relative overflow-hidden rounded-[2.25rem] border border-stone-200 bg-white/70 backdrop-blur-md p-6 shadow-sm hover:shadow-[0_12px_30px_rgba(58,90,64,0.06)] transition-all duration-500 text-stone-855"
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-toffee-brown" />

        {/* Subtle background decorative circle */}
        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-toffee-brown/[0.03] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-toffee-brown/10 border border-toffee-brown/10 text-primary shadow-[0_2px_10px_rgba(163,177,138,0.05)]">
              <MessageSquare className="h-4.5 w-4.5" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-widest text-stone-800 leading-tight">
                Najczęściej Komentowane
              </h3>
              <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block mt-0.5">
                Głos mieszkańców i najpopularniejsze dyskusje
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {MOST_COMMENTED_ARTICLES.map((article) => (
              <a
                key={article.id}
                href={`/aktualnosci/${article.slug}`}
                className="group flex gap-4 bg-[#faf9f5]/60 hover:bg-white rounded-2xl p-3.5 border border-stone-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_20px_rgba(58,90,64,0.06)] hover:-translate-y-[2px] transition-all duration-300 text-left items-center animate-fadeIn"
              >
                {/* Speech bubble badge using a modern clean box layout */}
                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl bg-toffee-brown/10 border border-toffee-brown/20 text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm gap-0.5">
                  <MessageSquare className="h-3.5 w-3.5 text-[#8f7a66] group-hover:text-white/80 transition-colors" />
                  <span className="text-[11px] font-bold leading-none">{article.commentsCount}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-[11.5px] font-normal text-stone-850 group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-relaxed">
                    {article.title}
                  </h4>
                  <span className="text-[9.5px] font-normal text-stone-450 mt-1 block">
                    {article.category}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <a
            href="/aktualnosci"
            className="group/btn mt-5 flex items-center justify-center gap-2 rounded-xl bg-transparent hover:bg-toffee-brown border border-toffee-brown/20 hover:border-toffee-brown py-3 text-[10px] font-semibold uppercase tracking-widest text-primary hover:text-white transition-all duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.01)] cursor-pointer"
          >
            <span>Zobacz wszystkie dyskusje</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Pogoda Wręczyca Wielka
            </h3>
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
              Prognoza 14-dniowa
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden flex items-center justify-between text-white p-5 rounded-2xl mb-6 shadow-md border border-slate-200/10 group/weather">
          {/* Weather photo background with a subtle dark overlay for maximum text legibility */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/weather:scale-105 pointer-events-none" 
            style={{ backgroundImage: "url('/weather-sunny.png')" }} 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/40 to-slate-950/60 pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <span className="text-[9px] font-semibold uppercase tracking-widest text-amber-300 animate-pulse">Aktualnie</span>
            <div className="text-4xl font-extralight tracking-tighter">18°C</div>
            <div className="text-[10px] font-normal text-white/95">Słonecznie i ciepło</div>
          </div>
          <div className="relative z-10 text-right space-y-1 text-white/90">
            <Sun className="h-10 w-10 text-amber-300 stroke-[1.5] filter drop-shadow-[0_2px_12px_rgba(251,191,36,0.6)] inline-block" />
            <div className="text-[9px] font-normal uppercase tracking-widest block">Wilgotność: 62%</div>
            <div className="text-[9px] font-normal uppercase tracking-widest block">Wiatr: 12 km/h</div>
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
      </motion.div>

    </aside>
  )
}
