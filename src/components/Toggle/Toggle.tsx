import { useState } from "react";
import styled from "styled-components";
import colors from "../../assets/styles/colors";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import SvgIcon from "@mui/material/SvgIcon";

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

  text-align: center;

  border: 1px solid ${colors.soft};
  background-color: ${colors.softier};
  color: ${(props) => (props.active ? colors.alert : colors.black)};

  display: flex;
  align-items: center;
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
      {active ? (
          <Close />
      ) : (
          <Add />
      )}
    </ToggleStyle>
  );
};

export default Toggle;
