'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterFormProps, registerFormSchema } from '@/core/pages/auth/register'

export const useRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterFormProps>({
    resolver: zodResolver(registerFormSchema)
  })

  const onSuccess = async (data: RegisterFormProps) => {
    setIsLoading(true)
    console.log(data)
    setIsLoading(false)
  }

  return {
    form,
    onSuccess,
    isLoading
  }
}
