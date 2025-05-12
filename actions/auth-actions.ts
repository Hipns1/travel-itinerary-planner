'use server'
import { signIn } from '@/auth'
import { LoginFormProps } from '@/core/pages/auth/login'
import { RegisterFormProps, registerFormSchema } from '@/core/pages/auth/register'
import { prisma } from '@/prisma'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'

export const loginAction = async (values: LoginFormProps) => {
  try {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })
    return { success: true }
  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message }
    }
    return { error: 'Error al ingresar' }
  }
}

export const registerAction = async (values: RegisterFormProps) => {
  try {
    const { data, success } = registerFormSchema.safeParse(values)
    if (!success) return { error: 'Invalid data' }

    //verificar existencia del usuario en la DB
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    })
    if (user) return { error: 'User already exists' }

    //hashar la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10)

    //crear el usuario
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword
      }
    })

    //iniciar la sesión automáticamente
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    return { success: true }
  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message }
    }
    return { error: 'Error al ingresar' }
  }
}
