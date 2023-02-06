import styled, { keyframes } from 'styled-components'
import _uniqueId from 'lodash/uniqueId'
import { bounceIn } from 'react-animations'
import colors from '../../../assets/styles/colors'
import Card from '../../Card'

const REACTIONS = {
  text: [
    'Você é bom!',
    'Bem jogado',
    'Parabéns',
    'Eu vou ganhar',
    'Sim',
    'Não',
    'Uau!!',
    'Quero revanche',
  ],
  emoji: ['😎', '😍', '😮', '😡', '😥', '😈', '👍', '👋', '🤛'],
}

interface Props {
  action?: (data: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`

const Group = styled.div`
  animation: 0.4s ${keyframes`${bounceIn}`};
  background-color: ${colors.white};
  border-radius: 4px;
  display: flex;

  flex-wrap: wrap;
  gap: 8px;

  justify-content: flex-start;

  position: relative;

  top: 50%;

  div {
    cursor: pointer;
    display: flex;
    flex: 1 1 content;
    font-size: 0.8rem;
    max-width: fit-content;

    :hover {
      background-color: ${colors.shadow};
      transform: scale(1.2);
      transition: 0.1s;
    }
  }

  h1{
    font-size: 1.07rem;
  }
`

function ReactionPicker({ action }: Props) {
  return (
    <Container>
      <Group>
        {REACTIONS.text.map((reaction) => (
          <Card
            key={_uniqueId()}
            action={() => action?.(reaction)}
            text={reaction}
          />
        ))}
      </Group>

      <Group>
        {REACTIONS.emoji.map((reaction) => (
          <Card
            key={_uniqueId()}
            action={() => action?.(reaction)}
          >
            <h1>{reaction}</h1>
          </Card>
        ))}
      </Group>
    </Container>
  )
}

export default ReactionPicker
