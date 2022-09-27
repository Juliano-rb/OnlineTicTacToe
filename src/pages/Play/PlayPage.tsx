import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import styled from 'styled-components'
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

export const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  max-width: 450px;
  vertical-align: center;
  .bgio-client {
    height: 100%;
    width: 100%;
  }
`

function PlayPage() {
  const {
    matchID, credentials, playerID,
  } = useGetStorage()

  console.log('matchID, credentials, playerID', matchID, credentials, playerID)

  return (
    <Container>
      <GameClient
        matchID={matchID}
        playerID={playerID}
        // playerID={localStorage.getItem('id')}
        credentials={credentials}
      />
    </Container>
  )
}

export default PlayPage
