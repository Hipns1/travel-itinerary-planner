'use client'

import { useState, useEffect, forwardRef } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import * as Popover from '@radix-ui/react-popover'
import { GoChevronRight, GoChevronLeft } from 'react-icons/go'
import { IoCalendarClearOutline } from 'react-icons/io5'
import { cn, monthOptions, yearOptions } from '@/core/lib'
import { Calendar, Button, SelectInput } from '@/core/ui'

interface DatePickerProps {
  placeholder?: string
  className?: string
  onChange?: (value: Date | undefined) => void
  disabled?: boolean
  value?: any
  minDate?: Date
  maxDate?: Date
  placeholderClassName?: string
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ placeholder, className, onChange, disabled, value, minDate, maxDate, placeholderClassName }, ref) => {
    const [date, setDate] = useState<Date>()
    const [open, setOpen] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [hasInitializedMonth, setHasInitializedMonth] = useState(false)

    const handleNextMonth = () => {
      setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
    }

    const handlePreviousMonth = () => {
      setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
    }

    const handleYearChange = (year: string) => {
      const newDate = new Date(Number(year), currentMonth.getMonth(), 1)
      setCurrentMonth(newDate)
    }

    const handleMonthChange = (month: string) => {
      const newDate = new Date(currentMonth.getFullYear(), Number(month), 1)
      setCurrentMonth(newDate)
    }

    const handleSelectDate = (selectedDate: Date | undefined) => {
      setDate(selectedDate)
      onChange?.(selectedDate)
      setOpen(false)
    }

    const isPreviousMonthDisabled = minDate
      ? new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1) <
        new Date(minDate.getFullYear(), minDate.getMonth(), 1)
      : false

    const isNextMonthDisabled = maxDate
      ? new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1) >
        new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)
      : false

    useEffect(() => {
      if (!hasInitializedMonth && !value) {
        const initialDate = maxDate ?? new Date()
        setCurrentMonth(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1))
        setHasInitializedMonth(true)
      }
    }, [maxDate, value, hasInitializedMonth])

    useEffect(() => {
      setDate(value)
    }, [value])

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          type='button'
          ref={ref}
          disabled={disabled}
          className={cn(
            'border-primary-200 relative flex h-10 w-full cursor-pointer items-center justify-between rounded-md border-[1px] pr-4 pl-3 text-left text-sm font-normal',
            'disabled:bg-primary-400 disabled:opacity-50',
            !date && 'text-muted-foreground',
            className
          )}
        >
          {date ? (
            format(date, 'dd/MM/yyyy', { locale: es })
          ) : (
            <span className={cn('text-input w-full truncate', placeholderClassName)}>
              {placeholder ?? 'Seleccionar fecha'}
            </span>
          )}
          {
            <div>
              <IoCalendarClearOutline className='text-input absolute top-3 right-0 mr-3 h-3.5 w-3.5' />
            </div>
          }
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content className='border-primary-200 bg-primary-50 z-50 flex flex-col gap-2 rounded-md border p-4 shadow-lg'>
            <div className='grid grid-cols-2 gap-2'>
              <SelectInput
                items={yearOptions(maxDate, minDate)}
                value={`${currentMonth.getFullYear()}`}
                onChange={handleYearChange}
                search
              />
              <SelectInput
                items={monthOptions(currentMonth.getFullYear(), maxDate)}
                value={`${currentMonth.getMonth()}`}
                onChange={handleMonthChange}
              />
            </div>
            <div className='mb-2 flex items-center justify-between'>
              <Button
                size='icon'
                type='button'
                onClick={handlePreviousMonth}
                className='h-8 w-8'
                disabled={isPreviousMonthDisabled}
              >
                <GoChevronLeft size={20} />
              </Button>
              <span className='text-center text-base font-bold capitalize'>
                {format(currentMonth, 'MMMM yyyy', { locale: es })}
              </span>
              <Button
                size='icon'
                type='button'
                onClick={handleNextMonth}
                className='h-8 w-8'
                disabled={isNextMonthDisabled}
              >
                <GoChevronRight size={20} />
              </Button>
            </div>
            <Calendar
              minDate={minDate}
              maxDate={maxDate}
              weekStartsOn={0}
              mode='single'
              selected={date}
              onSelect={handleSelectDate}
              locale={es}
              month={currentMonth}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
  }
)
