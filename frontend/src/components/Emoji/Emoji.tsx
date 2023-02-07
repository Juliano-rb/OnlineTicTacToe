import styled from 'styled-components'

const SIZE_MAPPING = {
  small: '1.6rem',
  medium: '2rem',
  large: '3rem',
}

interface ContainerStyleProps {
  size: 'small' | 'medium' | 'large';
}

interface Props {
  emoji: string;
  size?: 'small' | 'medium' | 'large';
  action?: () => void;
}

const Container = styled.div<ContainerStyleProps>`
  cursor: pointer;
  display: inline-block;

  :active {
    transform: scale(1.1);
    transition: 0.1s;
  }

  font-size: ${(props) => SIZE_MAPPING[props.size]};

  text-shadow: 5px 4px 4px rgb(0 0 0 / 25%);
`
function Emoji({
  emoji,
  action,
  size = 'large',
}: Props) {
  return (
    <Container size={size} onClick={() => action?.()}>{emoji}</Container>
  )
}

export default Emoji
