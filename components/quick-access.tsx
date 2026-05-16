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
    bg: "bg-[#a3b18a]/20",
    fg: "text-[#3a5a40]",
  },
  {
    label: "Odpady",
    icon: Trash2,
    bg: "bg-[#588157]/10",
    fg: "text-[#344e41]",
  },
  {
    label: "Kontakt",
    icon: Phone,
    bg: "bg-[#3a5a40]",
    fg: "text-white",
  },
  {
    label: "Wydarzenia",
    icon: Calendar,
    bg: "bg-[#dad7cd]/40",
    fg: "text-[#344e41]",
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
      >
        {services.map((service) => {
          const Icon = service.icon
          return (
            <motion.button
              key={service.label}
              variants={item}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col items-center justify-center gap-3 rounded-[2rem] bg-white p-6 shadow-sm border border-[#dad7cd]/40 transition-all hover:shadow-xl hover:shadow-[#3a5a40]/5 hover:border-[#a3b18a]/40 text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a3b18a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl shadow-sm transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110 ${service.bg} ${service.fg}`}>
                <Icon className="h-6 w-6" strokeWidth={1.8} />
                <div className="absolute inset-0 rounded-xl bg-current opacity-0 group-hover:opacity-5 transition-opacity" />
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xs font-black text-[#344e41] uppercase tracking-[0.12em]">
                  {service.label}
                </span>
                <div className="h-0.5 w-3 bg-[#a3b18a]/30 mt-2 rounded-full group-hover:w-6 transition-all duration-500" />
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </section>
  )
}
