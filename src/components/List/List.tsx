import { ReactNode } from "react";
import styled from "styled-components";
import colors from "../../assets/styles/colors";
import _uniqueId from 'lodash/uniqueId'

interface Props {
  title: string;
  children: ReactNode[];
}

const ListStyle = styled.div`
  width: 100%;
  border-radius: 4px;
  border: 1px solid ${colors.softier};
  background-color: ${colors.white};
  padding: 4px;

  h1{
    color: ${colors.main};
    margin-top: 4px;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  li {
    width: 100%;
    margin-bottom: 8px;
  }
  li:last-child {
    margin-bottom: 0px;
  }

  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
`;

const List = ({title, children}:Props) => {
  return (
    <ListStyle>
      <h1>{title}</h1>
      <ul>
        {children.map((item) => (
          <li key={_uniqueId()}>{item}</li>
        ))}
      </ul>
    </ListStyle>
  );
};

export default List;
