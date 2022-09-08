import styled from 'styled-components'
import colors from '../../../assets/styles/colors'

interface TdProps {
  value: string;
}

const TdStyle = styled.td<TdProps>`
  box-sizing: border-box;
  color: ${(props) => (props.value === '0' ? colors.alert : colors.softier)};

  cursor: pointer;
  font-size: 3.2rem;
  height: 4.3rem;
  line-height: 4.1rem;
  width: 4.3rem;
`

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
