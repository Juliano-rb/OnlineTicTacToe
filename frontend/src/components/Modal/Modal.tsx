import React, { ReactNode } from 'react'
import { Background, Container } from './Modal.styles'

interface Props {
  setIsOpen?: (value: boolean) => void;
  children: ReactNode;
  position?: 'top' | 'center' | 'bottom';
}

/**
 * Modal component act as a container for other elements
 * @setIsOpen an function used to update it's own visibility
 * @children can be used to render any element inside of Modal
 * @returns
 */
function Modal({
  setIsOpen,
  children,
  position = 'center',
}: Props) {
  const handleClick = (event:React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }
  return (
    <Background
      onClick={() => setIsOpen?.(false)}
    >
      <Container position={position} onClick={handleClick}>
        {children}
      </Container>
    </Background>
  )
}

export default Modal
