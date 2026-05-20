import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Music, Theater, Camera, Palette, Ticket, MapPin } from "lucide-react"

export default function KulturaIRozrywkaPage() {
  const categories = [
    { name: "GOK Wręczyca Wielka", icon: <Theater />, desc: "Gminny Ośrodek Kultury - centrum wydarzeń." },
    { name: "Biblioteki", icon: <Music />, desc: "Gminna Biblioteka Publiczna i filie." },
    { name: "Zespoły Ludowe", icon: <Palette />, desc: "Pielęgnowanie lokalnej tradycji i folkloru." },
  ]

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-[94rem] px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">Kultura i Rozrywka</h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">Odkryj bogactwo kulturalne naszej gminy. Od koncertów po warsztaty tradycyjnego rzemiosła.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col p-8 rounded-3xl bg-white border border-border shadow-sm hover:shadow-lg transition-all hover:border-[#d97706]/30">
              <div className="h-12 w-12 rounded-2xl bg-[#d97706]/10 text-[#d97706] flex items-center justify-center mb-6">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{cat.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-foreground">Polecane wydarzenia</h2>
            <button className="text-[#d97706] font-bold text-sm hover:underline">Zobacz kalendarz</button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Letnie Kino Plenerowe", date: "15 Czerwca, 21:00", loc: "Park przy GOK", img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600" },
              { title: "Warsztaty Ceramiczne", date: "20 Czerwca, 16:00", loc: "Pracownia GOK", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=600" },
            ].map((ev) => (
              <div key={ev.title} className="group relative overflow-hidden rounded-3xl bg-card border border-border flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 aspect-video sm:aspect-square overflow-hidden">
                  <img src={ev.img} alt={ev.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#d97706] mb-2">
                    <Ticket className="h-3 w-3" />
                    Wstęp wolny
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{ev.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2 italic">{ev.date}</p>
                    <p className="flex items-center gap-2"><MapPin className="h-3 w-3" /> {ev.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA with background photo */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074')" }}
          />
          {/* Orange gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#d97706]/95 via-[#b45309]/88 to-[#78350f]/80" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 p-10 md:p-16 text-white">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Chcesz zostać mecenasem kultury?</h2>
              <p className="text-amber-50/80 mb-10 text-lg max-w-lg leading-relaxed">Wspieraj lokalnych artystów i inicjatywy kulturalne w naszej gminie. Dowiedz się jak możesz pomóc.</p>
              <button className="rounded-2xl bg-white text-[#d97706] px-8 py-4 font-bold hover:bg-amber-50 transition-all shadow-lg">Zostań Partnerem</button>
            </div>
            <div className="flex-1 flex justify-center z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 w-24 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg"><Music /></div>
                <div className="h-24 w-24 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg mt-6"><Camera /></div>
                <div className="h-24 w-24 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg -mt-6"><Palette /></div>
                <div className="h-24 w-24 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg"><Ticket /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
