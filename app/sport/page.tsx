import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Trophy, Users, Calendar, ArrowRight, Target } from "lucide-react"

export default function SportPage() {
  const teams = [
    { name: "Sokół Wręczyca Wielka", league: "Klasa Okręgowa", icon: <Trophy className="h-6 w-6" /> },
    { name: "LKS płomień Borowe", league: "Klasa A", icon: <Target className="h-6 w-6" /> },
    { name: "Gmina Wręczyca Biega", league: "Grupa Biegowa", icon: <Users className="h-6 w-6" /> },
  ]

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-[94rem] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Sport w Gminie</h1>
          <p className="mt-4 text-lg text-muted-foreground">Kibicuj naszym sportowcom i bądź aktywny!</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {teams.map((team) => (
            <div key={team.name} className="group p-8 rounded-3xl bg-card border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary mb-6 transition-colors group-hover:bg-primary group-hover:text-white">
                {team.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{team.name}</h3>
              <p className="text-muted-foreground mb-6">{team.league}</p>
              <button className="flex items-center gap-2 text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                Zobacz tabelę i wyniki
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-secondary/50 p-8 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Nadchodzące wydarzenia
            </h2>
            <div className="space-y-4">
              {[
                { date: "18 Maj", time: "17:00", title: "Mecz: Sokół vs Victoria", loc: "Stadion Gminny" },
                { date: "22 Maj", time: "18:00", title: "Trening Otwarty Karate", loc: "Hala Sportowa" },
                { date: "1 Cze", time: "10:00", title: "Gminny Bieg Przełajowy", loc: "Park Gminny" },
              ].map((ev) => (
                <div key={ev.title} className="flex items-center gap-6 p-4 rounded-2xl bg-white shadow-sm border border-border/30">
                  <div className="flex flex-col items-center justify-center min-w-[60px] h-16 rounded-xl bg-primary text-white">
                    <span className="text-xs font-bold uppercase">{ev.date.split(" ")[1]}</span>
                    <span className="text-xl font-extrabold leading-none">{ev.date.split(" ")[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{ev.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{ev.time} • {ev.loc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-white">
            <div className="relative z-10 h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-4">Budujemy formę razem!</h2>
              <p className="text-primary-foreground/90 mb-8 max-w-sm">Sprawdź ofertę gminnych obiektów sportowych, boisk oraz hal dostępnych dla mieszkańców.</p>
              <div className="mt-auto">
                <button className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-sm hover:bg-white/90 transition-colors">
                  Mapa obiektów sportowych
                </button>
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 opacity-10 rotate-12">
              <Trophy size={240} />
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
