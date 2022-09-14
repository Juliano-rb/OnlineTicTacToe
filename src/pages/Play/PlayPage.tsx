import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import { TicTacToe } from '../../game/Game'
import GameScreen from '../../components/GameScreen'
import variables from '../../variables'
import { useGetStorage } from '../../hooks/useGetStorage'

const GameClient = Client({
  game: TicTacToe,
  board: GameScreen,
  debug: true,
  multiplayer: SocketIO({ server: variables.serverURL }),
})

function PlayPage() {
  const {
    matchID, credentials, playerID,
  } = useGetStorage()

  console.log('matchID, credentials, playerID', matchID, credentials, playerID)

  return (
    <GameClient
      matchID={matchID}
      playerID={playerID}
      // playerID={localStorage.getItem('id')}
      credentials={credentials}
    />
  )
}

export default PlayPage
