import styled, { keyframes } from 'styled-components'
import { bounceIn } from 'react-animations'
import colors from '../../../assets/styles/colors'

export const EmojiList = styled.div`
  animation: 0.4s ${keyframes`${bounceIn}`};
  background-color: ${colors.white};
  border-radius: 4px;
  display: flex;

  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-around;

  margin: 0 auto;
  max-width: 300px;

  position: relative;

  top: 50%;

  div {
    cursor: pointer;
    flex: 1 1 0px;
    font-size: 1.6rem;

    :hover {
      background-color: ${colors.shadow};
      transform: scale(1.2);
      transition: 0.1s;
    }
  }
`
