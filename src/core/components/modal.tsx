import { ReactNode } from 'react'
import { cn } from '@/core/lib'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, Button, Spinner } from '@/core/ui'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  className?: string
  isCloseIcon?: boolean
  icon?: ReactNode
  iconClassName?: string
  title: string
  titleClassName?: string
  children?: ReactNode | string
  childrenClassName?: string
  btnAcceptText?: string
  btnAcceptTextClassName?: string
  btnAcceptTextOnClick?: () => void
  btnRejectText?: string | boolean
  btnRejectTextClassName?: string
  btnRejectTextOnClick?: () => void
  isLoading?: boolean
  canClose?: boolean
}

export const Modal = ({
  isOpen,
  onClose,
  className,
  icon,
  iconClassName,
  title,
  titleClassName,
  children,
  childrenClassName,
  btnAcceptText = 'Aceptar',
  btnAcceptTextClassName,
  btnAcceptTextOnClick,
  btnRejectText,
  btnRejectTextClassName,
  btnRejectTextOnClick,
  isCloseIcon,
  isLoading,
  canClose = true
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        isCloseIcon={isCloseIcon}
        className={cn('max-w-[1000px] min-w-96 overflow-hidden p-0', className)}
        onPointerDownOutside={(event) => {
          if (!canClose) {
            event.preventDefault()
          }
        }}
        onEscapeKeyDown={(event) => {
          if (!canClose) {
            event.preventDefault()
          }
        }}
      >
        <div className={cn(icon ? 'flex' : 'block', 'p-8 pb-4')}>
          {icon && (
            <span
              className={cn('flex h-16 min-h-16 w-16 min-w-16 items-center justify-center rounded-full', iconClassName)}
            >
              {icon}
            </span>
          )}
          <div className={cn('', icon ? 'pl-8' : '')}>
            <DialogTitle className={cn('text-primary text-2xl font-semibold', titleClassName)}>{title}</DialogTitle>
            <DialogDescription></DialogDescription>
            <div className={cn('text-primary mt-4 text-justify text-sm font-normal', childrenClassName)}>
              {children}
            </div>
          </div>
        </div>
        <DialogFooter className='bg-primary-400 flex items-center justify-end gap-y-2 px-7 py-8 md:items-end md:gap-y-0 md:pl-0'>
          {btnRejectText && (
            <Button
              disabled={isLoading}
              variant={'secondary'}
              className={cn('h-10 w-40', btnRejectTextClassName)}
              onClick={btnRejectTextOnClick}
            >
              {btnRejectText}
            </Button>
          )}
          <Button
            disabled={isLoading}
            className={cn('flex h-10 w-40 gap-2', btnAcceptTextClassName)}
            onClick={btnAcceptTextOnClick}
          >
            {isLoading && <Spinner size='sm' />}
            {btnAcceptText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
