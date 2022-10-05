import { ToastStyle } from './Toast.styles'

interface Props {
  title: string;
  description: string;
  variation?: 'warn' | 'error';
  handleClick?: () => void;
}

function Toast({
  title, description, variation = 'warn', handleClick,
}: Props) {
  return (
    <ToastStyle onClick={handleClick} variation={variation}>
      <span>{title}</span>
      <p>{description}</p>
    </ToastStyle>
  )
}

export default Toast
