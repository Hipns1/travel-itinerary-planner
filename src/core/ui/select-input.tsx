import { cn } from '@/core/lib'
import { cloneElement, JSX, useEffect, useMemo, useRef, useState } from 'react'
import { FieldError, Noop } from 'react-hook-form'
import { ChevronDown, ChevronUp, Clock } from 'lucide-react'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Input,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/core/ui'

interface SelectInputProps<Label extends string, Value extends string> {
  placeholder?: string
  className?: string
  labelKey?: string
  valueKey?: string
  disabled?: boolean
  timeField?: boolean
  search?: boolean
  loading?: boolean
  onBlur?: Noop
  value?: string
  error?: FieldError
  onChange?: (...event: unknown[]) => void
  items?: { [key in Label | Value]: string }[] | null
  onValueChangeCallBack?: any
  leftIcon?: JSX.Element
}

export const SelectInput = <Label extends string, Value extends string>(props: SelectInputProps<Label, Value>) => {
  const {
    className,
    labelKey = 'label',
    valueKey = 'value',
    disabled = false,
    search = false,
    loading = false,
    timeField = false,
    placeholder = '',
    onBlur,
    value = '',
    error,
    onChange,
    items,
    leftIcon,
    onValueChangeCallBack = () => {}
  } = props

  const divRef = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [width, setWidth] = useState<number>(0)
  const [query, setQuery] = useState<string>('')
  const [valueItem, setValueItem] = useState(value)

  const normalizeString = (str: string): string => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  const memoizedOptions = useMemo(() => {
    if (!items || items.length === 0) return []
    if (!query) return items

    return items.filter((element) =>
      normalizeString(element[labelKey as Label].toLowerCase()).includes(normalizeString(query.toLowerCase()))
    )
  }, [items, labelKey, query])

  const onValueChange = useMemo(
    () => (value: string) => {
      if (!items || items.length === 0) return

      const item = items.find((item) => item[valueKey as Value] === value)
      if (item) {
        onValueChangeCallBack({
          label: item[labelKey as Label],
          value: item[valueKey as Value]
        })
        setValueItem(value)
      }
    },
    [items, labelKey, valueKey, onValueChangeCallBack]
  )

  const buttonClassName = useMemo(
    () =>
      cn(
        'flex justify-between px-3 font-normal',
        'hover:border-primary-200 hover:bg-primary-50',
        disabled && 'cursor-not-allowed bg-primary-400 opacity-50'
      ),
    [value, placeholder, disabled, error]
  )

  const updateWidth = () => {
    if (divRef.current) {
      const { width } = divRef.current.getBoundingClientRect()
      setWidth(width)
    }
  }

  useEffect(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  useEffect(() => {
    setValueItem(value)
  }, [value])

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className='relative flex flex-col justify-center'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              disabled={disabled || loading}
              onBlur={onBlur}
              ref={divRef}
              role='combobox'
              aria-expanded={open}
              className={buttonClassName}
            >
              {loading ? (
                <>
                  Cargando.... <Spinner />
                </>
              ) : (
                <div className='relative flex h-5 w-full items-center'>
                  <div className='flex max-w-[90%] items-center truncate'>
                    {leftIcon && (
                      <span className='mr-2 shrink-0'>
                        {cloneElement(leftIcon, {
                          size: 20,
                          strokeWidth: 1
                        })}
                      </span>
                    )}
                    {valueItem ? (
                      memoizedOptions.find((item) => item[valueKey as Value] === valueItem)?.[labelKey as Label]
                    ) : (
                      <span className='text-primary-100 text-sm'>{placeholder}</span>
                    )}
                  </div>
                  {timeField ? (
                    <div className='absolute top-0.5 right-0'>
                      <Clock className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </div>
                  ) : (
                    <div className='absolute top-0.5 right-0'>
                      {!open ? (
                        <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      ) : (
                        <ChevronUp className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      )}
                    </div>
                  )}
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className='bg-primary-50 rounded-sm p-1'
            style={{
              minWidth: `${width}px`,
              width: `${width}px`,
              maxWidth: 'auto'
            }}
          >
            <Command className='flex w-full flex-col gap-2'>
              {search && (
                <Input
                  value={query}
                  className='mb-1 rounded-sm'
                  onChange={(evn) => setQuery(evn.target.value)}
                  placeholder='Buscar...'
                />
              )}
              <CommandEmpty className='text-center'>Sin resultados.</CommandEmpty>
              <CommandList>
                <CommandGroup className='p-0'>
                  {memoizedOptions.map((item) => {
                    const labelValue = item[labelKey as Label].trim()
                    const valueValue = item[valueKey as Value]

                    return (
                      <CommandItem
                        className={cn(
                          'mt-0.5 mb-0.5 flex cursor-pointer items-center gap-2 rounded-sm py-2 pl-3 hover:bg-gray-100',
                          valueValue === value && 'bg-gray-200'
                        )}
                        key={valueValue as string}
                        value={valueValue as string}
                        onSelect={(currentValue) => {
                          if (onChange) onChange(currentValue)
                          onValueChange(currentValue)
                          setOpen(false)
                          setTimeout(() => {
                            setQuery('')
                          }, 100)
                        }}
                      >
                        {labelValue}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {error && <span className='text-xs text-[#FF432C]'>*{error?.message ?? ''}</span>}
    </div>
  )
}
