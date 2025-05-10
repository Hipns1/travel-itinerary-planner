import { FormControl, FormField, FormItem, FormMessage, Textarea } from '@/core/ui'
import { Control } from 'react-hook-form'

interface TextareaFieldProps {
  control: Control<any>
  name: string
  placeholder?: string
  type?: string
  disabled?: boolean
  className?: string
  label?: string
  mainClassName?: string
}

export const TextareaField = ({
  control,
  name,
  placeholder,
  disabled,
  className,
  label,
  mainClassName
}: TextareaFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={mainClassName}>
          {label && (
            <label htmlFor={name} className='text-primary-600 text-xs font-semibold'>
              {label}
            </label>
          )}
          <FormControl>
            <div className='relative'>
              <Textarea
                {...field}
                value={field.value ?? ''}
                placeholder={placeholder}
                disabled={disabled}
                className={`${className} pr-10`}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
