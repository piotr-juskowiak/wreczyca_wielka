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
  CheckCircle2,
  ExternalLink,
} from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const columns = [
  {
    title: "Na skróty",
    links: [
      { label: "Galeria zdjęć", href: "/galeria" },
      { label: "Sport lokalny", href: "/sport" },
      { label: "Kultura i rozrywka", href: "/kultura-i-rozrywka" },
      { label: "Aktualności", href: "/aktualnosci" },
    ],
  },
  {
    title: "Mieszkaniec",
    links: [
      { label: "Harmonogram odpadów", href: "#" },
      { label: "E-Urząd (BIP)", href: "#" },
      { label: "Podatki i opłaty", href: "#" },
      { label: "Druki do pobrania", href: "#" },
      { label: "Dyżury aptek", href: "#" },
    ],
  },
  {
    title: "Współpraca",
    links: [
      { label: "Gmina Krzepice", href: "#" },
      { label: "Gmina Miedźno", href: "#" },
      { label: "Lipie", href: "#" },
      { label: "Myszków", href: "#" },
      { label: "Portal klobuck.pl", href: "#" },
    ],
  },
]

const socials = [
  { label: "Facebook", href: "#", icon: Facebook, color: "hover:bg-[#1877F2]" },
  { label: "YouTube", href: "#", icon: Youtube, color: "hover:bg-[#FF0000]" },
  { label: "Instagram", href: "#", icon: Instagram, color: "hover:bg-[#E4405F]" },
]

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="mt-20 border-t border-border/40 bg-stone-50/50">
      {/* Newsletter Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -translate-y-12 overflow-hidden rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-[#0f172a]/10 flex items-center bg-[#414833]">
          {/* Subtle Background Texture */}
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src="/newsletter-bg.jpg" 
              alt="Wręczyca Wielka" 
              className="h-full w-full object-cover mix-blend-overlay grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#414833] via-[#414833]/80 to-transparent" />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                Zapisz się do <span className="text-municipal-gold font-extrabold">newslettera</span>
              </h3>
              <p className="text-sm text-[#cbd5e1]/80 max-w-md mx-auto lg:mx-0">
                Najważniejsze informacje i alerty gminne prosto na Twój e-mail.
              </p>
            </div>

            <div className="lg:w-1/2 w-full max-w-md">
              {!subscribed ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubscribed(true)
                  }}
                  className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10"
                >
                  <input
                    type="email"
                    required
                    placeholder="Twój adres e-mail"
                    className="h-12 flex-1 rounded-xl bg-white/90 px-4 text-sm text-[#0f172a] placeholder:text-muted-foreground outline-none transition-all focus:bg-white"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="h-12 px-6 rounded-xl bg-municipal-gold text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-digital-blue hover:text-white transition-all whitespace-nowrap"
                  >
                    Zapisz się
                  </motion.button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
                >
                  <div className="h-10 w-10 rounded-full bg-municipal-gold text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dziękujemy!</h4>
                    <p className="text-xs text-[#cbd5e1]/70">Potwierdź subskrypcję na swoim e-mailu.</p>
                  </div>
                </motion.div>
              )}
              <div className="mt-3 flex items-center gap-2 px-2">
                <CheckCircle2 className="h-3 w-3 text-municipal-gold/80" />
                <p className="text-[10px] text-[#cbd5e1]/50 uppercase tracking-widest font-bold">
                  Akceptujesz politykę prywatności i RODO.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand + info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm border border-border/50 overflow-hidden">
                <img src="/logo-new.png" alt="Wręczyca Wielka" className="h-9 w-9 object-contain" />
              </div>
              <div className="leading-tight">
                <p className="text-base font-bold text-foreground">Wręczyca Wielka</p>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Niezależny przegląd gminny</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Twój codzienny punkt styku z życiem Wręczycy Wielkiej. Dostarczamy rzetelnych informacji, promujemy lokalne inicjatywy i wspieramy społeczność mieszkańców.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    whileHover={{ y: -4 }}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-border text-foreground/70 transition-all ${s.color} hover:text-white hover:border-transparent shadow-sm`}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-3.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                    >
                      {l.label}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact widget */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider">Kontakt</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:kontakt@wreczycawielka.pl" className="text-muted-foreground hover:text-primary break-all">
                  kontakt@wreczycawielka.pl
                </a>
              </li>
            </ul>
            
            <div className="mt-8 rounded-2xl bg-rose-50 p-5 border border-rose-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-rose-600 mb-1">
                Pogotowie / Alarm
              </p>
              <a href="tel:112" className="block text-2xl font-black text-rose-600">
                112
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Area */}
        <div className="mt-16 pt-8 border-t border-border/60">
          <div className="bg-stone-100/50 rounded-2xl p-6 md:p-8 mb-10">
            <p className="text-xs text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
              <span className="font-bold text-foreground/80">Ważna informacja:</span> Portal <span className="font-semibold text-primary">WreczycaWielka.pl</span> ma charakter informacyjny i jest prywatną inicjatywą nie związaną w żaden sposób z Urzędem Gminy Wręczyca Wielka. Dostarczamy Państwu najświeższych informacji i wiadomości związanych z gminą Wręczyca Wielka oraz działalnością organów gminnych.
            </p>
            <div className="mt-4 text-center">
              <span className="text-[10px] text-muted-foreground/60">Redaktor Naczelny: Paweł Gąsiorski | Kontakt: redakcja@wreczyca-wielka.pl</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} WreczycaWielka.pl. Wszelkie prawa zastrzeżone.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              <a href="/reklama" className="hover:text-primary transition-colors">Reklama</a>
              <span className="h-1 w-1 rounded-full bg-border" />
              <a href="/redakcja" className="hover:text-primary transition-colors">Redakcja</a>
              <span className="h-1 w-1 rounded-full bg-border" />
              <a href="/polityka-prywatnosci" className="hover:text-primary transition-colors">Polityka prywatności</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
