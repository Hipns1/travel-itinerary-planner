import { v } from '@/core/lib'
import { z } from 'zod'

export const registerFormSchema = z
  .object({
    name: v.string({ required: true, type: 'text' }),
    email: v.string({ required: true, type: 'email' }),
    password: v.string({ required: true, type: 'password' }),
    confirmPassword: v.string({ required: true, type: 'password' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden'
  })

export type RegisterFormProps = z.infer<typeof registerFormSchema>
