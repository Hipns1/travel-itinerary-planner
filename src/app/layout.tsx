import './globals.css'
import { ClientProviders } from './providers'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es' className='min-h-screen w-full px-32 py-6'>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
