"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, Shield, Cloud, Sun, CloudRain } from "lucide-react"
import { useState, useEffect } from "react"
import { SearchDialog } from "@/components/search-dialog"
import { AnnouncementTicker } from "@/components/announcement-ticker"

function WeatherWidget() {
  const [weather, setWeather] = useState({ temp: 18, icon: <Sun className="h-4 w-4 text-amber-500" /> })

  return (
    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/40 border border-border/40 text-xs font-semibold text-foreground/80">
      {weather.icon}
      <span>{weather.temp}°C</span>
      <span className="text-muted-foreground/60 font-normal">Wręczyca</span>
    </div>
  )
}

const navLinks = [
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Oceń radnego", href: "/ocen-radnego" },
  { label: "Galeria", href: "/galeria" },
  { label: "Sport", href: "/sport" },
  { label: "Kultura i rozrywka", href: "/kultura-i-rozrywka" },
  { label: "Kontakt", href: "/kontakt" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

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
                <span className="text-xl font-black text-foreground whitespace-nowrap tracking-tight">
                  Wręczyca Wielka
                </span>
                <span className="text-xs font-bold text-[#3a5a40]/80 uppercase tracking-widest">
                  Serwis internetowy
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
              <motion.a
                href="#bip"
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
            <nav className="flex items-center gap-1 -ml-4">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  className="rounded-xl px-4 py-2 text-[13px] font-bold text-foreground/70 transition-all hover:text-[#3a5a40] hover:bg-emerald-50/50 whitespace-nowrap uppercase tracking-wider"
                >
                  {link.label}
                </motion.a>
              ))}
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
