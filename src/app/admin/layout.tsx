import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import AdminShell from '@/components/admin/admin-shell'
import '../globals.css'

export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="font-inter antialiased bg-slate-950 text-white overflow-hidden">
        <noscript><img height="1" width="1" style={{ display: 'none' }}
        src="https://www.facebook.com/tr?id=4290380164439424&ev=PageView&noscript=1"
        /></noscript>
        <AdminShell>{children}</AdminShell>
        {/* Toaster lives outside the shell so login page gets it too */}
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  )
}
