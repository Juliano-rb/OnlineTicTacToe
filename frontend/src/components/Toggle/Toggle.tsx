import { useState } from 'react'
import styled from 'styled-components'
import PersonAdd from '@mui/icons-material/PersonAddAlt1'
import colors from '../../assets/styles/colors'

interface ToggleProps{
  onChange?: (active: boolean)=>void;
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

const ToggleStyle = styled.button<Props>`
  align-items: center;
  background-color: ${(props) => (props.active ? colors.shadow : colors.white)};
  border: 1px solid ${colors.confirm};
  border-radius: 41px;
  cursor: pointer;
  display: flex;

  font-size: 1.2rem;
  svg{
    margin: 0 auto;
  }

  height: 41px;
  padding: 0;

  text-align: center;
  width: 41px;

  ${(props) => (props.active
    ? 'box-shadow: inset 0px 2px 1px rgba(0, 0, 0, 0.5);'
    : 'filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));')}
`

function Toggle({ onChange }: ToggleProps) {
  const [active, setActive] = useState<boolean>(false)

  const handleChange = () => {
    const newValue = !active
    setActive(newValue)
    onChange?.(newValue)
  }

  return (
    <ToggleStyle active={active} onClick={handleChange}>
      <PersonAdd
        color='info'
        style={{ fontSize: active ? '1.35rem' : '1.43rem' }}
      />
    </ToggleStyle>
  )
}

export default Toggle
