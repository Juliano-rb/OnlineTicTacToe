import { useState } from "react";
import styled from "styled-components";
import colors from "../../assets/styles/colors";
import PersonAdd from "@mui/icons-material/PersonAddAlt1";

interface ToggleProps{
  onChange?: (active: boolean)=>void;
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

const ToggleStyle = styled.button<Props>`
  font-size: 1.2rem;
  height: 41px;
  width: 41px;
  border-radius: 41px;
  padding: 0;
  cursor: pointer;

  text-align: center;
  svg{
    margin: 0 auto;
  }

  border: 1px solid ${colors.confirm};
  background-color: ${(props) => (props.active ? colors.shadow : colors.white)};

  display: flex;
  align-items: center;

  ${(props) =>
    props.active
      ? "box-shadow: inset 0px 2px 1px rgba(0, 0, 0, 0.5);"
      : "filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));"}
`;

const Toggle = ({ onChange }: ToggleProps) => {
  const [active, setActive] = useState<boolean>(false)

  const handleChange = ()=>{
    const newValue = !active;
    setActive(newValue);
    onChange && onChange(newValue);
  }

  return (
    <ToggleStyle active={active} onClick={handleChange}>
      <PersonAdd
        color="info"
        style={{ fontSize: active ? "1.35rem" : "1.43rem" }}
      />
    </ToggleStyle>
  );
};

export default Toggle;
