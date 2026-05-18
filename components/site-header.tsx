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
    { day: "Dziś", temp: "18°C", icon: <Sun className="h-4 w-4 text-[#208fcf]" />, desc: "Słonecznie" },
    { day: "Jutro", temp: "21°C", icon: <Sun className="h-4 w-4 text-[#208fcf]" />, desc: "Słonecznie" },
    { day: "Środa", temp: "22°C", icon: <CloudSun className="h-4 w-4 text-[#208fcf]" />, desc: "Zachmurzenie" },
    { day: "Czwartek", temp: "17°C", icon: <CloudRain className="h-4 w-4 text-[#208fcf]" />, desc: "Przelotny deszcz" }
  ]

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[rgba(32,143,207,0.04)] border border-[#208fcf]/20 text-xs font-semibold text-slate-700 hover:bg-[rgba(32,143,207,0.08)] hover:border-[#208fcf]/40 transition-all active:scale-95 cursor-pointer"
      >
        <Sun className="h-4 w-4 text-[#208fcf] animate-spin-slow" />
        <span>18°C</span>
        <span className="text-slate-400 font-normal">Wręczyca</span>
        <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-100 bg-white/95 backdrop-blur-md p-4 shadow-xl z-50 pointer-events-auto"
          >
            <div className="border-b border-slate-100 pb-2.5 mb-2.5 text-left">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#208fcf]">
                Pogoda Wręczyca Wielka
              </h4>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Prognoza 4-dniowa</p>
            </div>

            <div className="space-y-2">
              {forecast.map((w, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0 last:pb-0 text-left">
                  <span className="text-xs font-bold text-slate-700 w-16">{w.day}</span>
                  <div className="flex items-center gap-2 flex-1 justify-start">
                    {w.icon}
                    <span className="text-[10px] font-medium text-slate-400 truncate max-w-[90px]">{w.desc}</span>
                  </div>
                  <span className="text-xs font-black text-[#208fcf]">{w.temp}</span>
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
  { label: "Sołectwa", href: "/solectwa" },
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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
      >
        <div className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8">
          {/* Top Row: Brand + Search + Actions */}
          <div className="flex h-20 items-center justify-between gap-8">
            <motion.a
              href="/"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 group shrink-0"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-[#208fcf]/20 transition-transform group-hover:scale-105 overflow-hidden ring-4 ring-blue-50/50">
                <img src="/logo-new.png" alt="Wręczyca Wielka" className="h-10 w-10 object-contain" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-medium text-slate-800 whitespace-nowrap tracking-tight">
                  Wręczyca Wielka
                </span>
                <span className="text-[10px] font-bold text-[#208fcf] uppercase tracking-wider">
                  Niezależny przegląd gminny
                </span>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <button
                aria-label="Szukaj"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-2.5 py-1.5 md:px-3 rounded-xl bg-[rgba(32,143,207,0.04)] border border-[#208fcf]/20 text-xs font-semibold text-slate-700 hover:bg-[rgba(32,143,207,0.08)] hover:border-[#208fcf]/40 transition-all active:scale-95 cursor-pointer"
              >
                <Search className="h-3.5 w-3.5 text-[#208fcf]" />
                <span className="hidden md:inline font-semibold text-slate-700">Szukaj...</span>
                <kbd className="hidden lg:inline-flex items-center rounded-lg bg-white px-1.5 py-0.5 text-[9px] font-bold text-slate-400 shadow-sm border border-slate-200 ml-1">
                  ⌘K
                </kbd>
              </button>

              <WeatherWidget />

              <button
                aria-label="Menu"
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 hover:bg-[rgba(32,143,207,0.06)] hover:text-[rgb(32,143,207)] transition-all cursor-pointer"
              >
                <Menu className="h-6 w-6" />
              </button>
            </motion.div>
          </div>

          {/* Bottom Row: Navigation */}
          <div className="hidden lg:flex h-12 items-center justify-center border-t border-b border-[#208fcf]/10 bg-[rgba(32,143,207,0.045)] -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <nav className="flex items-center gap-1 relative">
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
                        ? 'text-white'
                        : 'text-slate-600 hover:text-[rgb(32,143,207)]'
                      }
                    `}
                  >
                    {link.label}

                    {/* Sliding Hover background pill */}
                    {hoveredIdx === idx && !isActive && (
                      <motion.div
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-white border border-[#208fcf]/10 shadow-sm rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Active tab solid sky blue pill indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 bg-[rgb(32,143,207)] rounded-xl -z-10 shadow-sm shadow-[rgba(32,143,207,0.2)]"
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
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href))
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors
                        ${isActive
                          ? 'text-white bg-[rgb(32,143,207)] shadow-sm shadow-[rgba(32,143,207,0.15)]'
                          : 'text-slate-600 hover:text-[rgb(32,143,207)] hover:bg-[rgba(32,143,207,0.04)]'
                        }
                      `}
                    >
                      {link.label}
                    </a>
                  )
                })}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
