import { TdStyle } from './Cell.styles'

interface CellProps {
  value: string;
  index: number;
  cellMapping?:any;
  onClick: ()=>void
}

export default function Cell({
  value, index, cellMapping, onClick,
}: CellProps) {
  return (
    <TdStyle onClick={onClick} className={`_${index}`} role={`cell${index}`} value={value}>
      {cellMapping ? cellMapping[value] : value}
    </TdStyle>
  )
}
