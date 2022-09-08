import React from 'react'
import styled from 'styled-components'
import colors from '../../assets/styles/colors'
import Button from '../Button'

interface Props {
  title: string;
  actionText?: string;
  action?: ()=>void
}

const ClickableItemStyle = styled.div`
  align-items: center;
  background-color: ${colors.white};
  border: none;
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);

  color: ${colors.main};
  display: flex;

  justify-content: space-between;
  padding: 4px;
  padding-left: 8px;

  width: 100%;

  :hover {
    background-color: ${colors.shadow};
  }

  span {
    font-size: 0.9rem;
  }
`

function ClickableItem({ title, actionText, action }:Props) {
  return (
    <ClickableItemStyle>
      <span>{title}</span>
      <Button onClick={action}>{actionText}</Button>
    </ClickableItemStyle>
  )
}

export default ClickableItem
