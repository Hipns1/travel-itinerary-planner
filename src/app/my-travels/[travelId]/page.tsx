'use client'
import { getSingleTravel } from '@/core/services'
import { useParams } from 'next/navigation'

export default function TravelPage() {
  const { travelId } = useParams()
  console.log(travelId)

  const { data: travel } = getSingleTravel(travelId)

  return <div>{travel?.name}</div>
}
