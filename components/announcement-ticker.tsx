"use client"

import { AlertTriangle, Megaphone, Info, Bell, Calendar } from "lucide-react"

const announcements = [
  {
    icon: AlertTriangle,
    text: "Ostrzeżenie meteorologiczne: silny wiatr w nocy z 16 na 17 maja — zachowaj ostrożność.",
    tone: "warn",
  },
  {
    icon: Megaphone,
    text: "Przerwa w dostawie wody 18 maja w sołectwie Truskolasy w godz. 9:00–13:00.",
    tone: "info",
  },
  {
    icon: Calendar,
    text: "Sesja Rady Gminy — 22 maja, godz. 10:00, sala konferencyjna UG.",
    tone: "info",
  },
  {
    icon: Bell,
    text: "Trwa nabór wniosków o dofinansowanie wymiany pieców — termin do 30 czerwca.",
    tone: "info",
  },
  {
    icon: Info,
    text: "Nowa aplikacja BLISKO — odbieraj powiadomienia z gminy na telefon.",
    tone: "info",
  },
]

export function AnnouncementTicker() {
  const items = [...announcements, ...announcements]

  return (
    <div className="relative w-full overflow-hidden border-b border-border bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2">
        <div className="flex shrink-0 items-center gap-2 rounded-full bg-destructive px-3 py-1 text-xs font-bold uppercase tracking-wider text-destructive-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-background opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-background" />
          </span>
          Ważne
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-foreground to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-foreground to-transparent" />

          <div className="flex animate-marquee gap-12 whitespace-nowrap">
            {items.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex shrink-0 items-center gap-2 text-sm">
                  <Icon
                    className={`h-4 w-4 ${
                      item.tone === "warn" ? "text-chart-3" : "text-chart-1"
                    }`}
                  />
                  <span className="text-background/90">{item.text}</span>
                  <span className="text-background/30">•</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
