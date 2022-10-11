import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import { TicTacToe } from '../../game/Game'
import GameScreen from '../../components/GameScreen'
import variables from '../../variables'
import { useGetStorage } from '../../hooks/useGetStorage'
import { Container } from './PlayPage.styles'

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

  return (
    <Container>
      <GameClient
        matchID={matchID}
        playerID={playerID}
        credentials={credentials}
      />
    </Container>
  )
}

export default PlayPage
