'use client'
import { useState } from 'react'
import { MyTravels, NewTravelModal } from '@/core/pages'
import { Button } from '@/core/ui'
import { FaPlus } from 'react-icons/fa6'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col gap-y-6'>
      <h1 className='self-center text-3xl font-bold'>Planificador de viajes</h1>
      <div className='flex items-center justify-between gap-4'>
        <p className='text-2xl font-bold'>Mis viajes</p>
        <Button onClick={() => setIsOpen(true)} className='gap-4'>
          <FaPlus />
          Nuevo viaje
        </Button>
      </div>
      <MyTravels setIsModalOpen={setIsOpen} />
      <NewTravelModal show={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}
