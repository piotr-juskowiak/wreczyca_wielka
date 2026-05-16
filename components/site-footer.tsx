"use client"

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Youtube,
  Instagram,
  Shield,
  ArrowRight,
} from "lucide-react"
import { motion } from "framer-motion"

const columns = [
  {
    title: "Urząd",
    links: [
      { label: "Wójt Gminy", href: "#" },
      { label: "Rada Gminy", href: "#" },
      { label: "Referaty i wydziały", href: "#" },
      { label: "Zamówienia publiczne", href: "#" },
      { label: "Praca w urzędzie", href: "#" },
    ],
  },
  {
    title: "Mieszkaniec",
    links: [
      { label: "E-Urząd", href: "#" },
      { label: "Podatki i opłaty", href: "#" },
      { label: "Gospodarka odpadami", href: "#" },
      { label: "Druki i formularze", href: "#" },
      { label: "Świadczenia rodzinne", href: "#" },
    ],
  },
  {
    title: "Gmina",
    links: [
      { label: "Sołectwa", href: "#" },
      { label: "Turystyka", href: "#" },
      { label: "Kultura i sport", href: "#" },
      { label: "Inwestycje", href: "#" },
      { label: "Galeria", href: "#" },
    ],
  },
]

const socials = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "YouTube", href: "#", icon: Youtube },
  { label: "Instagram", href: "#", icon: Instagram },
]

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-white">
      {/* Newsletter band */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-[#1d4ed8] px-8 py-10 md:px-12 md:py-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white text-balance">
                Bądź na bieżąco z życiem gminy
              </h3>
              <p className="mt-2 text-sm md:text-base text-white/85 leading-relaxed">
                Zapisz się do newslettera i otrzymuj informacje o wydarzeniach, inwestycjach
                i ogłoszeniach prosto na swój e-mail.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full md:w-auto flex-col sm:flex-row gap-3 sm:items-center"
            >
              <label htmlFor="newsletter" className="sr-only">
                Twój adres e-mail
              </label>
              <input
                id="newsletter"
                type="email"
                required
                placeholder="twoj@email.pl"
                className="h-12 w-full sm:w-72 rounded-xl bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-2 ring-transparent focus:ring-white/70"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-primary shadow-sm"
              >
                Zapisz się
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#1d4ed8] shadow-md">
                <Shield className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <p className="text-base font-bold text-foreground">Wręczyca Wielka</p>
                <p className="text-xs text-muted-foreground">Gmina · Portal Mieszkańca</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-md">
              Oficjalny portal Gminy Wręczyca Wielka. Bądź na bieżąco z aktualnościami,
              korzystaj z e-usług i poznawaj naszą okolicę.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-foreground/85">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-primary shrink-0">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="leading-relaxed">
                  ul. Sienkiewicza 1<br />
                  42-130 Wręczyca Wielka
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                  <Phone className="h-4 w-4" />
                </span>
                <a href="tel:+48343170245" className="hover:text-primary transition-colors">
                  +48 34 317 02 45
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700 shrink-0">
                  <Mail className="h-4 w-4" />
                </span>
                <a
                  href="mailto:urzad@wreczyca-wielka.pl"
                  className="hover:text-primary transition-colors"
                >
                  urzad@wreczyca-wielka.pl
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 text-rose-700 shrink-0">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="leading-relaxed">
                  <div>Pon: 8:00 – 16:00</div>
                  <div>Wt–Pt: 7:30 – 15:30</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-sm font-bold text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social + emergency */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-foreground mb-4">Obserwuj nas</h4>
            <div className="flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground/80 transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                )
              })}
            </div>

            <div className="mt-6 rounded-2xl bg-rose-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-rose-700">
                Telefon alarmowy
              </p>
              <a
                href="tel:112"
                className="mt-1 block text-2xl font-bold text-rose-700 hover:text-rose-800"
              >
                112
              </a>
              <p className="mt-1 text-xs text-rose-700/80">Numer alarmowy całodobowy</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Urząd Gminy Wręczyca Wielka. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Polityka prywatności</a>
            <a href="#" className="hover:text-foreground">Deklaracja dostępności</a>
            <a href="#" className="hover:text-foreground">RODO</a>
            <a href="#" className="hover:text-foreground">Mapa strony</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
