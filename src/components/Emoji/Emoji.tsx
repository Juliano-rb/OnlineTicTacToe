import styled from "styled-components";

const SIZE_MAPPING ={
  small: '1.6rem',
  medium: '2rem',
  large: '3rem',
}

interface ContainerStyleProps {
  size: "small" | "medium" | "large";
}

interface Props {
  emoji: string;
  size?: "small" | "medium" | "large";
  action?: () => void;
}

const Container = styled.div<ContainerStyleProps>`
    font-size: ${props=>SIZE_MAPPING[props.size]};
    cursor: pointer;

    :hover {
      transform: scale(1.1);
      transition: 0.1s ;
    }
`
const Emoji = ({
  emoji,
  action,
  size = 'large'
}: Props) => {
  return (
      <Container size={size}  onClick={() => action && action()}>{emoji}</Container>
  );
};

export default Emoji;