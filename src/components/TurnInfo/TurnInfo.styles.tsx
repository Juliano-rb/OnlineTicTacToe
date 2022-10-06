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
  }
`

export const Title = styled.div`

  text-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
`
