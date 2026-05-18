"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("wreczyca_cookie_consent")
    if (!consent) {
      // Delay appearance slightly for premium entry experience
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("wreczyca_cookie_consent", "accepted")
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem("wreczyca_cookie_consent", "declined")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="fixed bottom-6 left-6 z-40 w-[calc(100vw-3rem)] sm:w-[360px] rounded-[1.75rem] border border-stone-200/80 bg-white/95 backdrop-blur-md p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] select-none pointer-events-auto"
        >
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
                <Cookie className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">
                  Polityka Cookies
                </h3>
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">
                  Dbamy o Twoją prywatność
                </span>
              </div>
            </div>
            <button
              onClick={declineCookies}
              className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-slate-100 text-stone-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Zamknij"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Description */}
          <p className="mt-3.5 text-[11px] text-slate-500 font-medium leading-relaxed">
            Nasz portal używa plików cookies, aby zapewnić najwyższą jakość usług, personalizację treści oraz zbieranie anonimowych statystyk. Klikając „Akceptuję”, wyrażasz zgodę na ich zapisywanie w pamięci przeglądarki.
          </p>

          {/* Action buttons */}
          <div className="mt-4 flex items-center justify-end gap-2.5">
            <button
              onClick={declineCookies}
              className="px-3.5 py-2 text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              Odrzuć
            </button>
            <button
              onClick={acceptCookies}
              className="rounded-xl bg-[#00933f] hover:bg-[#007f36] text-white px-4 py-2 text-[9px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm shadow-[#00933f]/10 cursor-pointer active:scale-95"
            >
              Akceptuję
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
