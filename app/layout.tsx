import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { PagePreloader } from '@/components/page-preloader'
import { ScrollToTop } from '@/components/scroll-to-top'
import { CookieBanner } from '@/components/cookie-banner'

import './globals.css'

const figtree = Figtree({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-figtree',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gmina Wręczyca Wielka — Portal Mieszkańca',
  description:
    'Oficjalny portal informacyjny Gminy Wręczyca Wielka. Aktualności, e-usługi, ogłoszenia i serwis dla mieszkańców.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className={`${figtree.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <PagePreloader />
        {children}
        <ScrollToTop />
        <CookieBanner />

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
