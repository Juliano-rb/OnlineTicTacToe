import styled from "styled-components";
import colors from "../../../assets/styles/colors";

interface TdProps {
  value: string;
}

const TdStyle = styled.td<TdProps>`
  color: ${(props) => (props.value === "0" ? colors.alert : colors.softier)};
  cursor: pointer;

  width: 4.3rem;
  height: 4.3rem;
  line-height: 4.1rem;
  font-size: 3.2rem;
  box-sizing: border-box;
`;

interface CellProps {
  value: string;
  index: number;
  cellMapping?:any;
  onClick: ()=>void
}

const Cell = ({ value, index, cellMapping, onClick }: CellProps) => {

  return (
    <TdStyle onClick={onClick} className={`_${index}`} role={`cell${index}`} value={value}>
      {cellMapping? cellMapping[value] : value}
    </TdStyle>
  );
};

export default Cell;
