import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Mail, BarChart3, Target, MousePointer2, Megaphone } from "lucide-react"

export default function ReklamaPage() {
  const benefits = [
    { 
      title: "Lokalny zasięg", 
      desc: "Docieramy bezpośrednio do mieszkańców Wręczycy Wielkiej i okolic.",
      icon: <Target className="h-6 w-6" />
    },
    { 
      title: "Wysoka klikalność", 
      desc: "Nasze formaty reklamowe są zintegrowane z treścią serwisu.",
      icon: <MousePointer2 className="h-6 w-6" />
    },
    { 
      title: "Statystyki", 
      desc: "Zapewniamy pełny wgląd w statystyki wyświetleń i kliknięć.",
      icon: <BarChart3 className="h-6 w-6" />
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Reklama w serwisie
          </h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
            WreczycaWielka.pl to najszybciej rozwijający się portal informacyjny w regionie. Skorzystaj z naszej platformy, aby dotrzeć do swoich klientów.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {benefits.map((b) => (
            <div key={b.title} className="p-8 rounded-3xl bg-white border border-border shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                {b.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-[#1d4ed8] p-10 md:p-16 text-white text-center">
          <div className="relative z-10">
            <Megaphone className="h-16 w-16 mx-auto mb-8 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Zainteresowany współpracą?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Jeżeli są Państwo zainteresowani umieszczeniem swojej reklamy w naszym serwisie prosimy o kontakt mailowy. Przygotujemy ofertę dopasowaną do Twoich potrzeb.
            </p>
            <a 
              href="mailto:r@gminablachownia.pl" 
              className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-white/90 transition-all active:scale-95"
            >
              <Mail className="h-5 w-5" />
              r@gminablachownia.pl
            </a>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
