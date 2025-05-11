import { Spinner } from '@/core/ui'
import { cn } from '@/core/lib'

export function Loader({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <div className='bg-primary-50 absolute top-0 left-0 z-50 h-full w-full'>
      <div
        className={cn('bg-tertiary-50 relative flex h-screen flex-col items-center justify-center border-2', className)}
      >
        <img src='/logo.png' alt='Logo de promotec' className='h-12' />
        <div className='absolute right-0 bottom-0 m-10'>
          <Spinner />
        </div>
      </div>
    </div>
  )
}
