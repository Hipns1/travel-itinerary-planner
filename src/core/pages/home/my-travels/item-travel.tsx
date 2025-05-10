import { Button, Card } from '@/core/ui'
import dayjs from 'dayjs'
import { FaEdit, FaTrash, FaArrowRight } from 'react-icons/fa'

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

export const ItemTravel = ({ travel }: { travel: ItemTravelProps }) => {
  return (
    <Card className='flex-col justify-between gap-6 border'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between gap-4'>
          <p className='truncate text-2xl font-bold'>{travel.name}</p>
          <div className='flex gap-4'>
            <Button size='icon' variant='secondary'>
              <FaEdit size={18} />
            </Button>
            <Button size='icon' variant='secondary'>
              <FaTrash size={18} />
            </Button>
          </div>
        </div>
        <div className='text-primary-300 flex flex-col gap-2 text-sm font-medium'>
          <p>
            {dayjs(travel.date.start).format('DD/MM/YYYY')} - {dayjs(travel.date.end).format('DD/MM/YYYY')}
          </p>
          <p>{travel.description}</p>
          <p className='text-primary'>{travel.totalActivities} actividades</p>
        </div>
      </div>
      <Button className='flex items-center gap-4'>
        Ver detalles <FaArrowRight size={16} />
      </Button>
    </Card>
  )
}
