import React from 'react'
import styled from 'styled-components'
import colors from '../../assets/styles/colors'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variation?: 'confirm' | 'cancel' | 'share'
}

const COLORS_MAP = {
  cancel: colors.alert,
  confirm: colors.confirm,
  share: colors.share,
}

const ACTIVE_COLORS_MAP = {
  cancel: colors.alertSoft,
  confirm: colors.confirmSoft,
  share: colors.softier,
}

const Button = styled.button<Props>`
  background-color: ${(props) => (props.variation ? COLORS_MAP[props.variation] : COLORS_MAP.confirm)};
  border: none;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  color: ${colors.white};
  cursor: pointer;

  font-size: 1rem;
  height: 41px;
  min-width: 45px;
  padding-left: 15px;
  padding-right: 15px;

  :active {
    background-color: ${(props) => (props.variation
    ? ACTIVE_COLORS_MAP[props.variation]
    : ACTIVE_COLORS_MAP.confirm)};
  }

  * {
    vertical-align: middle;
  }
`

export default Button
