'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterFormProps, registerFormSchema } from '@/core/pages/auth/register'
import { registerAction } from '@/actions/auth-actions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export const useRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<RegisterFormProps>({
    resolver: zodResolver(registerFormSchema)
  })

  const onSuccess = async (data: RegisterFormProps) => {
    setIsLoading(true)
    const response = await registerAction(data)
    if (response.error) {
      toast.error(response.error)
    } else {
      router.push('/')
    }
    setIsLoading(false)
  }

  return {
    form,
    onSuccess,
    isLoading
  }
}
