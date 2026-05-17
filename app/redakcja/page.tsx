import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Mail, ShieldCheck, Building2, UserCircle } from "lucide-react"

export default function RedakcjaPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Redakcja
          </h1>
          <div className="mt-6 flex items-center justify-center gap-2 text-primary font-semibold">
            <ShieldCheck className="h-5 w-5" />
            <span>WreczycaWielka.pl</span>
          </div>
          <p className="mt-4 text-muted-foreground italic">
            Tytuł prasowy zarejestrowany w Sądzie Okręgowym w Częstochowie pod nr 840.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Publisher Card */}
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-border/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1efe2] text-primary mb-6">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Wydawca</h2>
            <p className="text-2xl font-bold text-foreground">PGMOBILE Sp. z o.o.</p>
          </div>

          {/* Editor Card */}
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-border/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-6">
              <UserCircle className="h-6 w-6" />
            </div>
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Redaktor Naczelny</h2>
            <p className="text-2xl font-bold text-foreground mb-4">Paweł Gąsiorski</p>
            <a 
              href="mailto:r@gminablachownia.pl" 
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              <Mail className="h-4 w-4" />
              r@gminablachownia.pl
            </a>
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-secondary/30 p-10 border border-border/30 text-center">
          <h3 className="text-lg font-bold text-foreground mb-4">Misja portalu</h3>
          <p className="text-muted-foreground leading-relaxed">
            Nasz portal powstał z myślą o mieszkańcach gminy Wręczyca Wielka. Staramy się dostarczać rzetelne i sprawdzone informacje, promując jednocześnie lokalną kulturę, sport oraz inicjatywy społeczne. Jesteśmy niezależnym medium, które stawia na transparentność i bliskość z czytelnikiem.
          </p>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
