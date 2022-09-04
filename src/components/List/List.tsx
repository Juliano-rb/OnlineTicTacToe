import { ReactNode } from "react";
import styled from "styled-components";
import colors from "../../assets/styles/colors";
import _uniqueId from 'lodash/uniqueId'
import Button from "../Button";

interface Props {
  title?: string;
  children: ReactNode[];
  action?: { text: string, action: () => void };
}

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 300px;
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
    max-height: 245px;
    overflow-y: scroll;
    padding-right: 4px;

    ::-webkit-scrollbar {
      width: 5px;
      background: ${colors.shadow};
    }

    ::-webkit-scrollbar-thumb {
      width: 5px;
      background: ${colors.softier};
    }
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

const List = ({ title, action, children }: Props) => {
  return (
    <ListStyle>
      <div>
        {title && <h1>{title}</h1>}
        <ul>
          {children.map((item) => (
            <li key={_uniqueId()}>{item}</li>
          ))}
        </ul>
      </div>
      {action &&
        <div>
          <Button onClick={() => action.action()}>{action.text}</Button>
        </div>
      }
    </ListStyle>
  );
};

export default List;
