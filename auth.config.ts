import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { loginFormSchema } from '@/core/pages/auth/login'
import { prisma } from '@/prisma'
import bcryptjs from 'bcryptjs'

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginFormSchema.safeParse(credentials)
        if (!success) {
          throw new Error('Invalid credentials')
        }

        //verificar existencia del usuario en la DB
        const user = await prisma.user.findUnique({
          where: { email: data.email }
        })
        if (!user || !user.password) {
          throw new Error('Invalid credentials')
        }

        //verificar contraseña
        const passwordMatch = await bcryptjs.compare(data.password, user.password)
        if (!passwordMatch) {
          throw new Error('Invalid credentials')
        }

        return user
      }
    })
  ]
} satisfies NextAuthConfig
