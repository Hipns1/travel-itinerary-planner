'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useResetStoreOnLocationChange(resetStore: () => void) {
  const pathname = usePathname()

  useEffect(() => {
    resetStore()
  }, [pathname, resetStore])
}
