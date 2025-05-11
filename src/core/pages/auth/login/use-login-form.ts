'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormProps, loginFormSchema } from '@/core/pages/auth/login'

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormProps>({
    resolver: zodResolver(loginFormSchema)
  })

  const onSuccess = async (data: LoginFormProps) => {
    setIsLoading(true)
    console.log(data)
    setIsLoading(false)
  }

  return { form, onSuccess, isLoading }
}
