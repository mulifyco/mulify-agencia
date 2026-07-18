import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import BottomNav from '@/components/remote/bottom-nav'
import SWRegister from '@/components/remote/sw-register'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: 'Mulify Remote',
  description: 'Site yönetim paneli',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Mulify' },
}

export const viewport: Viewport = {
  themeColor: '#F5A623',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  userScalable: false,
}

export default function RemoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="font-inter antialiased bg-[#0A0A0F] text-white overflow-hidden touch-manipulation">
        <noscript><img height="1" width="1" style={{ display: 'none' }}
        src="https://www.facebook.com/tr?id=4290380164439424&ev=PageView&noscript=1"
        /></noscript>
        <div className="flex flex-col h-dvh overflow-hidden">
          <main className="flex-1 overflow-hidden relative">{children}</main>
          <BottomNav />
        </div>
        <Toaster theme="dark" position="top-center" richColors closeButton />
        <SWRegister />
      </body>
    </html>
  )
}
