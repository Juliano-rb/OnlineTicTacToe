// import { useState } from 'react'
import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import { TicTacToe } from '../../game/Game'
// import { BoardProps } from 'boardgame.io/react'
import { TicTacToeBoard } from '../../game/TicTacToeBoard'
import variables from '../../variables'
import { useQueryParams } from '../../hooks/useQueryParams'

// import { TicTacToeState } from '../../Game'

// interface TicTacToeProps extends Partial<BoardProps><TicTacToeState> {}
const CoupClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  debug: true,
  multiplayer: SocketIO({ server: variables.serverURL }),
})

function PlayPage() {
  const query = useQueryParams()
  const playerId = query.get('playerID') || ''
  const credentials = query.get('token') || ''
  const matchId = query.get('match') || ''

  // const [cells, setCells] = useState<string[]>(Array(8).fill(''))
  // const [player, setPlayer] = useState<string>('0')

  return (
    <CoupClient
      matchID={matchId}
      playerID={playerId}
      // playerID={localStorage.getItem('id')}
      credentials={credentials}
    />
  // <Board
  //   player={player}
  //   setPlayer={setPlayer}
  //   setCells={setCells}
  //   cells={cells}
  //   valueMapping={{ 0: 'X', 1: 'O' }}
  // />
  )
}

export default PlayPage
