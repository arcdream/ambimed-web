import type { Metadata, Viewport } from 'next'
import { DM_Sans, Source_Serif_4 } from 'next/font/google'
import '@/index.css'
import '@/mobile.css'
import { getSupabaseEnv } from '@/lib/supabase-env'
import { Providers } from '@/providers/Providers'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Ambimed Healthcare | Home Care You Can Trust',
  description:
    'Ambimed: trusted home healthcare across India. Elder care, nurses, physio, mother & baby. Book online, transparent billing.',
}

export const viewport: Viewport = {
  themeColor: '#1D3D72',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabaseConfig = getSupabaseEnv()

  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${sourceSerif.variable}`}>
        <Providers supabaseConfig={supabaseConfig}>{children}</Providers>
      </body>
    </html>
  )
}
