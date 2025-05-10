import './globals.css'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es' className='min-h-screen w-full px-32 py-6'>
      <body>{children}</body>
    </html>
  )
}
