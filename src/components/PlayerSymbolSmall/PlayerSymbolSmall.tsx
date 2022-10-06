import styled from 'styled-components'
import colors from '../../assets/styles/colors'

interface IPlayerSymbol {
  value: string;
  valueMapping: { [key: string]: string };
}

interface IPlayerSymbolStyle {
  value: string;
}

export const PlayerSymbolStyle = styled.span<IPlayerSymbolStyle>`
  color: ${(props) => (props.value === '0' ? colors.alert : colors.softier)};
`

function PlayerSymbol({ value, valueMapping }: IPlayerSymbol) {
  return <PlayerSymbolStyle value={value}>{valueMapping[value]}</PlayerSymbolStyle>
}

export default PlayerSymbol
