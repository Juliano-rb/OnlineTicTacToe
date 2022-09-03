import styled, { keyframes } from "styled-components";
import colors from "../../assets/styles/colors";
import _uniqueId from 'lodash/uniqueId'
import { bounceIn } from "react-animations";
import { ReactNode } from "react";

interface Props {
  setIsOpen?: (value: boolean)=>void;
  children: ReactNode;
}

const Container = styled.div`
    position: relative;
    top: 50%;
    margin: 0 auto;

    max-width: 300px;
    border-radius: 4px;
    padding: 10px;
    
    background-color: ${colors.white};
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);

    animation: 0.4s ${keyframes`${bounceIn}`};
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`
/**
 * Modal component act as a container for other elements
 * @setIsOpen an function used to update it's own visibility
 * @children can be used to render any element inside of Modal
 * @returns 
 */
const Modal = ({
  setIsOpen,
  children
}: Props) => {
  const handleClick = (event:React.MouseEvent<HTMLDivElement>)=>{
    event.stopPropagation()
  }
  return (
    <Background onClick={()=>{ setIsOpen && setIsOpen(false)}}>
      <Container onClick={handleClick}>
        {children}
      </Container>
    </Background>
  )

};

export default Modal;
