import { ReactNode } from 'react'
import _uniqueId from 'lodash/uniqueId'
import Button from '../Button'
import { Container } from './MatchList.styles'

interface Props {
  title?: string;
  children?: ReactNode[];
  action?: { text: string, action: () => void };
  isLoading?: boolean;
}

function MatchList({
  title, action, children, isLoading,
}: Props) {
  const returnList = (child: ReactNode[]) => {
    if (child.length === 0) return <li><span>Não existem jogos criados</span></li>
    return child.map((item) => <li key={_uniqueId()}>{item}</li>)
  }
  return (
    <Container>
      <div>
        {title && <h1>{title}</h1>}
        {isLoading ? (
          <ul>
            <li>
              <span>Carregando oponentes...</span>
            </li>
          </ul>
        ) : (
          <ul>{children && returnList(children)}</ul>
        )}
      </div>
      {action && (
        <div>
          <Button onClick={() => action.action()}>{action.text}</Button>
        </div>
      )}
    </Container>
  )
}

export default MatchList
