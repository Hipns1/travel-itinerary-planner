import { DateField, InputField, Modal, TextareaField } from '@/core/components'
import { Form } from '@/core/ui'
import { useNewTravel } from '@/core/pages'

interface NewTravelModalProps {
  show: boolean
  onClose: () => void
}

export const NewTravelModal = ({ show, onClose }: NewTravelModalProps) => {
  const { form, onSuccess, isLoading } = useNewTravel()
  const { control, handleSubmit } = form

  const handleClose = () => {
    onClose()
    form.reset()
    form.clearErrors()
  }

  return (
    <Modal
      isOpen={show}
      onClose={handleClose}
      title='Nuevo viaje'
      btnAcceptText='Crear'
      btnRejectText='Cancelar'
      btnAcceptTextOnClick={handleSubmit(onSuccess)}
      btnRejectTextOnClick={handleClose}
      className='w-[500px]'
      isLoading={isLoading}
    >
      <div className='flex flex-col gap-4'>
        <p className='text-input -mt-4'>Ingresa los detalles de tu viaje</p>
        <div>
          <Form {...form}>
            <form className='flex flex-col gap-4'>
              <InputField control={control} name='travelName' placeholder='Nombre del viaje' label='Nombre del viaje' />
              <TextareaField
                control={control}
                name='travelDescription'
                placeholder='Descripción del viaje'
                label='Descripción del viaje'
              />
              <div className='grid grid-cols-2 gap-4'>
                <DateField
                  control={control}
                  name='travelStartDate'
                  label='Fecha de inicio'
                  placeholder='Fecha de inicio'
                />
                <DateField control={control} name='travelEndDate' label='Fecha de fin' placeholder='Fecha de fin' />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
