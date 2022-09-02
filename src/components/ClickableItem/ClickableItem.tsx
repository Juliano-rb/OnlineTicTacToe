
import React from "react";
import styled from "styled-components";
import colors from "../../assets/styles/colors";
import Button from "../Button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  actionText?: string;
  action?: ()=>void
}

const ClickableItemStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  padding-left: 8px;

  width: 100%;
  border-radius: 4px;

  border: none;
  background-color: ${colors.white};
  color: ${colors.main};

  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);

  :hover {
    background-color: ${colors.shadow};
  }

  span {
    font-size: 0.9rem;
  }
`;

const ClickableItem = ({title, actionText, action}:Props) =>{
    return (
      <ClickableItemStyle>
        <span>{title}</span>
        <Button onClick={action}>{actionText}</Button>
      </ClickableItemStyle>
    );
}

export default ClickableItem;