import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlayerHub from './PlayerHub'

describe('PlayerHub', () => {
  const avatar = '👨‍🦰'
  const name = 'John'
  const messageDuration = 500

  test('renders PlayerHub', () => {
    render(
      <PlayerHub
        avatar={avatar}
        name={name}
        messageDuration={messageDuration}
      />,
    )

    expect(screen.getByText(avatar)).toBeInTheDocument()
    expect(screen.getByText(name)).toBeInTheDocument()
    expect(screen.queryByTestId('message')).not.toBeInTheDocument()
  })

  test('open reactionList when click on avatar', async () => {
    render(
      <PlayerHub
        avatar={avatar}
        name={name}
        messageDuration={messageDuration}
      />,
    )

    await userEvent.click(screen.getByText(avatar))

    expect(screen.getByText('Você é bom!')).toBeInTheDocument()
    expect(screen.getByText('Uau!!')).toBeInTheDocument()
    expect(screen.getByText('😎')).toBeInTheDocument()
    expect(screen.getByText('🤛')).toBeInTheDocument()
  })

  test.each(['Você é bom!', 'Uau!!', '😎', '🤛'])(
    'should call action() when click in reaction %s',
    async (reaction) => {
      const actionMock = jest.fn()

      render(
        <PlayerHub
          action={actionMock}
          avatar={avatar}
          name={name}
          messageDuration={messageDuration}
        />,
      )

      userEvent.click(screen.getByText(avatar))

      const reactButton = screen.getByText(reaction)
      userEvent.click(reactButton)
      expect(reactButton).not.toBeInTheDocument()

      expect(actionMock).toHaveBeenCalledWith(reaction)
    },
  )
})
