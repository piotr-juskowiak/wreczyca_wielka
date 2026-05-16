"use client"

import { motion } from "framer-motion"
import {
  Building2,
  Trash2,
  Phone,
  FileText,
  CreditCard,
  Calendar,
  MapPin,
  HeartHandshake,
} from "lucide-react"

const services = [
  {
    label: "E-Urząd",
    icon: Building2,
    bg: "bg-blue-100",
    fg: "text-blue-600",
  },
  {
    label: "Odpady",
    icon: Trash2,
    bg: "bg-emerald-100",
    fg: "text-emerald-600",
  },
  {
    label: "Kontakt",
    icon: Phone,
    bg: "bg-amber-100",
    fg: "text-amber-600",
  },
  {
    label: "Formularze",
    icon: FileText,
    bg: "bg-rose-100",
    fg: "text-rose-600",
  },
  {
    label: "Podatki",
    icon: CreditCard,
    bg: "bg-sky-100",
    fg: "text-sky-600",
  },
  {
    label: "Wydarzenia",
    icon: Calendar,
    bg: "bg-orange-100",
    fg: "text-orange-600",
  },
  {
    label: "Sołectwa",
    icon: MapPin,
    bg: "bg-teal-100",
    fg: "text-teal-600",
  },
  {
    label: "Pomoc",
    icon: HeartHandshake,
    bg: "bg-pink-100",
    fg: "text-pink-600",
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
}

export function QuickAccess() {
  return (
    <section aria-labelledby="quick-access" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h2 id="quick-access" className="sr-only">
        Szybki dostęp
      </h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4"
      >
        {services.map((service) => {
          const Icon = service.icon
          return (
            <motion.button
              key={service.label}
              variants={item}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="group flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-xl"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full ${service.bg} ${service.fg}`}
              >
                <Icon className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-foreground text-center">
                {service.label}
              </span>
            </motion.button>
          )
        })}
      </motion.div>
    </section>
  )
}
