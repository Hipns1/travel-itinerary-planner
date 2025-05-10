import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewTravelProps, newTravelSchema } from '@/core/pages'

export const useNewTravel = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<NewTravelProps>({
    resolver: zodResolver(newTravelSchema)
  })

  const onSuccess = async (data: NewTravelProps) => {
    setIsLoading(true)
    console.log(data)
    setIsLoading(false)
  }

  return { form, onSuccess, isLoading }
}
