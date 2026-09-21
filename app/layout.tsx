import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Dramafy — Nonton Drama Asia Online',
    template: '%s | Dramafy',
  },
  description:
    'Platform streaming drama Asia terbaik. Nonton K-Drama, C-Drama, J-Drama terbaru dan terlengkap dengan kualitas HD secara gratis.',
  keywords: ['dramafy', 'nonton drama', 'k-drama', 'c-drama', 'j-drama', 'streaming drama asia'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Dramafy',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
