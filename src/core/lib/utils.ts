import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const yearOptions = (maxDate?: Date, minDate?: Date): { label: string; value: string }[] => {
  const currentYear = new Date().getFullYear()
  const maxYear = maxDate ? maxDate.getFullYear() : currentYear + 20
  const minYear = minDate?.getFullYear() ?? 1900

  const years: { label: string; value: string }[] = []
  for (let year = maxYear; year >= minYear; year--) {
    years.push({ label: `${year}`, value: `${year}` })
  }

  return years
}

export const monthOptions = (
  selectedYear: number,
  maxDate?: Date,
  minDate?: Date
): { label: string; value: string }[] => {
  let startMonth = 0
  let endMonth = 11

  if (minDate && selectedYear === minDate.getFullYear()) {
    startMonth = minDate.getMonth()
  }

  if (maxDate && selectedYear === maxDate.getFullYear()) {
    endMonth = maxDate.getMonth()
  }

  const months = []
  for (let i = startMonth; i <= endMonth; i++) {
    const monthDate = new Date(2000, i)
    const monthName = format(monthDate, 'MMMM', { locale: es })
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1)
    months.push({ label: capitalizedMonth, value: `${i}` })
  }

  return months
}
