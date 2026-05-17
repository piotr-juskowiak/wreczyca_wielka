"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, Shield, Cloud, Sun, CloudRain, CloudSun, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { SearchDialog } from "@/components/search-dialog"
import { AnnouncementTicker } from "@/components/announcement-ticker"

function WeatherWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const forecast = [
    { day: "Dziś", temp: "18°C", icon: <Sun className="h-4 w-4 text-[#a68a64]" />, desc: "Słonecznie" },
    { day: "Jutro", temp: "21°C", icon: <Sun className="h-4 w-4 text-[#a68a64]" />, desc: "Słonecznie" },
    { day: "Środa", temp: "22°C", icon: <CloudSun className="h-4 w-4 text-[#a4ac86]" />, desc: "Zachmurzenie" },
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
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/40 border border-border/40 text-xs font-semibold text-foreground/80 hover:bg-secondary/60 hover:border-[#414833]/30 transition-all active:scale-95 cursor-pointer"
      >
        <Sun className="h-4 w-4 text-[#a68a64] animate-spin-slow" />
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
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#414833]">
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
                  <span className="text-xs font-black text-[#414833]">{w.temp}</span>
                </div>
              ))}
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

  return (
    <>
      <AnnouncementTicker />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/60"
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
                <span className="text-[10px] font-bold text-digital-blue uppercase tracking-wider">
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
                className="w-full flex h-12 items-center gap-3 rounded-2xl border border-border/60 bg-secondary/40 px-5 text-sm text-muted-foreground transition-all hover:bg-secondary/60 hover:border-[#414833]/30"
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
                        ? 'text-digital-blue'
                        : 'text-foreground/75 hover:text-digital-blue'
                      }
                    `}
                  >
                    {link.label}

                    {/* Sliding Hover background pill */}
                    {hoveredIdx === idx && (
                      <motion.div
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-digital-blue-light/50 rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Active tab bottom line indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-line"
                        className="absolute bottom-0 left-5 right-5 h-[3px] bg-digital-blue rounded-full"
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
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
