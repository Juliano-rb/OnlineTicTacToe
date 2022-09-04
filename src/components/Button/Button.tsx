import React from "react";
import styled from "styled-components";
import colors from "../../assets/styles/colors";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variation?: 'confirm' | 'cancel' | 'share'
}

const COLORS_MAP = {
  cancel: colors.alert,
  confirm: colors.confirm,
  share: colors.share
}

const Button = styled.button<Props>`
  font-size: 1rem;
  height: 41px;
  min-width: 100px;
  border-radius: 5px;
  cursor: pointer;

  border: none;
  background-color: ${(props) => props.variation? COLORS_MAP[props.variation] : COLORS_MAP.confirm};
  color: ${colors.white};

  :active {
    background-color: ${(props) =>
      props.variation === "cancel" ? colors.alertSoft : colors.confirmSoft};
  }

  * {
    vertical-align: middle;
  }
`;

export default Button