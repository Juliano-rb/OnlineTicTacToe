import styled from "styled-components";
import colors from "../../assets/styles/colors";

const Title = styled.h1`
  color: ${colors.alert};

  font-family: "Bangers";
  font-size: 5rem;

  text-shadow: 5px 4px 4px rgba(0, 0, 0, 0.25);

  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: ${colors.highlight};
`;

export default Title