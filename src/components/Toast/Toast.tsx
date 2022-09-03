import styled from "styled-components";
import colors from "../../assets/styles/colors";

interface Props {
  title: string;
  description: string;
}

const ToastStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: start;
  column-gap: 10px;

  padding: 8px;
  padding-left: 8px;
  padding-right: 8px;

  width: 320px;
  height: 45px;
  border-radius: 4px;
  border: none;

  background-color: ${colors.white};

  span {
    font-size: 0.9rem;
    color: ${colors.softier};
  }
  p {
    font-size: 0.9rem;
    color: ${colors.main};
  }

  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
`;

const Toast = ({ title, description }: Props) => {
  return (
    <ToastStyle>
      <span>{title}</span>
      <p>{description}</p>
    </ToastStyle>
  );
};

export default Toast;
