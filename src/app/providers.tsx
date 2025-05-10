'use client'
import { SWRProvider } from '@/core/lib'
import { ToastContainer } from 'react-toastify'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SWRProvider>
      <ToastContainer position='top-right' />
      {children}
    </SWRProvider>
  )
}
