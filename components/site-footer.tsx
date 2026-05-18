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
  ExternalLink,
  Megaphone,
} from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

const columns = [
  {
    title: "Na skróty",
    links: [
      { label: "Sport lokalny", href: "/sport" },
      { label: "Kultura i rozrywka", href: "/kultura-i-rozrywka" },
      { label: "Aktualności", href: "/aktualnosci" },
      { label: "Sołectwa", href: "/solectwa" },
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
  return (
    <footer className="mt-20 border-t border-border/40 bg-stone-50/50">
      {/* Advertising Placeholder Card following the exact scheme of the sidebar ad */}
      <div className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8">
        <div className="relative -translate-y-12 overflow-hidden rounded-[2.5rem] border border-dashed border-stone-300/80 bg-stone-100/30 hover:bg-stone-100/50 backdrop-blur-md p-8 md:p-12 shadow-sm transition-all duration-500 text-center group">
          {/* Subtle decorative grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Elegant Gray Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-stone-200 shadow-sm text-stone-400 mb-4 group-hover:scale-105 transition-transform duration-300">
              <Megaphone className="h-5.5 w-5.5 text-stone-400/80" strokeWidth={1.8} />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-slate-800 uppercase tracking-wider mb-2">
              Miejsce na Twoją reklamę
            </h3>
            
            <p className="text-xs md:text-sm text-stone-500 font-normal max-w-xl leading-relaxed mb-6">
              Dotrzyj z ofertą do tysięcy unikalnych użytkowników każdego dnia. Promuj swój lokalny biznes w sercu naszej społeczności.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4.5 w-full">
              <button
                onClick={() => {
                  toast.info("Biuro Ogłoszeń i Reklam", {
                    description: "Napisz na e-mail: kontakt@wreczycawielka.pl lub zadzwoń pod nr tel. (34) 317 01 10 w celu ustalenia szczegółów.",
                    duration: 6000,
                    icon: <Megaphone className="h-4 w-4 text-primary" />
                  })
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-slate-900 border border-stone-200 hover:border-slate-900 text-stone-600 hover:text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Skontaktuj się</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <a 
                href="mailto:kontakt@wreczycawielka.pl"
                className="text-stone-500 hover:text-primary text-xs font-semibold uppercase tracking-widest transition-colors whitespace-nowrap font-normal"
              >
                kontakt@wreczycawielka.pl
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8 pb-12 pt-4">
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
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed font-normal">
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
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group font-normal"
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
            <ul className="space-y-4 text-sm font-normal">
              <li className="flex gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:kontakt@wreczycawielka.pl" className="text-muted-foreground hover:text-primary break-all text-[13px]">
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
            <p className="text-xs text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto font-normal">
              <span className="font-bold text-foreground/80">Ważna informacja:</span> Portal <span className="font-semibold text-primary">WreczycaWielka.pl</span> ma charakter informacyjny i jest prywatną inicjatywą nie związaną w żaden sposób z Urzędem Gminy Wręczyca Wielka. Dostarczamy Państwu najświeższych informacji i wiadomości związanych z gminą Wręczyca Wielka oraz działalnością organów gminnych.
            </p>
            <div className="mt-4 text-center">
              <span className="text-[10px] text-muted-foreground/60 font-normal">Redaktor Naczelny: Paweł Gąsiorski | Kontakt: kontakt@wreczycawielka.pl</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs text-muted-foreground font-normal">
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
