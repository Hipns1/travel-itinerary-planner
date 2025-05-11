import { Button, Form, Spinner } from '@/core/ui'
import { useRegisterForm } from '@/core/pages/auth/register'
import { InputField } from '@/core/components'

export const RegisterForm = () => {
  const { form, onSuccess, isLoading } = useRegisterForm()
  const { handleSubmit, control } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSuccess)}>
        <InputField name='name' label='Nombre' control={control} />
        <InputField name='email' label='Correo electrónico' control={control} />
        <InputField name='password' label='Contraseña' type='password' control={control} />
        <InputField name='confirmPassword' label='Confirmar contraseña' type='password' control={control} />
        <Button disabled={isLoading}>
          {isLoading && <Spinner size='sm' />}
          Registrar
        </Button>
      </form>
    </Form>
  )
}
