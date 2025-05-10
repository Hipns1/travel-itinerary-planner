import { DateField, InputField, Modal, TextareaField } from '@/core/components'
import { Form } from '@/core/ui'
import { useTravel } from '@/core/pages'
import { useHomeStore } from '@/core/lib'

export const TravelModal = () => {
  const { form, onSuccess, isLoading } = useTravel()
  const { control, handleSubmit } = form

  const { travelModal, setTravelModal } = useHomeStore()

  const handleClose = () => {
    setTravelModal({ isOpen: false, isNew: true })
    form.reset()
    form.clearErrors()
  }

  return (
    <Modal
      isOpen={travelModal.isOpen}
      onClose={handleClose}
      title={travelModal.isNew ? 'Nuevo viaje' : 'Editar viaje'}
      btnAcceptText={travelModal.isNew ? 'Crear' : 'Guardar cambios'}
      btnRejectText='Cancelar'
      btnAcceptTextOnClick={() => {
        handleSubmit(onSuccess)()
        form.reset()
      }}
      btnRejectTextOnClick={handleClose}
      className='w-[500px]'
      isLoading={isLoading}
    >
      <div className='flex flex-col gap-4'>
        <p className='text-input -mt-4'>
          {travelModal.isNew ? 'Ingresa los detalles de tu viaje' : 'Modifica los detalles del viaje'}
        </p>
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
