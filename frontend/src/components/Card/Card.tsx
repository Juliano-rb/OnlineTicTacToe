import styled from 'styled-components'
import React, { ReactNode } from 'react'
import colors from '../../assets/styles/colors'

interface CardStyleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'normal' | 'large';
}

interface Props extends CardStyleProps {
  text?: string;
  action?: ()=>void
  children?: ReactNode;
}

const CardStyle = styled.div<CardStyleProps>`
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  color: ${colors.main};
  font-size: 0.8rem;
  padding: ${(props) => (props.size === 'large' ? '16px' : '10px')} ;

  width: fit-content;
`

/**
 * Card component act as a container for other elements
 * @text a text to be rendered as a child
 * @children can be used to render any element as a child of a card
 * @returns
 */
function Card({
  text, action, size, children,
}: Props) {
  return <CardStyle onClick={() => action?.()} size={size}>{text}{children}</CardStyle>
}

export default Card
