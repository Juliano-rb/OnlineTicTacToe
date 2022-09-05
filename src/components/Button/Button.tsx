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

const ACTIVE_COLORS_MAP = {
  cancel: colors.alertSoft,
  confirm: colors.confirmSoft,
  share: colors.softier,
};

const Button = styled.button<Props>`
  font-size: 1rem;
  height: 41px;
  min-width: 45px;
  border-radius: 5px;
  cursor: pointer;

  border: none;
  background-color: ${(props) =>
    props.variation ? COLORS_MAP[props.variation] : COLORS_MAP.confirm};
  color: ${colors.white};

  :active {
    background-color: ${(props) =>
      props.variation
        ? ACTIVE_COLORS_MAP[props.variation]
        : ACTIVE_COLORS_MAP.confirm};
  }

  * {
    vertical-align: middle;
  }
`;

export default Button