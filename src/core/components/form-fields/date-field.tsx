import { Control } from 'react-hook-form'
import { DatePicker, FormControl, FormField, FormItem, FormMessage } from '@/core/ui'

interface DateFieldProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
  value?: Date
  maxDate?: Date
  minDate?: Date
}

export const DateField = ({ control, name, label, placeholder, disabled, value, maxDate, minDate }: DateFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <label htmlFor={name} className='text-primary-600 text-xs font-semibold'>
              {label}
            </label>
          )}
          <FormControl>
            <DatePicker
              {...field}
              disabled={disabled}
              onChange={(value: Date | undefined) => {
                if (value != null) {
                  const date = new Date(value)
                  field.onChange(date)
                }
              }}
              value={field.value ?? value}
              placeholder={placeholder}
              maxDate={maxDate}
              minDate={minDate}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
