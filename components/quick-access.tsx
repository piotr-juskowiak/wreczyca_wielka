"use client"

import { motion } from "framer-motion"
import {
  Building2,
  Trash2,
  Phone,
  Calendar,
} from "lucide-react"

const services = [
  {
    label: "E-Urząd",
    icon: Building2,
    bg: "bg-digital-blue-light/60",
    fg: "text-digital-blue",
    accent: "text-digital-blue/80",
  },
  {
    label: "Odpady",
    icon: Trash2,
    bg: "bg-vibrant-emerald-light/60",
    fg: "text-primary",
    accent: "text-primary/80",
  },
  {
    label: "Kontakt",
    icon: Phone,
    bg: "bg-municipal-gold-light/60",
    fg: "text-municipal-gold",
    accent: "text-municipal-gold/80",
  },
  {
    label: "Wydarzenia",
    icon: Calendar,
    bg: "bg-digital-blue-light/60",
    fg: "text-digital-blue",
    accent: "text-digital-blue/80",
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
    <section aria-labelledby="quick-access" className="bg-slate-50/80 border-y border-slate-200/60 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 p-24 opacity-[0.02] pointer-events-none text-[#0f172a]">
        <Building2 className="h-96 w-96 -mr-48 -mt-48 rotate-12" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 relative z-20">
        <h2 id="quick-access" className="sr-only">
          Szybki dostęp
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.button
                key={service.label}
                variants={item}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center gap-5 rounded-[2.5rem] bg-white p-6 shadow-xl shadow-[#0f172a]/2 border border-slate-100 transition-all hover:border-primary/20 hover:shadow-2xl text-left overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 opacity-[0.01] group-hover:opacity-[0.04] transition-opacity duration-500">
                  <Icon className="h-24 w-24" />
                </div>
                
                <div className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl shadow-sm transition-all duration-500 ${service.bg} ${service.fg}`}>
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                  <div className="absolute inset-0 rounded-3xl bg-current opacity-0 group-hover:opacity-10 transition-opacity" />
                </div>

                <div className="flex flex-col flex-1">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${service.accent}`}>
                    Usługa
                  </span>
                  <span className="text-base font-black text-[#0f172a] leading-none">
                    {service.label}
                  </span>
                </div>
                
                <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 group-hover:text-primary group-hover:bg-primary-light/10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  <Icon className="h-4 w-4" />
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
