'use client'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { Button, Card } from '@/core/ui'
import { FaEdit, FaTrash, FaArrowRight } from 'react-icons/fa'
import { deleteTravel, ItemTravelProps } from '@/core/services'
import { useHomeStore } from '@/core/lib'

export const ItemTravel = ({ travel }: { travel: ItemTravelProps }) => {
  const router = useRouter()
  const { id, name, description, totalActivities, startDate, endDate } = travel

  const { setTravelModal, setFlagForMutation } = useHomeStore()

  const handleDelete = async (id: string | undefined) => {
    await deleteTravel(id)
      .then(() => {
        setFlagForMutation(true)
        toast.success('Viaje eliminado exitosamente')
      })
      .catch(() => {
        toast.error('Error al eliminar viaje')
      })
  }

  return (
    <Card className='flex-col justify-between gap-6 border'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between gap-4'>
          <p className='truncate text-2xl font-bold'>{name}</p>
          <div className='flex gap-4'>
            <Button size='icon' variant='secondary' onClick={() => setTravelModal({ isOpen: true, isNew: false })}>
              <FaEdit size={18} />
            </Button>
            <Button size='icon' variant='secondary' onClick={() => handleDelete(id)}>
              <FaTrash size={18} />
            </Button>
          </div>
        </div>
        <div className='text-primary-300 flex flex-col gap-2 text-sm font-medium'>
          <p>
            {dayjs(startDate).format('DD/MM/YYYY')} - {dayjs(endDate).format('DD/MM/YYYY')}
          </p>
          <p>{description}</p>
          <p className='text-primary'>{totalActivities} actividades</p>
        </div>
      </div>
      <Button className='flex items-center gap-4' onClick={() => router.push(`/my-travels/${id}`)}>
        Ver detalles <FaArrowRight size={16} />
      </Button>
    </Card>
  )
}
