import { useState } from 'react'
import PlayArrow from '@mui/icons-material/PlayArrowRounded'
import { Container, SmallBtn } from './Switch.styles'

interface SwitchProps {
  options: string[];
  setOption: (value: string) => void;
}

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
      <SmallBtn style={{ transform: 'rotate(180deg)' }} onClick={() => prev()}>
        <PlayArrow />
      </SmallBtn>
      <div>{currOption}</div>
      <SmallBtn onClick={() => next()}>
        <PlayArrow />
      </SmallBtn>
    </Container>
  )
}

export default Switch
