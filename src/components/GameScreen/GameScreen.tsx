import { BoardProps } from 'boardgame.io/react'
import { useNavigate } from 'react-router-dom'
import Board from '../Board'
import Button from '../Button'
import LobbyApi from '../../api/LobbyApi'
import Toast from '../Toast'
import { TicTacToeState } from '../../game/Game'

interface GameScreenProps extends BoardProps<TicTacToeState> {}

export default function GameScreen({
  ctx, G, moves, matchData, matchID, playerID, credentials,
}: GameScreenProps) {
  console.log('matchData', matchData)
  const navigate = useNavigate()

  if (!matchID || !playerID || !credentials) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Toast title='Erro' description='Ocorreu um erro ao carregar a página' />
      </div>
    )
  }

  const exitMatch = () => {
    LobbyApi.leaveMatch(matchID, playerID, credentials)
    navigate('/')
  }
  return (
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
  )
}
