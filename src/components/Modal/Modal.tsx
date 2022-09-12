import styled, { keyframes } from 'styled-components'
import { bounceIn } from 'react-animations'
import React, { ReactNode } from 'react'
import colors from '../../assets/styles/colors'

interface Props {
  setIsOpen?: (value: boolean) => void;
  children: ReactNode;
  position?: 'top' | 'center' | 'bottom';
}

const POSITION_MAPPING = {
  top: '0px',
  center: '30%',
  bottom: '60%',
}

interface ContainerStyle{
  position: 'top' | 'center' | 'bottom'
}

const Container = styled.div <ContainerStyle>`
    animation: 0.4s ${keyframes`${bounceIn}`};
    background-color: ${colors.white};
    border-radius: 4px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    max-width: 300px;
    
    padding: 10px;
    position: relative;
    top: ${(props) => POSITION_MAPPING[props.position]};
`

const Background = styled.div`
  background-color: rgb(0 0 0 / 10%);
  height: 100%;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 0;
`
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
      onClick={() => setIsOpen && setIsOpen(false)}
    >
      <Container position={position} onClick={handleClick}>
        {children}
      </Container>
    </Background>
  )
}

export default Modal
