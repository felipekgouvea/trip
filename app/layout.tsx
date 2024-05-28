import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from './_components/layout/header'
import AuthProvider from './_provider/auth'
import Footer from './_components/layout/footer'
import { Toaster } from './_components/ui/sonner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Trips',
  description: 'Sistema de reserva de viagens',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <Header />
          <div className="flex h-screen flex-col">
            <div className="flex-auto">
              {children}
              <Toaster />
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
