import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/core/lib'
import { buttonVariants } from '@/core/ui'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  minDate?: Date
  maxDate?: Date
}

const IconLeft = () => <ChevronLeftIcon className='h-4 w-4' />
const IconRight = () => <ChevronRightIcon className='h-4 w-4' />

const normalizeDate = (date: Date) => {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}
function Calendar({ className, classNames, minDate, maxDate, showOutsideDays = true, ...props }: CalendarProps) {
  const isDateDisabled = (date: Date) => {
    const normalizedDate = normalizeDate(date)
    if (minDate && normalizedDate < normalizeDate(minDate)) {
      return true
    }
    if (maxDate && normalizedDate > normalizeDate(maxDate)) {
      return true
    }

    return false
  }

  return (
    <DayPicker
      disabled={isDateDisabled}
      showOutsideDays={showOutsideDays}
      className={cn('', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: cn(props.mode === 'single' ? 'space-y-0' : 'space-y-4'),
        caption: cn('flex justify-center pt-1 relative items-center', props.mode === 'single' && 'hidden'),
        caption_label: 'text-sm font-medium capitalize ',
        nav: 'space-x-1 flex items-center ',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 bg-white shadow p-0 hover:bg-gray-50 active:bg-gray-100 hidden'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex ',
        head_cell: 'text-primary-100 w-8 font-bold text-base capitalize',
        row: 'flex w-full mt-2',
        cell: cn(
          'text-base relative p-0 text-center text-md focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-xl',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-xl [&:has(>.day-range-start)]:rounded-l-xl first:[&:has([aria-selected])]:rounded-l-xl last:[&:has([aria-selected])]:rounded-r-xl'
            : '[&:has([aria-selected])]:rounded-xl'
        ),
        day: cn('h-8 w-8 p-0 font-normal aria-selected:opacity-100'),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-50 rounded-[4px] hover:bg-primary hover:text-primary-foreground focus:bg-primary',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: '!rounded-none !text-primary font-normal bg-primary',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft,
        IconRight
      }}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
