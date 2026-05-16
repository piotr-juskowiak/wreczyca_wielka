import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Image as ImageIcon, Search } from "lucide-react"

export default function GaleriaPage() {
  const albums = [
    { title: "Dni Wręczycy 2024", count: 42, date: "Czerwiec 2024", image: "/placeholder.jpg" },
    { title: "Dożynki Gminne", count: 28, date: "Sierpień 2023", image: "/placeholder.jpg" },
    { title: "Zima w Gminie", count: 15, date: "Styczeń 2024", image: "/placeholder.jpg" },
    { title: "Inwestycje drogowe", count: 12, date: "Maj 2024", image: "/placeholder.jpg" },
    { title: "Koncert Noworoczny", count: 34, date: "Styczeń 2024", image: "/placeholder.jpg" },
    { title: "Sportowa Sobota", count: 21, date: "Kwiecień 2024", image: "/placeholder.jpg" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Galeria zdjęć</h1>
            <p className="mt-4 text-lg text-muted-foreground">Najważniejsze wydarzenia z życia gminy w obiektywie.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Szukaj albumu..." 
                className="pl-10 pr-4 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <div key={album.title} className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary shadow-sm transition-all hover:shadow-xl">
                <img src={album.image} alt={album.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white/90 text-xs font-medium mb-1">
                    <ImageIcon className="h-3 w-3" />
                    {album.count} zdjęć
                  </div>
                  <h3 className="text-lg font-bold text-white">{album.title}</h3>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{album.date}</p>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
