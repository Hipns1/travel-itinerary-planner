import { Modal } from '@/core/components'
import { cn } from '@/core/lib'

interface Configuration {
  className?: string
  title: string
  titleClassName?: string
  subtitle: string
  subtitleClassName?: string
  description?: string
  iconClassName?: string
  btnAcceptText?: string
  btnAcceptTextClassName?: string
  btnRejectText?: string
  descriptionClassName?: string
  isShowAcceptBtn?: boolean
}

interface ModalSimpleProps {
  show: boolean
  onClose: () => void
  onSubmit?: () => void
  onBack?: () => void
  configuration: Configuration
  isLoading?: boolean
  isCloseIcon?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
  canClose?: boolean
}

export const ModalSimple = ({
  show,
  onClose,
  onSubmit,
  onBack,
  configuration,
  isLoading,
  isCloseIcon,
  icon,
  children,
  canClose
}: Readonly<ModalSimpleProps>) => {
  return (
    <Modal
      isCloseIcon={isCloseIcon}
      className={cn('w-[90%] md:w-[674px]', configuration?.className)}
      isOpen={show}
      onClose={onClose}
      title={configuration.title}
      titleClassName={configuration?.titleClassName}
      btnAcceptText={configuration?.btnAcceptText ?? 'Confirmar'}
      btnAcceptTextOnClick={onSubmit ?? onClose}
      btnAcceptTextClassName={configuration?.btnAcceptTextClassName}
      btnRejectText={configuration?.btnRejectText ? 'Cancelar' : false}
      btnRejectTextOnClick={onBack ?? onClose}
      isLoading={isLoading}
      isShowAcceptBtn={configuration?.isShowAcceptBtn}
      icon={icon}
      iconClassName={configuration?.iconClassName}
      canClose={canClose}
    >
      <div className={cn('', configuration?.descriptionClassName)}>{children ?? configuration?.description}</div>
    </Modal>
  )
}
