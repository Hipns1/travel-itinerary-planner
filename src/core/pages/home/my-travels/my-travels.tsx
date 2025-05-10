'use client'
import { ItemTravel } from '@/core/pages'
import { Button, Card } from '@/core/ui'
import { FaPlus } from 'react-icons/fa'

interface ItemTravelProps {
  id: string
  name: string
  description?: string
  totalActivities: number
  date: {
    start: string
    end: string
  }
}

const travels: ItemTravelProps[] = [
  {
    id: '23424444',
    name: 'Medellin - Eje cafetero',
    description: 'Descripción del viaje 1',
    totalActivities: 3,
    date: { start: '2025-06-01T00:00:00.000Z', end: '2025-06-10T00:00:00.000Z' }
  },
  {
    id: '23423433234',
    name: 'Santa Marta',
    totalActivities: 2,
    date: { start: '2025-07-05T00:00:00.000Z', end: '2025-07-15T00:00:00.000Z' }
  },
  {
    id: '23423432343',
    name: 'Minca',
    description: 'Descripción del viaje 2',
    totalActivities: 2,
    date: { start: '2025-07-05T00:00:00.000Z', end: '2025-07-15T00:00:00.000Z' }
  }
]
interface MyTravelsProps {
  setIsModalOpen: (isOpen: boolean) => void
}

export const MyTravels = ({ setIsModalOpen }: MyTravelsProps) => {
  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
      {travels.length > 0 ? (
        travels.map((travel, index) => <ItemTravel key={`${travel.name}-${index}`} travel={travel} />)
      ) : (
        <Card className='text-primary-600 col-span-1 flex min-h-40 w-full items-center justify-center border md:col-span-2 lg:col-span-3'>
          No hay viajes
          <Button className='gap-4' onClick={() => setIsModalOpen(true)}>
            <FaPlus />
            Nuevo viaje
          </Button>
        </Card>
      )}
    </div>
  )
}
