'use client'
import { SWRConfig } from 'swr'
import { travelsApi } from '../services'

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        revalidateOnFocus: false,
        fetcher: async (path: string) => await travelsApi.get<never>(path)
      }}
    >
      {children}
    </SWRConfig>
  )
}
