import styled from "styled-components";
import colors from "../../assets/styles/colors";

const Input = styled.input`
  height: 45px;
  width: 202px;

  font-size: 1rem;
  color: ${colors.main};

  border: solid 1px ${colors.main};

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${colors.smooth};
    opacity: 1; /* Firefox */
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${colors.smooth};
  }
`;

export default Input