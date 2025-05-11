import './globals.css'
import { ClientProviders } from './providers'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body>
        <div className='flex min-h-screen w-full flex-col gap-6 px-32 py-6'>
          <ClientProviders>{children}</ClientProviders>
        </div>
      </body>
    </html>
  )
}
