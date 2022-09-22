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

  const getPlayerName = (player: string, matchInfo: FilteredMetadata) => {
    const playerData = matchInfo.find((p) => p.id.toString() === player)

    return playerData?.name
  }

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

  const cellValueMapping: any = { 0: 'X', 1: 'O' }

  const currentPlayerName = getPlayerName(ctx.currentPlayer, matchData)
  console.log(currentPlayerName)
  return allPlayersConnected(matchData) ? (
    <>
      <Button variation='cancel' onClick={exitMatch}>
        Sair
      </Button>
      <div>
        Vez de {cellValueMapping && cellValueMapping[ctx.currentPlayer]}
        {' - '}
        {currentPlayerName}
      </div>

      <Board
        victoryLine={ctx.gameover?.victoryData}
        player={ctx.currentPlayer}
        // setPlayer={setPlayer}
        // setCells={setCells}
        moveFunction={moves.clickCell}
        cells={G.cells}
        valueMapping={cellValueMapping}
      />
    </>
  ) : (
    <WaitingPlayers
      matchID={matchID}
      matchName={G.setupData?.matchName || ''}
      playerID={ctx.currentPlayer}
      credentials={credentials}
    />
  )
}
