import styled from 'styled-components'
import colors from '../../assets/styles/colors'

export const Container = styled.div`
  align-items: center;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  row-gap: 10px;

  * {
    font-size: 1.1rem;
    text-shadow: 2px 3px 4px rgb(0 0 0 / 30%);
  }

  div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  div span {
    box-shadow: inset 1px -12px 4px -10px ${colors.alert};
  }
`
