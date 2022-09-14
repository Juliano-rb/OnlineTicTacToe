import styled from 'styled-components'
import colors from '../../assets/styles/colors'

interface Props {
  title: string;
  description: string;
  variation?: 'warn' | 'error';
}

interface StyleProps {
  variation: 'warn' | 'error';
}

const COLOR_MAPPING = {
  warn: colors.softier,
  error: colors.alert,
}

const ToastStyle = styled.div<StyleProps>`
  align-items: center;
  background-color: ${colors.white};
  border: none;
  border-radius: 4px;

  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  column-gap: 10px;
  display: flex;

  height: 45px;
  justify-content: start;
  padding: 8px;
  padding-left: 8px;

  padding-right: 8px;

  span {
    color: ${(props) => COLOR_MAPPING[props.variation]};
    font-size: 0.9rem;
  }
  p {
    color: ${colors.main};
    font-size: 0.9rem;
  }

  width: 320px;
`

function Toast({ title, description, variation = 'warn' }: Props) {
  return (
    <ToastStyle variation={variation}>
      <span>{title}</span>
      <p>{description}</p>
    </ToastStyle>
  )
}

export default Toast
