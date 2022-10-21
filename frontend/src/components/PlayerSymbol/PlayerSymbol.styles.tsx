import styled from 'styled-components'
import colors from '../../assets/styles/colors'

interface IPlayerSymbolStyle {
  value: string;
  size: 'small' | 'large' | 'medium';
}

const SIZE_MAPPING = {
  small: '1.1rem',
  medium: '2rem',
  large: '3rem',
}

export const PlayerSymbolStyle = styled.span<IPlayerSymbolStyle>`
  color: ${(props) => (props.value === '0' ? colors.alert : colors.softier)};
  font-size: ${(props) => SIZE_MAPPING[props.size]};
  text-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
`
