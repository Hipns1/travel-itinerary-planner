'use client'
import { MyTravels, TravelModal } from '@/core/pages'
import { useHomeStore, useResetStoreOnLocationChange } from '@/core/lib/stores'
import { Button } from '@/core/ui'
import { FaPlus } from 'react-icons/fa6'
import { signOut } from 'next-auth/react'

export default function Home() {
  const { setTravelModal, resetStore } = useHomeStore()
  useResetStoreOnLocationChange(resetStore)

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='flex items-center justify-between gap-4'>
        <p className='text-2xl font-bold'>Mis viajes</p>
        <Button onClick={() => setTravelModal({ isOpen: true, isNew: true })} className='gap-4'>
          <FaPlus />
          Nuevo viaje
        </Button>
      </div>
      <MyTravels />
      <TravelModal />

      <Button onClick={async () => await signOut({ redirectTo: '/login' })}>Logout</Button>
    </div>
  )
}
