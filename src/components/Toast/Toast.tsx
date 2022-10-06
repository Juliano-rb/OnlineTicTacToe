import { ReactNode } from 'react'
import { ToastStyle, ToastTyle } from './Toast.styles'

interface Props {
  title: string;
  description?: string;
  variation?: 'warn' | 'error';
  handleClick?: () => void;
  children?: ReactNode;
}

function Toast({
  title,
  description,
  variation = 'warn',
  handleClick,
  children,
}: Props) {
  return (
    <ToastStyle onClick={handleClick} variation={variation}>
      <ToastTyle variation={variation}>{title}</ToastTyle>
      {children}
      {description && <p>{description}</p>}
    </ToastStyle>
  )
}

export default Toast
