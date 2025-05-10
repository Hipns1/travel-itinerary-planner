import { v } from '@/core/lib'
import { z } from 'zod'

export const newTravelSchema = z.object({
  travelName: v.string({ required: true, type: 'text' }),
  travelDescription: v.string({ required: true, type: 'text' }).optional(),
  travelStartDate: v.date({ required: true }),
  travelEndDate: v.date({ required: true })
})
export type NewTravelProps = z.infer<typeof newTravelSchema>
