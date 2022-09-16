import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Board from './Board'

describe('Board', () => {
  // TODO: write test to test if victoryLine is rendering
  test('should renders Board', () => {
    let cells: string[] = Array(9).fill('')
    let player = '0'
    const setPlayer = (data: string) => {
      player = data
    }
    const setCells = (data: string[]) => {
      cells = data
    }

    render(
      <Board
        cells={cells}
        player={player}
        setPlayer={setPlayer}
        setCells={setCells}
      />,
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.queryByText('0')).not.toBeInTheDocument()
    expect(screen.queryByText('1')).not.toBeInTheDocument()
  })

  test.each([
    ['0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '1', '1', '1', '1', '1', '1', '1', '1'],
    ['0', '1', '', '0', '1', '', '0', '1', ''],
  ])('should render correnctly cells %i', async (...cells) => {
    const player = '0'
    const setPlayer = jest.fn()
    const setCells = jest.fn()

    render(
      <Board
        cells={cells}
        player={player}
        setPlayer={setPlayer}
        setCells={setCells}
      />,
    )

    expect(screen.getByRole('table')).toBeInTheDocument()

    expect(screen.getByRole(`cell${0}`)).toHaveTextContent(cells[0])
    expect(screen.getByRole(`cell${1}`)).toHaveTextContent(cells[1])
    expect(screen.getByRole(`cell${2}`)).toHaveTextContent(cells[2])
    expect(screen.getByRole(`cell${3}`)).toHaveTextContent(cells[3])
    expect(screen.getByRole(`cell${4}`)).toHaveTextContent(cells[4])
    expect(screen.getByRole(`cell${5}`)).toHaveTextContent(cells[5])
    expect(screen.getByRole(`cell${6}`)).toHaveTextContent(cells[6])
    expect(screen.getByRole(`cell${7}`)).toHaveTextContent(cells[7])
    expect(screen.getByRole(`cell${8}`)).toHaveTextContent(cells[8])
  })

  test.each([[0, 1, 2, 3, 4, 5, 6, 7, 8]])(
    "should call setPlayer('1') and setCells when movement with player 1",
    async (index: number) => {
      const cells: string[] = Array(9).fill('')
      let player = '0'
      const setPlayer = jest.fn()
      const setCells = jest.fn()

      render(
        <Board
          cells={cells}
          player={player}
          setPlayer={setPlayer}
          setCells={setCells}
        />,
      )

      expect(screen.getByRole('table')).toBeInTheDocument()

      userEvent.click(screen.getByRole(`cell${index}`))
      cells[index] = player
      player = player === '0' ? '1' : '0'

      expect(setPlayer).toHaveBeenCalledTimes(1)
      expect(setCells).toHaveBeenCalledTimes(1)

      expect(setPlayer).toHaveBeenCalledWith(player)
      expect(setCells).toHaveBeenCalledWith(cells)
    },
  )

  test.each([[0, 1, 2, 3, 4, 5, 6, 7, 8]])(
    "should call setPlayer('0') and setCells when new movement with player 0",
    async (index: number) => {
      const cells: string[] = Array(9).fill('')
      let player = '1'
      const setPlayer = jest.fn()
      const setCells = jest.fn()

      render(
        <Board
          cells={cells}
          player={player}
          setPlayer={setPlayer}
          setCells={setCells}
        />,
      )

      expect(screen.getByRole('table')).toBeInTheDocument()

      userEvent.click(screen.getByRole(`cell${index}`))
      cells[index] = player
      player = player === '0' ? '1' : '0'

      expect(setPlayer).toHaveBeenCalledTimes(1)
      expect(setCells).toHaveBeenCalledTimes(1)

      expect(setPlayer).toHaveBeenCalledWith(player)
      expect(setCells).toHaveBeenCalledWith(cells)
    },
  )
})
