"use client"

import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Shield, Star, Users, MessageSquare } from "lucide-react"

export default function OcenRadnegoPage() {
  const councilors = [
    { 
      name: "Andrzej Nowak", 
      district: "Okręg 1: Wręczyca Wielka", 
      image: "/avatars/andrzej-nowak.png",
      role: "Przewodniczący Rady Gminy",
      rating: 4.8,
      votes: 124,
      committees: ["Finansów", "Rozwoju Gospodarczego"]
    },
    { 
      name: "Beata Wiśniewska", 
      district: "Okręg 2: Truskolasy", 
      image: "/avatars/beata-wisniewska.png",
      role: "Wiceprzewodnicząca Rady",
      rating: 4.9,
      votes: 89,
      committees: ["Oświaty", "Kultury i Sportu"]
    },
    { 
      name: "Zbigniew Zieliński", 
      district: "Okręg 3: Grodzisko", 
      image: "/avatars/andrzej-nowak.png", // Reuse for mock
      role: "Radny",
      rating: 4.5,
      votes: 56,
      committees: ["Rolnictwa", "Ochrony Środowiska"]
    },
    { 
      name: "Elżbieta Mazur", 
      district: "Okręg 4: Kalej", 
      image: "/avatars/beata-wisniewska.png", // Reuse for mock
      role: "Radna",
      rating: 4.7,
      votes: 72,
      committees: ["Zdrowia i Opieki Społecznej"]
    },
  ]

  return (
    <main className="min-h-screen bg-[#f1f3ef]">
      <SiteHeader />
      
      {/* Hero Section */}
      <div className="relative bg-[#3a5a40] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,#dad7cd_0%,transparent_50%)]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block rounded-full bg-white/10 text-emerald-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-white/10 backdrop-blur-md">
            Partycypacja Społeczna
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
            Oceń swojego <br />
            <span className="font-light text-[#a3b18a]">Radnego Gminy</span>
          </h1>
          <p className="mt-8 text-lg text-emerald-50/70 max-w-2xl mx-auto font-medium">
            Twoja opinia pomaga nam budować lepszą przyszłość dla Wręczycy Wielkiej. Oceń pracę radnych i wpływaj na lokalne decyzje.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 -mt-10">
        <div className="grid gap-8 md:grid-cols-2">
          {councilors.map((c) => (
            <motion.div 
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[3rem] bg-white p-8 shadow-2xl shadow-[#344e41]/5 border border-[#dad7cd]/30 flex flex-col sm:flex-row gap-8 items-center sm:items-start"
            >
              {/* Profile Side */}
              <div className="relative shrink-0">
                <div className="h-32 w-32 overflow-hidden rounded-[2rem] bg-[#dad7cd] shadow-inner ring-4 ring-[#a3b18a]/20 group-hover:ring-[#a3b18a]/40 transition-all duration-500">
                  <img src={c.image} alt={c.name} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                </div>
                <div className="absolute -bottom-3 -right-3 h-12 w-12 rounded-2xl bg-[#3a5a40] text-white flex flex-col items-center justify-center shadow-lg">
                  <span className="text-[10px] font-black leading-none">{c.rating}</span>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3].map(i => <Star key={i} className="h-1.5 w-1.5 fill-current" />)}
                  </div>
                </div>
              </div>

              {/* Info Side */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-black text-[#a3b18a] uppercase tracking-widest">{c.role}</span>
                    <h3 className="text-2xl font-black text-[#344e41] mt-1">{c.name}</h3>
                    <p className="text-sm font-bold text-[#588157]/60 mt-1">{c.district}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {c.committees.map(comm => (
                    <span key={comm} className="rounded-lg bg-[#f1f3ef] px-3 py-1.5 text-[10px] font-bold text-[#3a5a40] uppercase tracking-wider">
                      Komisja {comm}
                    </span>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#dad7cd]/40 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[#a3b18a] uppercase tracking-widest">Głosów</span>
                    <span className="text-lg font-black text-[#344e41]">{c.votes}</span>
                  </div>
                  <button className="rounded-2xl bg-[#3a5a40] px-8 py-3.5 text-xs font-black text-white uppercase tracking-widest shadow-xl shadow-[#3a5a40]/20 hover:bg-[#344e41] transition-all">
                    Wystaw ocenę
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Informational Cards */}
        <div className="mt-32 grid md:grid-cols-3 gap-12">
          {[
            { icon: Users, title: "Transparentność", desc: "Każdy głos jest publiczny i wpływa na ranking zaufania." },
            { icon: MessageSquare, title: "Dialog", desc: "Zostaw konstruktywny komentarz przy swojej ocenie." },
            { icon: Shield, title: "Wpływ", desc: "Rankingi pomagają w ocenie efektywności pracy rady." }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-[1.5rem] bg-white shadow-xl shadow-[#344e41]/5 flex items-center justify-center mb-6 text-[#3a5a40] border border-[#dad7cd]/20">
                <item.icon className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-black text-[#344e41] uppercase tracking-widest mb-3">{item.title}</h4>
              <p className="text-sm text-[#3a5a40]/60 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
