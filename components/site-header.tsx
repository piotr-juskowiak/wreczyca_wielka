"use client"

import { motion } from "framer-motion"
import { Search, Menu, Shield } from "lucide-react"
import { useState } from "react"
import { SearchDialog } from "@/components/search-dialog"
import { AnnouncementTicker } from "@/components/announcement-ticker"

const navLinks = [
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Urząd", href: "#urzad" },
  { label: "Mieszkaniec", href: "#mieszkaniec" },
  { label: "Turystyka", href: "#turystyka" },
  { label: "Kontakt", href: "/kontakt" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <AnnouncementTicker />
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#1d4ed8] shadow-md transition-transform group-hover:scale-105">
                <Shield className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-foreground">
                  Wręczyca Wielka
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  Gmina · Portal Mieszkańca
                </span>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                aria-label="Szukaj"
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex h-11 items-center gap-2 rounded-xl border border-border/70 bg-secondary/60 px-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Search className="h-4 w-4" />
                <span className="hidden md:inline">Szukaj...</span>
                <kbd className="hidden md:inline-flex items-center rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground shadow-sm">
                  /
                </kbd>
              </button>

              <button
                aria-label="Szukaj"
                onClick={() => setSearchOpen(true)}
                className="sm:hidden flex h-11 w-11 items-center justify-center rounded-xl text-foreground/70 hover:bg-secondary"
              >
                <Search className="h-5 w-5" />
              </button>

              <motion.a
                href="#bip"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#dc2626] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-white/90" />
                BIP
              </motion.a>

              <button
                aria-label="Menu"
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl text-foreground/70 hover:bg-secondary"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden pb-4 flex flex-col gap-1"
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
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
