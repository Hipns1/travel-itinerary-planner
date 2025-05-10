import { useState } from 'react'
import { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage, Input } from '@/core/ui'
import { cn } from '@/core/lib'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

interface InputFieldProps {
  control: Control<any>
  name: string
  placeholder?: string
  type?: string
  disabled?: boolean
  className?: string
  label?: string
  labelClassName?: string
}

export const InputField = ({
  control,
  name,
  placeholder,
  type = 'text',
  disabled,
  className,
  label,
  labelClassName
}: InputFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <label htmlFor={name} className={cn('text-primary-600 text-xs font-semibold', labelClassName)}>
              {label}
            </label>
          )}
          <FormControl>
            <div className='relative'>
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder={placeholder}
                type={inputType}
                disabled={disabled}
                className={`${className} pr-10`}
              />
              {type === 'password' && (
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='text-primary-100 absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none'
                >
                  {isPasswordVisible ? <FaRegEye size={18} /> : <FaRegEyeSlash size={20} />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
