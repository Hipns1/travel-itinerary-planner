import { v } from '@/core/lib'
import { z } from 'zod'

export const loginFormSchema = z.object({
  email: v.string({ required: true, type: 'email' }),
  password: v.string({ required: true, type: 'password' })
})

export type LoginFormProps = z.infer<typeof loginFormSchema>
