'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormProps, loginFormSchema } from '@/core/pages/auth/login'
import { loginAction } from '@/actions/auth-actions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<LoginFormProps>({
    resolver: zodResolver(loginFormSchema)
  })

  const onSuccess = async (data: LoginFormProps) => {
    setIsLoading(true)
    const response = await loginAction(data)
    if (response.error) {
      toast.error(response.error)
    } else {
      router.push('/')
    }
    setIsLoading(false)
  }

  return { form, onSuccess, isLoading }
}
