import styled from 'styled-components'
import colors from '../../assets/styles/colors'

export const Container = styled.div`
  align-items: center;
  background-color: white;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  color: ${colors.confirm};
  cursor: pointer;
  display: flex;

  height: 45px;
  justify-content: space-between;
  width: 248px;

  div {
    font-size: 1rem;
  }
`

export const SmallBtn = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  text-align: center;
  width: 40px;

  svg {
    font-size: 2.5rem;
    border-radius: 10px;
  }

  :active {
    background-color: ${colors.shadow};
  }

  ::before {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
`
