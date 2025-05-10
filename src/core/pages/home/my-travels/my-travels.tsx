'use client'
import { useHomeStore } from '@/core/lib'
import { ItemTravel } from '@/core/pages'
import { getAllTravels } from '@/core/services'
import { Button, Card } from '@/core/ui'
import { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'

export const MyTravels = () => {
  const { data: travels, mutate } = getAllTravels()
  const { flagForMutation, setTravelModal, setFlagForMutation } = useHomeStore()

  useEffect(() => {
    if (flagForMutation) {
      mutate()
      setFlagForMutation(false)
    }
  }, [flagForMutation])

  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
      {travels && travels.length > 0 ? (
        travels.map((travel, index) => <ItemTravel key={`${travel.name}-${index}`} travel={travel} />)
      ) : (
        <Card className='text-primary-600 col-span-1 flex min-h-40 w-full items-center justify-center border md:col-span-2 lg:col-span-3'>
          No hay viajes
          <Button className='gap-4' onClick={() => setTravelModal({ isOpen: true, isNew: true })}>
            <FaPlus />
            Nuevo viaje
          </Button>
        </Card>
      )}
    </div>
  )
}
