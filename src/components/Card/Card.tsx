import styled from "styled-components";
import colors from "../../assets/styles/colors";
import { ReactNode } from "react";

interface CardStyleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "normal" | "large";
}

interface Props extends CardStyleProps {
  text?: string;
  action?: ()=>void
  children?: ReactNode;
}

const CardStyle = styled.div<CardStyleProps>`
  color: ${colors.main};
  font-size: 0.8rem;
  background-color: ${colors.white};
  width: fit-content;
  border-radius: 4px;
  padding: ${props=>props.size === 'large'? '16px' :'10px'} ;

  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

/**
 * Card component act as a container for other elements
 * @text a text to be rendered as a child 
 * @children can be used to render any element as a child of a card
 * @returns 
 */
const Card = ({ text, action, size, children }: Props) => {
  return <CardStyle onClick={()=>action && action()} size={size}>{text}{children}</CardStyle>;
};

export default Card;
