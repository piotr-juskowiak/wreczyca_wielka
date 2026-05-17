"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Building2, AlertTriangle, Send } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"


const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 18 } },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

export default function KontaktPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-white to-secondary/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Kontakt
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-light text-foreground text-balance leading-tight">
                Skontaktuj się z Urzędem Gminy
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
                Jesteśmy do Twojej dyspozycji. Sprawdź dane kontaktowe, godziny urzędowania oraz wykaz
                referatów lub napisz do nas bezpośrednio przez formularz.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              {
                icon: MapPin,
                title: "Adres",
                lines: ["ul. Sienkiewicza 1", "42-130 Wręczyca Wielka"],
                color: "bg-blue-100 text-blue-700",
              },
              {
                icon: Phone,
                title: "Telefon",
                lines: ["tel.: +48 343 170 245", "fax.: +48 343 170 215"],
                color: "bg-emerald-100 text-emerald-700",
              },
              {
                icon: Mail,
                title: "E-mail",
                lines: ["ug@wreczyca-wielka.pl"],
                color: "bg-amber-100 text-amber-700",
              },
              {
                icon: Clock,
                title: "Godziny urzędowania",
                lines: ["Pon: 8:00 – 16:00", "Wt–Pt: 7:30 – 15:30"],
                color: "bg-rose-100 text-rose-700",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={item}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${card.color}`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-muted-foreground">{card.title}</h3>
                <div className="mt-1 space-y-0.5">
                  {card.lines.map((line) => (
                    <p key={line} className="text-base font-medium text-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="aspect-[16/10] w-full bg-secondary">
                <iframe
                  title="Mapa - Urząd Gminy Wręczyca Wielka"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=18.876%2C50.872%2C18.926%2C50.902&layer=mapnik&marker=50.887%2C18.901"
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Urząd Gminy Wręczyca Wielka</p>
                    <p className="text-xs text-muted-foreground">ul. Sienkiewicza 1, 42-130 Wręczyca Wielka</p>
                  </div>
                </div>
                <a
                  href="https://www.openstreetmap.org/?mlat=50.887&mlon=18.901#map=15/50.887/18.901"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80"
                >
                  Otwórz w mapach
                </a>
              </div>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="lg:col-span-2 rounded-2xl bg-white p-6 sm:p-8 shadow-sm flex flex-col"
            >
              <h2 className="text-xl font-bold text-foreground">Napisz do nas</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Odpowiadamy najpóźniej w ciągu 2 dni roboczych.
              </p>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Imię i nazwisko
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="h-11 rounded-xl bg-secondary/60 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Jan Kowalski"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="h-11 rounded-xl bg-secondary/60 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="jan@example.com"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="msg" className="text-sm font-medium text-foreground">
                    Wiadomość
                  </label>
                  <textarea
                    id="msg"
                    rows={5}
                    className="rounded-xl bg-secondary/60 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="W czym możemy pomóc?"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm hover:shadow-md"
                >
                  <Send className="h-4 w-4" />
                  Wyślij wiadomość
                </motion.button>
              </div>
            </form>
          </div>
        </section>


        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">Sytuacja zagrażająca życiu lub zdrowiu</p>
                <p className="text-2xl font-bold">Numer alarmowy: 112</p>
              </div>
            </div>
            <a
              href="tel:112"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-red-700 shadow-sm hover:shadow-md"
            >
              <Phone className="h-4 w-4" />
              Zadzwoń teraz
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
