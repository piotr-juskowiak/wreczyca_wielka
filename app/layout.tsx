import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
    <html lang="pl" className={`${figtree.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
