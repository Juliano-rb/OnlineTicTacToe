import styled from "styled-components";
import colors from "../../assets/styles/colors";

interface CardStyleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "normal" | "large";
}

interface Props extends CardStyleProps {
  text: string;
}

const CardStyle = styled.div<CardStyleProps>`
  color: ${colors.main};
  font-size: 0.8rem;
  background-color: ${colors.white};
  width: fit-content;
  border-radius: 4px;
  padding: ${props=>props.size === 'large'? '16px' :'10px'} ;

  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

const Card = ({ text, size }: Props) => {
  return <CardStyle size={size}>{text}</CardStyle>;
};

export default Card;
