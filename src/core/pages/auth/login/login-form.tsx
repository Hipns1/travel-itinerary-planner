'use client'
import { useLoginForm } from '@/core/pages/auth/login'
import { InputField } from '@/core/components'
import { Button, Spinner, Form } from '@/core/ui'

export const LoginForm = () => {
  const { form, onSuccess, isLoading } = useLoginForm()
  const { handleSubmit, control } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSuccess)}>
        <InputField name='email' label='Correo electrónico' control={control} />
        <InputField name='password' label='Contraseña' type='password' control={control} />
        <Button disabled={isLoading}>
          {isLoading && <Spinner size='sm' />}
          Ingresar
        </Button>
      </form>
    </Form>
  )
}
