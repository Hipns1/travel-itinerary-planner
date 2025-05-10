'use client'
import { useParams } from 'next/navigation'

export default function TravelPage() {
  const { travelId } = useParams()
  console.log(travelId)

  return <div>Hola</div>
}
