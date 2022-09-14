import { BoardProps } from 'boardgame.io/react'
import { useNavigate } from 'react-router-dom'
import { FilteredMetadata } from 'boardgame.io'
import Board from '../Board'
import Button from '../Button'
import LobbyApi from '../../api/LobbyApi'
import Toast from '../Toast'
import { TicTacToeState } from '../../game/Game'
import WaitingPlayers from './WaitingPlayersUI'

interface GameScreenProps extends BoardProps<TicTacToeState> {}

export default function GameScreen({
  ctx, G, moves, matchData, matchID, playerID, credentials,
}: GameScreenProps) {
  const navigate = useNavigate()

  const allPlayersConnected = (matchInfo: FilteredMetadata) => matchInfo.every((m) => m.isConnected)

  if (!matchID || !playerID || !credentials || !matchData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Toast title='Erro' description='Ocorreu um erro ao carregar a página' />
      </div>
    )
  }

  const exitMatch = async () => {
    await LobbyApi.leaveMatch(matchID, playerID, credentials)
    navigate('/')
  }
  return allPlayersConnected(matchData) ? (
    <>
      <Button variation='cancel' onClick={exitMatch}>
        Sair
      </Button>
      <Board
        player={ctx.currentPlayer}
        // setPlayer={setPlayer}
        // setCells={setCells}
        moveFunction={moves.clickCell}
        cells={G.cells}
        valueMapping={{ 0: 'X', 1: 'O' }}
      />
    </>
  ) : (
    <WaitingPlayers
      matchID={matchID}
      matchName={G.setupData.matchName}
      playerID={ctx.currentPlayer}
      credentials={credentials}
    />
  )
}
