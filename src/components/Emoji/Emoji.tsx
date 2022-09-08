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
    font-size: ${(props) => SIZE_MAPPING[props.size]};

    :active {
      transform: scale(1.1);
      transition: 0.1s ;
    }
`
function Emoji({
  emoji,
  action,
  size = 'large',
}: Props) {
  return (
    <Container size={size} onClick={() => action && action()}>{emoji}</Container>
  )
}

export default Emoji
