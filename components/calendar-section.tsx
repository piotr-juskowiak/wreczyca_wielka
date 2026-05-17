"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Music,
  Building2,
  Trophy,
  Smile,
  Flame,
  Leaf,
  X,
  CalendarDays,
  ExternalLink,
  Info
} from "lucide-react"

// Types
interface MunicipalEvent {
  id: string
  title: string
  description: string
  date: Date
  dateStr: string
  time: string
  category: string
  location: string
  icon: any
}

// Custom Date Matching helper (avoids timezone issues)
const isSameDay = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate()
}

export function CalendarSection() {
  // We use May and June 2026 as the mock active timeframe matching the events
  const [currentYear, setCurrentYear] = useState(2026)
  const [currentMonth, setCurrentMonth] = useState(4) // 4 = May in JS Date (0-indexed)
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<MunicipalEvent | null>(null)

  // Events list matching Wręczyca Wielka typical local happenings
  const events = useMemo<MunicipalEvent[]>(() => [
    {
      id: "ev-1",
      title: "Wiosenny Koncert Gminnej Orkiestry Dętej",
      description: "Serdecznie zapraszamy wszystkich mieszkańców na wyjątkowe, doroczne widowisko muzyczne w wykonaniu naszej nagradzanej Gminnej Orkiestry Dętej. W repertuarze znajdą się zarówno tradycyjne marsze, jak i znane aranżacje muzyki filmowej i rozrywkowej. Wydarzenie ma charakter plenerowy, wstęp całkowicie wolny!",
      date: new Date(2026, 4, 22),
      dateStr: "22 maja 2026",
      time: "15:00",
      category: "Kultura",
      location: "Park przy Gminnym Ośrodku Kultury we Wręczycy Wielkiej",
      icon: Music
    },
    {
      id: "ev-2",
      title: "LIX Zwyczajna Sesja Rady Gminy",
      description: "Przewodniczący Rady Gminy zaprasza na obradowania LIX Zwyczajnej Sesji Rady Gminy Wręczyca Wielka. W porządku obrad m.in. zatwierdzenie sprawozdania finansowego z wykonania budżetu za ubiegły rok oraz debata nad raportem o stanie gminy. Sesja będzie również transmitowana na żywo w portalu mieszkańca.",
      date: new Date(2026, 4, 28),
      dateStr: "28 maja 2026",
      time: "10:00",
      category: "Urząd",
      location: "Sala Sesyjna Urzędu Gminy Wręczyca Wielka",
      icon: Building2
    },
    {
      id: "ev-3",
      title: "Derby Powiatu: Sokół Wręczyca vs Pogoń Kamyk",
      description: "Prawdziwe piłkarskie emocje! Nasz lokalny klub KS Sokół Wręczyca Wielka zmierzy się w meczu derbowym z odwiecznym rywalem Pogoń Kamyk w ramach rozgrywek ligi okręgowej. Liczymy na głośny, sportowy doping naszych kibiców. Na miejscu strefa gastronomiczna i atrakcje dla najmłodszych fanów.",
      date: new Date(2026, 4, 31),
      dateStr: "31 maja 2026",
      time: "16:00",
      category: "Sport",
      location: "Stadion Gminny we Wręczycy Wielkiej (ul. Sportowa)",
      icon: Trophy
    },
    {
      id: "ev-4",
      title: "Gminny Dzień Dziecka: Festiwal Kolorów",
      description: "Wspaniałe święto dla wszystkich najmłodszych mieszkańców gminy! W programie zaplanowano ogromny park dmuchańców, darmową watę cukrową i popcorn, strefę warsztatów naukowych z robotyki, malowanie twarzy oraz widowiskowy Festiwal Kolorów Holi z wyrzutami kolorowych proszków co godzinę. Zapraszamy całe rodziny!",
      date: new Date(2026, 5, 6),
      dateStr: "6 czerwca 2026",
      time: "14:00",
      category: "Dla dzieci",
      location: "Boisko sportowo-rekreacyjne przy Szkole Podstawowej we Wręczycy Wielkiej",
      icon: Smile
    },
    {
      id: "ev-5",
      title: "Gminne Zawody Sportowo-Pożarnicze OSP",
      description: "Widowiskowa rywalizacja jednostek Ochotniczych Straży Pożarnych z terenu całej gminy Wręczyca Wielka. Drużyny zmierzą się w sztafecie pożarniczej oraz niezwykle emocjonującym ćwiczeniu bojowym. To doskonała okazja do zobaczenia sprawności naszych druhów strażaków w akcji oraz nowoczesnego sprzętu ratowniczego.",
      date: new Date(2026, 5, 14),
      dateStr: "14 czerwca 2026",
      time: "11:00",
      category: "Bezpieczeństwo",
      location: "Teren rekreacyjny OSP w Kalei",
      icon: Flame
    },
    {
      id: "ev-6",
      title: "Eko-Piknik: Zamień odpady na sadzonkę",
      description: "Urząd Gminy zaprasza na proekologiczną akcję 'Drzewko za makulaturę i elektrośmieci'. Każdy mieszkaniec, który przyniesie min. 5 kg makulatury lub kompletny zużyty sprzęt elektryczny/elektroniczny, otrzyma w zamian sadzonki krzewów ozdobnych, drzewek owocowych lub ziół. Na miejscu także warsztaty z kompostowania i recyklingu.",
      date: new Date(2026, 5, 20),
      dateStr: "20 czerwca 2026",
      time: "17:00",
      category: "Ekologia",
      location: "Plac rekreacyjny za Urzędem Gminy",
      icon: Leaf
    }
  ], [])

  // Month navigation labels
  const months = [
    { name: "Styczeń" },
    { name: "Luty" },
    { name: "Marzec" },
    { name: "Kwiecień" },
    { name: "Maj" },
    { name: "Czerwiec" },
    { name: "Lipiec" },
    { name: "Sierpień" },
    { name: "Wrzesień" },
    { name: "Październik" },
    { name: "Listopad" },
    { name: "Grudzień" }
  ]

  // Calendar logic: generate calendar days for the grid
  const days = useMemo(() => {
    const year = currentYear
    const month = currentMonth
    
    // Start of current month
    const startOfCurrent = new Date(year, month, 1)
    
    // Day of the week for day 1 (0 = Sun, 1 = Mon ... 6 = Sat)
    let startDayOfWeek = startOfCurrent.getDay()
    // Adjust so Monday is 0 and Sunday is 6
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1
    
    const dayList: { date: Date; isCurrentMonth: boolean }[] = []
    
    // 1. Backfill previous month days
    const prevMonthDate = new Date(year, month, 0)
    const prevMonthDays = prevMonthDate.getDate()
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      dayList.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false
      })
    }
    
    // 2. Current month days
    const currentMonthDays = new Date(year, month + 1, 0).getDate()
    for (let i = 1; i <= currentMonthDays; i++) {
      dayList.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      })
    }
    
    // 3. Next month days to pad to a perfect grid (multiple of 7)
    const totalCells = dayList.length <= 35 ? 35 : 42
    const nextMonthDaysCount = totalCells - dayList.length
    for (let i = 1; i <= nextMonthDaysCount; i++) {
      dayList.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      })
    }
    
    return dayList
  }, [currentYear, currentMonth])

  // Navigation handlers restricted to May and June 2026 for a bulletproof UX
  const handlePrevMonth = () => {
    if (currentMonth === 4) return // Lock to May
    setCurrentMonth(4)
  }

  const handleNextMonth = () => {
    if (currentMonth === 5) return // Lock to June
    setCurrentMonth(5)
  }

  // Filter events based on selected date
  const filteredEvents = useMemo(() => {
    if (!selectedDate) {
      // Sort upcoming events chronologically
      return [...events].sort((a, b) => a.date.getTime() - b.date.getTime())
    }
    return events.filter(e => isSameDay(e.date, selectedDate))
  }, [events, selectedDate])

  // Google Calendar integration URL generator
  const getGoogleCalendarUrl = (event: MunicipalEvent) => {
    const formatTime = (d: Date, t: string) => {
      const [hrs, mins] = t.split(":")
      const dateCopy = new Date(d)
      dateCopy.setHours(parseInt(hrs, 10))
      dateCopy.setMinutes(parseInt(mins, 10))
      return dateCopy.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    }
    
    const start = formatTime(event.date, event.time)
    
    // Event duration 2 hours default
    const [hrs, mins] = event.time.split(":")
    const endDate = new Date(event.date)
    endDate.setHours(parseInt(hrs, 10) + 2)
    endDate.setMinutes(parseInt(mins, 10))
    const end = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`
  }

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  }

  return (
    <section 
      id="kalendarium"
      aria-labelledby="events-calendar"
      className="relative overflow-hidden bg-gradient-to-br from-[#1a3520] via-[#244b30] to-[#122416] py-24 text-white border-y border-[#3a5a40]/30"
    >
      {/* Decorative ambient elements */}
      <div className="absolute -left-64 -top-64 h-96 w-96 rounded-full bg-[#588157]/15 blur-3xl pointer-events-none" />
      <div className="absolute -right-64 -bottom-64 h-96 w-96 rounded-full bg-[#a3b18a]/10 blur-3xl pointer-events-none" />
      
      {/* Background vector leaf ornament effect (created with CSS gradient) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none select-none bg-[radial-gradient(#dad7cd_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block rounded-full bg-white/10 text-[#a3b18a] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest mb-4 border border-white/10 backdrop-blur-md">
            Wydarzenia
          </span>
          <h2 id="events-calendar" className="text-4xl md:text-5xl font-black text-white text-balance leading-tight tracking-tight">
            Kalendarium wydarzeń
          </h2>
          <p className="mt-4 text-lg text-white/60 font-medium">
            Bądź na bieżąco z życiem kulturalnym, społecznym i sportowym gminy Wręczyca Wielka. Wybierz datę w kalendarzu lub przeglądaj poniższą listę.
          </p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Premium Calendar Widget (lg:col-span-5) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl shadow-black/10 relative overflow-hidden">
              
              {/* Header inside calendar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-[#a3b18a]" />
                  <h3 className="text-base font-black tracking-wider text-white uppercase">
                    {months[currentMonth].name} {currentYear}
                  </h3>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={handlePrevMonth}
                    disabled={currentMonth === 4}
                    className={`p-2 rounded-xl bg-white/5 border border-white/10 transition-all ${
                      currentMonth === 4 
                        ? 'opacity-30 cursor-not-allowed' 
                        : 'hover:bg-white/10 hover:scale-105 active:scale-95'
                    }`}
                    aria-label="Poprzedni miesiąc"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={handleNextMonth}
                    disabled={currentMonth === 5}
                    className={`p-2 rounded-xl bg-white/5 border border-white/10 transition-all ${
                      currentMonth === 5 
                        ? 'opacity-30 cursor-not-allowed' 
                        : 'hover:bg-white/10 hover:scale-105 active:scale-95'
                    }`}
                    aria-label="Następny miesiąc"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Day names headers */}
              <div className="grid grid-cols-7 gap-1.5 text-center mb-3 text-[10px] font-black uppercase tracking-widest text-[#a3b18a]/80">
                <div>Pn</div>
                <div>Wt</div>
                <div>Śr</div>
                <div>Cz</div>
                <div>Pt</div>
                <div>Sb</div>
                <div>Nd</div>
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1.5">
                {days.map((dayObj, idx) => {
                  const isSelected = selectedDate && isSameDay(dayObj.date, selectedDate)
                  const hasEv = events.some(e => isSameDay(e.date, dayObj.date))
                  // Current mock today is May 17, 2026
                  const isTodayVal = isSameDay(dayObj.date, new Date(2026, 4, 17))
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedDate(null) // deselect
                        } else {
                          setSelectedDate(dayObj.date)
                        }
                      }}
                      className={`
                        relative aspect-square flex flex-col items-center justify-center rounded-2xl text-xs font-black transition-all cursor-pointer select-none group/day
                        ${!dayObj.isCurrentMonth ? 'text-white/20 hover:text-white/40' : 'text-white'}
                        ${isSelected 
                          ? 'bg-[#a3b18a] text-[#1a3520] shadow-lg shadow-[#a3b18a]/30 scale-105 border border-[#a3b18a]' 
                          : isTodayVal
                            ? 'bg-white/15 text-white border border-[#a3b18a]/50'
                            : 'bg-white/0 hover:bg-white/5 border border-transparent'
                        }
                      `}
                    >
                      <span className="relative z-10">{dayObj.date.getDate()}</span>
                      
                      {/* Active events indicator dot */}
                      {hasEv && (
                        <span className={`absolute bottom-2 h-1.5 w-1.5 rounded-full transition-transform group-hover/day:scale-125 ${
                          isSelected ? 'bg-[#1a3520]' : 'bg-[#a3b18a] animate-pulse'
                        }`} />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Quick Info Box underneath calendar grid */}
              <div className="mt-6 pt-5 border-t border-white/5 flex gap-3 items-start text-xs text-white/50 bg-white/0 rounded-2xl">
                <Info className="h-4 w-4 text-[#a3b18a] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Dni oznaczone <span className="text-[#a3b18a] font-bold">zielonym punktem</span> posiadają przypisane wydarzenia. Kliknij na dzień, aby przefiltrować listę.
                </p>
              </div>

             </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Dynamic Events List (lg:col-span-7) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="lg:col-span-7 flex flex-col h-full justify-start min-h-[400px]"
          >
            
            {/* Header / Active Filter Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                <span>
                  {selectedDate ? "Wydarzenia w dniu:" : "Najbliższe wydarzenia"}
                </span>
                {selectedDate && (
                  <span className="text-[#a3b18a] text-lg font-black ml-1">
                    {selectedDate.getDate()} {months[selectedDate.getMonth()].name}
                  </span>
                )}
              </h3>
              
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  className="px-4 py-1.5 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/15 border border-white/10 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer active:scale-95"
                >
                  Pokaż wszystkie
                </button>
              )}
            </div>

            {/* Events List container */}
            <motion.div 
              layout
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6 flex-1"
            >
              <AnimatePresence mode="popLayout">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => {
                    const Icon = event.icon
                    const isMay = event.date.getMonth() === 4
                    const monthAbbr = isMay ? "MAJ" : "CZE"
                    
                    return (
                      <motion.div
                        key={event.id}
                        layout
                        variants={cardVariants}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="group relative flex flex-col sm:flex-row gap-6 rounded-[2.5rem] bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden shadow-xl"
                        onClick={() => setSelectedEvent(event)}
                      >
                        {/* Decorative leaf watermarks inside card */}
                        <div className="absolute right-[-2rem] bottom-[-2rem] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none duration-500 text-white">
                          <Icon className="h-40 w-40 rotate-12" />
                        </div>

                        {/* Date badge */}
                        <div className="flex sm:flex-col items-center justify-center shrink-0 w-full sm:w-20 h-16 sm:h-20 rounded-[1.8rem] bg-white text-[#1a3520] font-black shadow-2xl transition-transform group-hover:scale-105 duration-300">
                          <span className="text-3xl sm:text-4xl leading-none font-black tracking-tight">
                            {event.date.getDate()}
                          </span>
                          <span className="text-[10px] sm:text-xs font-black tracking-[0.15em] text-[#3a5a40] sm:mt-1 ml-2 sm:ml-0">
                            {monthAbbr}
                          </span>
                        </div>

                        {/* Info details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            {/* Badges / Meta row */}
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#a3b18a]/20 text-[#a3b18a] border border-[#a3b18a]/30">
                                {event.category}
                              </span>
                              <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-semibold tracking-wider uppercase">
                                <Clock className="h-3 w-3 text-[#a3b18a]" />
                                <span>{event.time}</span>
                              </div>
                            </div>
                            
                            {/* Title */}
                            <h4 className="text-lg md:text-xl font-black text-white group-hover:text-[#a3b18a] transition-all leading-snug tracking-tight mt-3 mb-2">
                              {event.title}
                            </h4>
                            
                            {/* Short excerpt description */}
                            <p className="text-white/60 text-sm leading-relaxed font-medium line-clamp-2">
                              {event.description}
                            </p>
                          </div>

                          {/* Location & Arrow CTA */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 text-white/50 text-xs font-semibold">
                              <MapPin className="h-3.5 w-3.5 text-[#a3b18a] shrink-0" />
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                            
                            <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#a3b18a] group-hover:text-white transition-colors">
                              Szczegóły
                              <ChevronRight className="h-3 w-3 -mr-1 transition-transform group-hover:translate-x-1 duration-300" />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })
                ) : (
                  <motion.div 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white/5 border border-white/5 rounded-[2.5rem]"
                  >
                    <CalendarIcon className="h-12 w-12 text-[#a3b18a]/30 mb-4" />
                    <p className="text-lg font-black text-white mb-1">Brak wydarzeń tego dnia</p>
                    <p className="text-white/50 text-sm max-w-sm">
                      Wygląda na to, że w wybranym dniu nie zaplanowano żadnych wydarzeń gminnych. Wybierz inny dzień lub wyczyść filtrowanie.
                    </p>
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="mt-6 px-5 py-2.5 rounded-2xl bg-[#a3b18a] text-[#1a3520] font-black text-[10px] uppercase tracking-widest hover:bg-[#dad7cd] shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      Pokaż wszystkie
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* EVENT DETAIL INTERACTIVE DIALOG MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop glassmorphism overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#244b30] to-[#122416] border border-white/10 rounded-[3rem] p-6 sm:p-10 text-white shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Decorative radial lighting in dialog */}
              <div className="absolute top-0 right-0 p-32 bg-[#a3b18a]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                aria-label="Zamknij dialog"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Dialog Content */}
              <div>
                {/* Event Category Tag */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#a3b18a]/20 text-[#a3b18a] border border-[#a3b18a]/30">
                    {selectedEvent.category}
                  </span>
                  
                  {/* Mock status indicator */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-black tracking-widest text-[#a3b18a]/70 uppercase">Wydarzenie aktualne</span>
                </div>

                {/* Event Title */}
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-6 pr-8">
                  {selectedEvent.title}
                </h3>

                {/* Meta details widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {/* Date & Time Grid Box */}
                  <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4">
                    <div className="h-10 w-10 flex items-center justify-center bg-[#a3b18a]/20 rounded-xl text-[#a3b18a] shrink-0">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-white/40 leading-none mb-1">Kiedy</p>
                      <p className="text-sm font-bold text-white">{selectedEvent.dateStr}</p>
                      <p className="text-xs font-semibold text-[#a3b18a] mt-0.5">Godzina: {selectedEvent.time}</p>
                    </div>
                  </div>

                  {/* Location Grid Box */}
                  <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4">
                    <div className="h-10 w-10 flex items-center justify-center bg-[#a3b18a]/20 rounded-xl text-[#a3b18a] shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-wider text-white/40 leading-none mb-1">Gdzie</p>
                      <p className="text-sm font-bold text-white truncate">{selectedEvent.location}</p>
                      <p className="text-xs font-semibold text-[#a3b18a] mt-0.5">Polska, woj. śląskie</p>
                    </div>
                  </div>
                </div>

                {/* Detailed Description */}
                <div className="mb-10">
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#a3b18a] mb-3">Opis wydarzenia</h4>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed font-medium bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Action Buttons inside Modal */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                  
                  {/* Google Calendar Add Button */}
                  <a
                    href={getGoogleCalendarUrl(selectedEvent)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#a3b18a] text-[#1a3520] font-black text-xs uppercase tracking-widest shadow-xl shadow-[#1a3520]/20 hover:bg-[#dad7cd] hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
                  >
                    <CalendarDays className="h-4 w-4" />
                    Dodaj do Google Calendar
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>

                  {/* Close button inside modal CTA */}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
                  >
                    Zamknij
                  </button>

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
