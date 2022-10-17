import styled from 'styled-components'
import colors from '../../assets/styles/colors'

export const Container = styled.div`
  align-items: center;
  color: ${colors.white};
  display: flex;

  flex-direction: column;
  row-gap: 10px;

  * {
    font-size: 1.1rem;
    text-shadow: 2px 3px 4px rgb(0 0 0 / 30%);
  }
`
