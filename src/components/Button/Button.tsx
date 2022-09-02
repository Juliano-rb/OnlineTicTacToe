import React from "react";
import styled from "styled-components";
import colors from "../../assets/styles/colors";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variation?: 'confirm' | 'cancel'
}

const Button = styled.button<Props>`
  font-size: 1rem;
  height: 41px;
  min-width: 100px;
  border-radius: 5px;
  cursor: pointer;

  border: none;
  background-color: ${(props) =>
    props.variation === "cancel" ? colors.alert : colors.confirm};
  color: ${colors.white};

  :hover {
    background-color: ${(props) =>
      props.variation === "cancel" ? colors.alertSoft : colors.confirmSoft};
  }
`;

export default Button