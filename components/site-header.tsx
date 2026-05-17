"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, Shield, Cloud, Sun, CloudRain, CloudSun, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { SearchDialog } from "@/components/search-dialog"
import { AnnouncementTicker } from "@/components/announcement-ticker"

function WeatherWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const forecast = [
    { day: "Dziś", temp: "18°C", icon: <Sun className="h-4 w-4 text-amber-500" />, desc: "Słonecznie" },
    { day: "Jutro", temp: "21°C", icon: <Sun className="h-4 w-4 text-amber-500" />, desc: "Słonecznie" },
    { day: "Środa", temp: "22°C", icon: <CloudSun className="h-4 w-4 text-[#a3b18a]" />, desc: "Zachmurzenie" },
    { day: "Czwartek", temp: "17°C", icon: <CloudRain className="h-4 w-4 text-blue-400" />, desc: "Przelotny deszcz" }
  ]

  return (
    <div 
      className="relative hidden md:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/40 border border-border/40 text-xs font-semibold text-foreground/80 hover:bg-secondary/60 hover:border-[#3a5a40]/30 transition-all active:scale-95 cursor-pointer"
      >
        <Sun className="h-4 w-4 text-amber-500 animate-spin-slow" />
        <span>18°C</span>
        <span className="text-muted-foreground/60 font-normal">Wręczyca</span>
        <ChevronDown className={`h-3 w-3 text-muted-foreground/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-64 rounded-2xl border border-border/50 bg-white/95 backdrop-blur-md p-4 shadow-xl z-50 pointer-events-auto"
          >
            <div className="border-b border-border/40 pb-2.5 mb-2.5 text-left">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#3a5a40]">
                Pogoda Wręczyca Wielka
              </h4>
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">Prognoza 4-dniowa</p>
            </div>

            <div className="space-y-2">
              {forecast.map((w, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-secondary/40 last:border-0 last:pb-0 text-left">
                  <span className="text-xs font-bold text-foreground/80 w-16">{w.day}</span>
                  <div className="flex items-center gap-2 flex-1 justify-start">
                    {w.icon}
                    <span className="text-[10px] font-medium text-muted-foreground truncate max-w-[90px]">{w.desc}</span>
                  </div>
                  <span className="text-xs font-black text-[#3a5a40]">{w.temp}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const languages = [
  { 
    code: "pl", 
    label: "Polski", 
    flag: (
      <svg viewBox="0 0 512 512" className="w-4 h-4 rounded-full overflow-hidden shadow-sm border border-border/40 shrink-0">
        <rect width="512" height="256" fill="#ffffff" />
        <rect y="256" width="512" height="256" fill="#dc2626" />
      </svg>
    ) 
  },
  { 
    code: "en", 
    label: "English", 
    flag: (
      <svg viewBox="0 0 60 30" className="w-4 h-4 rounded-full overflow-hidden shadow-sm border border-border/40 shrink-0">
        <rect width="60" height="30" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 L30,30 M0,15 L60,15" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6"/>
      </svg>
    ) 
  },
  { 
    code: "de", 
    label: "Deutsch", 
    flag: (
      <svg viewBox="0 0 512 512" className="w-4 h-4 rounded-full overflow-hidden shadow-sm border border-border/40 shrink-0">
        <rect width="512" height="170.7" fill="#000000" />
        <rect y="170.7" width="512" height="170.7" fill="#dd0000" />
        <rect y="341.3" width="512" height="170.7" fill="#ffce00" />
      </svg>
    ) 
  },
  { 
    code: "ua", 
    label: "Українська", 
    flag: (
      <svg viewBox="0 0 512 512" className="w-4 h-4 rounded-full overflow-hidden shadow-sm border border-border/40 shrink-0">
        <rect width="512" height="256" fill="#0057b7" />
        <rect y="256" width="512" height="256" fill="#ffd700" />
      </svg>
    ) 
  }
]

interface LanguageSelectorProps {
  currentLang: string
  setCurrentLang: (code: string) => void
}

function LanguageSelector({ currentLang, setCurrentLang }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedLanguage = languages.find(l => l.code === currentLang) || languages[0]

  const handleSelect = (code: string) => {
    setCurrentLang(code)
    localStorage.setItem("selected-language", code)
    setIsOpen(false)
    window.dispatchEvent(new Event("languagechange"))
  }

  return (
    <div ref={dropdownRef} className="relative z-[60]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/40 border border-border/40 text-xs font-semibold text-foreground/80 hover:bg-secondary/60 hover:border-[#3a5a40]/30 transition-all active:scale-95 cursor-pointer h-[34px] justify-center"
      >
        {selectedLanguage.flag}
        <span className="uppercase font-black tracking-wider text-[11px] text-[#3a5a40]">{selectedLanguage.code}</span>
        <ChevronDown className={`h-3 w-3 text-muted-foreground/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-44 rounded-2xl border border-border/50 bg-white/95 backdrop-blur-md p-1.5 shadow-xl z-50 pointer-events-auto"
          >
            <div className="space-y-0.5">
              {languages.map((lang) => {
                const isSelected = lang.code === currentLang
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all duration-200 cursor-pointer
                      ${isSelected 
                        ? 'bg-[#3a5a40]/10 text-[#3a5a40]' 
                        : 'text-foreground/75 hover:bg-secondary/60 hover:text-[#3a5a40]'
                      }
                    `}
                  >
                    {lang.flag}
                    <span>{lang.label}</span>
                    {isSelected && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3a5a40]" />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const navLinks = [
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Galeria", href: "/galeria" },
  { label: "Sport", href: "/sport" },
  { label: "Kultura i rozrywka", href: "/kultura-i-rozrywka" },
  { label: "Kontakt", href: "/kontakt" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [currentLang, setCurrentLang] = useState("pl")

  useEffect(() => {
    const saved = localStorage.getItem("selected-language")
    if (saved) {
      setCurrentLang(saved)
    }
  }, [])

  return (
    <>
      <AnnouncementTicker />
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-border/40"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Row: Brand + Search + Actions */}
          <div className="flex h-20 items-center justify-between gap-8">
            <motion.a 
              href="/" 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 group shrink-0"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-border/50 transition-transform group-hover:scale-105 overflow-hidden ring-4 ring-emerald-50">
                <img src="/logo-new.png" alt="Wręczyca Wielka" className="h-10 w-10 object-contain" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-medium text-foreground whitespace-nowrap tracking-tight">
                  Wręczyca Wielka
                </span>
                <span className="text-[10px] font-bold text-[#3a5a40]/80 uppercase tracking-wider">
                  Niezależny przegląd gminny
                </span>
              </div>
            </motion.a>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-1 max-w-xl hidden md:block"
            >
              <button
                aria-label="Szukaj"
                onClick={() => setSearchOpen(true)}
                className="w-full flex h-12 items-center gap-3 rounded-2xl border border-border/60 bg-secondary/40 px-5 text-sm text-muted-foreground transition-all hover:bg-secondary/60 hover:border-[#3a5a40]/30"
              >
                <Search className="h-4 w-4" />
                <span className="flex-1 text-left">Szukaj informacji w serwisie...</span>
                <kbd className="hidden lg:inline-flex items-center rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-muted-foreground shadow-sm border border-border/50">
                  CTRL + K
                </kbd>
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <WeatherWidget />
              <LanguageSelector currentLang={currentLang} setCurrentLang={setCurrentLang} />
              <motion.a
                href="https://www.bip.wreczyca-wielka.akcessnet.net/index.php?idg=1&id=1&x=1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#dc2626] px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                BIP
              </motion.a>

              <button
                aria-label="Menu"
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl text-foreground/70 hover:bg-secondary transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </motion.div>
          </div>

          {/* Bottom Row: Navigation */}
          <div className="hidden lg:flex h-12 items-center border-t border-border/40">
            <nav className="flex items-center gap-1 -ml-4 relative">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href))
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    onHoverStart={() => setHoveredIdx(idx)}
                    onHoverEnd={() => setHoveredIdx(null)}
                    className={`relative rounded-xl px-5 py-2 text-[12px] font-black uppercase tracking-wider transition-colors duration-300 whitespace-nowrap z-10
                      ${isActive 
                        ? 'text-[#3a5a40]' 
                        : 'text-foreground/75 hover:text-[#3a5a40]'
                      }
                    `}
                  >
                    {link.label}

                    {/* Sliding Hover background pill */}
                    {hoveredIdx === idx && (
                      <motion.div
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-[#a3b18a]/20 rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Active tab bottom line indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-line"
                        className="absolute bottom-0 left-5 right-5 h-[3px] bg-[#3a5a40] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                )
              })}
            </nav>
          </div>

          <AnimatePresence>
            {open && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden pb-4 flex flex-col gap-1 overflow-hidden"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="border-t border-border/40 my-2 pt-2" />
                <div className="px-4 py-2 flex flex-col gap-2">
                  <span className="text-[10px] font-black text-[#3a5a40] uppercase tracking-widest">
                    Wybierz język / Select language
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => {
                      const isSelected = lang.code === currentLang
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.code)
                            localStorage.setItem("selected-language", lang.code)
                            window.dispatchEvent(new Event("languagechange"))
                          }}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer
                            ${isSelected 
                              ? 'bg-[#3a5a40]/10 border-[#3a5a40]/30 text-[#3a5a40]' 
                              : 'bg-secondary/40 border-border/40 text-foreground/75 hover:bg-secondary'
                            }
                          `}
                        >
                          {lang.flag}
                          <span>{lang.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
