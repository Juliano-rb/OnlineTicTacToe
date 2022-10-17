import styled from 'styled-components'
import colors from '../../../assets/styles/colors'

interface TdProps {
  value: string;
}

export const TdStyle = styled.td<TdProps>`
  box-sizing: border-box;
  color: ${(props) => (props.value === '0' ? colors.alert : colors.softier)};

  cursor: pointer;
  font-size: 3.2rem;
  height: 4.3rem;
  line-height: 4.1rem;
  text-shadow: 2px 3px 4px rgb(0 0 0 / 30%);

  width: 4.3rem;
`
