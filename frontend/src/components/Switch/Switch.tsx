import PlayArrow from '@mui/icons-material/PlayArrowRounded'
import { Container, SmallBtn } from './Switch.styles'

interface SwitchProps {
  options: string[];
  option: string;
  setOption: (value: any) => void;
}

function Switch({ options, option, setOption }: SwitchProps) {
  if (!option) setOption(options[0])

  const next = () => {
    let actual = options.indexOf(option)
    if (actual < 0) actual = 0
    let nextIndex = actual + 1
    if (nextIndex >= options.length) nextIndex = 0

    const value = options[nextIndex]
    setOption(value)
  }

  const prev = () => {
    let actual = options.indexOf(option)
    if (actual < 0) actual = 0

    let nextIndex = actual - 1
    if (nextIndex < 0) nextIndex = options.length - 1

    const value = options[nextIndex]
    setOption(value)
  }

  return (
    <Container>
      <SmallBtn style={{ transform: 'rotate(180deg)' }} onClick={() => prev()}>
        <PlayArrow />
      </SmallBtn>
      <div>{option}</div>
      <SmallBtn onClick={() => next()}>
        <PlayArrow />
      </SmallBtn>
    </Container>
  )
}

export default Switch
