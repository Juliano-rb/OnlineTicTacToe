import { IVictory as IVictoryLine } from './VictoryLine'

const getVictoryLine = (winningPositionIndex: number, winningPlayer: string): IVictoryLine => {
  const allPositions: IVictoryLine[] = [
    {
      position: 'top',
      rotation: '0',
      winner: winningPlayer,
    },
    {
      position: 'middle',
      rotation: '0',
      winner: winningPlayer,
    },
    {
      position: 'bottom',
      rotation: '0',
      winner: winningPlayer,
    },
    {
      position: 'left',
      rotation: '90deg',
      winner: winningPlayer,
    },
    {
      position: 'middle',
      rotation: '90deg',
      winner: winningPlayer,
    },
    {
      position: 'right',
      rotation: '90deg',
      winner: winningPlayer,
    },
    {
      position: 'middle',
      rotation: '45deg',
      winner: winningPlayer,
    },
    {
      position: 'middle',
      rotation: '-45deg',
      winner: winningPlayer,
    },
  ]

  return allPositions[winningPositionIndex]
}

// Return a setup for a 'victory stroke' if `cells` is in a winning configuration. False else where
export function IsVictory(cells: (null | string)[], player: string): IVictoryLine | null {
  const winningPlayer = player === '0' ? '1' : '0'

  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const isRowComplete = (row: number[]) => {
    const symbols = row.map((i) => cells[i])
    return symbols.every((i) => !!i && i === symbols[0])
  }

  const winningPosition = positions.map(isRowComplete).indexOf(true)

  if (winningPosition === -1) return null

  const victoryLine = getVictoryLine(winningPosition, winningPlayer)

  return victoryLine
}
