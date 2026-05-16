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
    <section aria-labelledby="quick-access" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
      <h2 id="quick-access" className="sr-only">
        Szybki dostęp
      </h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {services.map((service) => {
          const Icon = service.icon
          return (
            <motion.button
              key={service.label}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-5 rounded-[2.5rem] bg-white/80 backdrop-blur-xl p-6 shadow-2xl shadow-[#344e41]/10 border border-white transition-all hover:border-[#a3b18a]/50 text-left overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
                <Icon className="h-24 w-24" />
              </div>
              
              <div className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl shadow-xl transition-all duration-500 group-hover:shadow-[#3a5a40]/20 ${service.bg} ${service.fg}`}>
                <Icon className="h-7 w-7" strokeWidth={1.5} />
                <div className="absolute inset-0 rounded-3xl bg-current opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>

              <div className="flex flex-col flex-1">
                <span className="text-[10px] font-black text-[#a3b18a] uppercase tracking-[0.2em] mb-1">
                  Usługa
                </span>
                <span className="text-base font-black text-[#344e41] leading-none">
                  {service.label}
                </span>
              </div>
              
              <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-[#f1f3ef] text-[#3a5a40] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                <Icon className="h-4 w-4" />
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </section>
  )
}
