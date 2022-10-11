import styled from 'styled-components'
import colors from '../../assets/styles/colors'

const Input = styled.input`
  border: solid 1px ${colors.main};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  color: ${colors.main};
  font-size: 1rem;
  height: 45px;
  width: 248px;

  :focus {
    background-color: ${colors.smooth};
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${colors.smooth};
    opacity: 1; /* Firefox */
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${colors.smooth};
  }
`

export default Input
