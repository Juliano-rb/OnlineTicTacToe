import { ReactNode } from 'react'
import styled from 'styled-components'

interface Props{
  messages: ReactNode[]
  align?: 'left' | 'right'
  position?: 'top' | 'bottom'
}

interface PropsContainer {
  align: 'left' | 'right';
  position: 'top' | 'bottom'
}

const ALIGN_MAPPING = {
  left: 'flex-start',
  right: 'flex-end',
}

const Container = styled.div<PropsContainer>`
  align-items: ${(props) => ALIGN_MAPPING[props.align]};
  bottom: ${(props) => (props.position === 'bottom' ? '60px' : null)};
  display: flex;
  flex-direction: column;

  position: absolute;
  row-gap: 6px;

  top: ${(props) => (props.position === 'top' ? '60px' : null)};

  z-index: 2;
`

function ReactionList({ messages, align = 'left', position = 'top' }: Props) {
  return (
    <Container data-testid='reactionList' align={align} position={position}>
      {messages.map((message) => message)}
    </Container>
  )
}

export default ReactionList
