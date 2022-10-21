import { PlayerSymbolStyle } from './PlayerSymbol.styles'

interface IPlayerSymbol {
  value: string;
  size?: 'small' | 'medium' | 'large';
  valueMapping: { [key: string]: string };
}

function PlayerSymbol({ value, valueMapping, size = 'small' }: IPlayerSymbol) {
  return <PlayerSymbolStyle value={value} size={size}>{valueMapping[value]}</PlayerSymbolStyle>
}

export default PlayerSymbol
