import { DateRange } from 'react-day-picker'
import { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage, RangeDatePicker } from '@/core/ui'

interface DateFieldProps {
  control: Control<any>
  name: string
  label?: string
  disabled?: boolean
}

export const RangeDateField = ({ control, name, label, disabled }: DateFieldProps) => {
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
            <RangeDatePicker
              {...field}
              disabled={disabled}
              onChange={(daterange: DateRange | undefined) => {
                field.onChange(daterange)
              }}
              value={field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
