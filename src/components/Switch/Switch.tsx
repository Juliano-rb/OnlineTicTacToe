import { useState } from 'react'
import styled from 'styled-components'
import colors from '../../assets/styles/colors'

interface SwitchProps{
  options: string[],
  setOption: (value: string)=>void
}

const Container = styled.div`
  align-items: center;
  background-color: white;
  border: none;
  border-radius: 5px;
  color: ${colors.confirm};
  cursor: pointer;

  display: flex;

  height: 36px;
  justify-content: space-between;
  width: 202px;

  div{
    font-size: 0.9rem;
  }
`

const BtnStyle = styled.div`
  height: 100%;
  text-align: center;
  width: 31px;

  :active{
    background-color: ${colors.shadow};
  }

  ::before {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
`

function Switch({ options, setOption }: SwitchProps) {
  const [currOption, setCurrOption] = useState<string>(options[0])

  const next = () => {
    const actual = options.indexOf(currOption)
    let nextIndex = actual + 1
    if (nextIndex >= options.length) nextIndex = 0

    const value = options[nextIndex]
    setCurrOption(value)
    setOption(value)
  }

  const prev = () => {
    const actual = options.indexOf(currOption)
    let nextIndex = actual - 1
    if (nextIndex < 0) nextIndex = options.length - 1

    const value = options[nextIndex]
    setCurrOption(value)
    setOption(value)
  }

  return (
    <Container>
      <BtnStyle onClick={() => prev()}>{'<'}</BtnStyle>
      <div>
        {currOption}
      </div>
      <BtnStyle onClick={() => next()}>{'>'}</BtnStyle>
    </Container>
  )
}

export default Switch
