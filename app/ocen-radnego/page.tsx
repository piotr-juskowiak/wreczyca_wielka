import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Shield, Star, Users, MessageSquare } from "lucide-react"

export default function OcenRadnegoPage() {
  const councilors = [
    { name: "Jan Kowalski", district: "Okręg 1", image: "/placeholder-user.jpg" },
    { name: "Anna Nowak", district: "Okręg 2", image: "/placeholder-user.jpg" },
    { name: "Piotr Wiśniewski", district: "Okręg 3", image: "/placeholder-user.jpg" },
    { name: "Maria Dąbrowska", district: "Okręg 4", image: "/placeholder-user.jpg" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Oceń swojego radnego</h1>
          <p className="mt-4 text-lg text-muted-foreground">Twoja opinia ma znaczenie dla rozwoju naszej gminy.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {councilors.map((c) => (
            <div key={c.name} className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm transition-all hover:shadow-md border border-border/50">
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full bg-secondary mb-4 ring-2 ring-primary/10">
                  <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{c.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{c.district}</p>
                
                <div className="flex items-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={`h-5 w-5 ${i <= 4 ? "fill-yellow-400 text-yellow-400" : "text-border"}`} />
                  ))}
                </div>

                <button className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90">
                  Wystaw ocenę
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-secondary/50 p-8 md:p-12 border border-border/50">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-bold text-foreground">Transparentność</h4>
              <p className="text-sm text-muted-foreground mt-2">Wgląd w działania i decyzje podejmowane przez radnych.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-bold text-foreground">Bezpośredni kontakt</h4>
              <p className="text-sm text-muted-foreground mt-2">Możliwość przesyłania uwag i sugestii bezpośrednio do radnego.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-bold text-foreground">Wpływ na gminę</h4>
              <p className="text-sm text-muted-foreground mt-2">Twoje oceny wpływają na priorytety inwestycyjne w okręgu.</p>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
