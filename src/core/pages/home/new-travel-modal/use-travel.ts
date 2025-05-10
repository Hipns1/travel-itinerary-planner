'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewTravelProps, newTravelSchema } from '@/core/pages'
import { postTravel } from '@/core/services'
import { useHomeStore } from '@/core/lib'

export const useTravel = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { travelModal, setTravelModal, setFlagForMutation } = useHomeStore()

  const form = useForm<NewTravelProps>({
    resolver: zodResolver(newTravelSchema)
  })

  const onSuccess = async (data: NewTravelProps) => {
    setIsLoading(true)
    const dataTravel = {
      name: data.travelName,
      description: data.travelDescription,
      startDate: data.travelStartDate,
      endDate: data.travelEndDate
    }
    try {
      if (travelModal.isNew) {
        await postTravel(dataTravel)
        setTravelModal({ isOpen: false, isNew: true })
        setFlagForMutation(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { form, onSuccess, isLoading }
}
