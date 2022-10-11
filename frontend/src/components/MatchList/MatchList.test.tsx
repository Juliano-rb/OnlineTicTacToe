import { render, screen } from '@testing-library/react'
import _uniqueId from 'lodash/uniqueId'
import List from './MatchList'
import ClickableItem from '../ClickableItem'

describe('List', () => {
  test('renders List', () => {
    const title = 'Matches list'
    const children = [
      <ClickableItem
        title='Flavinho do Pneu'
        actionText='Entrar'
        key={_uniqueId()}
      />,
      <ClickableItem
        title='Shaolim matador de porco'
        actionText='Entrar'
        key={_uniqueId()}
      />,
    ]

    render(<List title={title}>{children}</List>)

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText('Flavinho do Pneu')).toBeInTheDocument()
    expect(screen.getByText('Shaolim matador de porco')).toBeInTheDocument()
    expect(screen.getAllByText('Entrar').length).toBe(children.length)
  })
})
