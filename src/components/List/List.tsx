import { ReactNode } from 'react'
import styled from 'styled-components'
import _uniqueId from 'lodash/uniqueId'
import colors from '../../assets/styles/colors'
import Button from '../Button'

interface Props {
  title?: string;
  children: ReactNode[] | ReactNode;
  action?: { text: string, action: () => void };
}

const ListStyle = styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  display: flex;
  flex: 1;
  flex-direction: column;
  /* max-height: 100%; */
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
    overflow-y: scroll;
    padding-right: 4px;

    ::-webkit-scrollbar {
      /* background: ${colors.shadow}; */
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
          {!Array.isArray(children) ? children : children.map((item) => (
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
