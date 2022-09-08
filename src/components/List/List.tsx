import { ReactNode } from 'react'
import styled from 'styled-components'
import _uniqueId from 'lodash/uniqueId'
import colors from '../../assets/styles/colors'
import Button from '../Button'

interface Props {
  title?: string;
  children: ReactNode[];
  action?: { text: string, action: () => void };
}

const ListStyle = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.softier};
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  padding: 4px;

  h1 {
    color: ${colors.main};
    font-size: 1.2rem;
    margin-bottom: 10px;
    margin-top: 4px;
  }

  ul {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 400px;
    overflow-y: scroll;
    padding-right: 4px;
    height: fit-content;

    ::-webkit-scrollbar {
      background: ${colors.shadow};
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${colors.softier};
      width: 5px;
    }
  }

  li {
    margin-bottom: 8px;
    width: 100%;
  }
  li:last-child {
    margin-bottom: 0px;
  }

  width: 100%;
`

function List({ title, action, children }: Props) {
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
      {action
        && (
        <div>
          <Button onClick={() => action.action()}>{action.text}</Button>
        </div>
        )}
    </ListStyle>
  )
}

export default List
