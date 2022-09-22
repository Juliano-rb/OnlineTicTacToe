import { BoardProps } from 'boardgame.io/react'
import { useNavigate } from 'react-router-dom'
import { FilteredMetadata } from 'boardgame.io'
import { useEffect } from 'react'
import Board from '../Board'
import Button from '../Button'
import LobbyApi from '../../api/LobbyApi'
import Toast from '../Toast'
import WaitingPlayers from './WaitingPlayersUI'
import { useJoinMatch } from '../../pages/Home/GameModes/Actions'
import { IGameState } from '../../types/IGameState'

interface GameScreenProps extends BoardProps<IGameState> {}

export default function GameScreen({
  ctx, G, moves, matchData, matchID, playerID, credentials,
}: GameScreenProps) {
  // TODO: refactor all of this rematch stuff
  const joinMatch = useJoinMatch()

  const newMatchID = G.gameOver?.newMatchID || ''
  const playAgain = G.gameOver?.playAgain || ''

  const getPlayerName = (player: string, matchInfo?: FilteredMetadata) => {
    const playerData = matchInfo?.find((p) => p.id.toString() === player)

    return playerData?.name
  }

  const currentPlayerName = getPlayerName(ctx.currentPlayer, matchData)

  useEffect(() => {
    if (!credentials || !playerID || !currentPlayerName) return

    const joinNewMatch = async (nextMatch: string) => {
      try {
        await LobbyApi.leaveMatch(matchID, playerID, credentials)
      } catch (error) {
        console.log(error)
      }
      joinMatch(nextMatch, playerID, '👩🏿')
    }

    const createAndJoin = async () => {
      try {
        const nextMatchID = await LobbyApi.createMath(currentPlayerName)
        moves.setNewMatchID(nextMatchID)
        await joinNewMatch(nextMatchID)
      } catch (error) {
        console.log(error)
      }
    }

    if (playAgain.length === ctx.numPlayers) {
      if (!newMatchID && playerID === playAgain[0]) {
        createAndJoin()
      } else if (newMatchID && playerID !== playAgain[0]) {
        joinNewMatch(newMatchID)
      }
    }
  }, [
    credentials,
    ctx.numPlayers,
    currentPlayerName,
    joinMatch,
    matchID,
    moves,
    newMatchID,
    playAgain,
    playerID,
  ])

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

  const cellValueMapping: any = { 0: 'X', 1: 'O' }

  return allPlayersConnected(matchData) ? (
    <>
      <Button variation='cancel' onClick={exitMatch}>
        Sair
      </Button>
      {G.matchResult?.winner ? (
        <Button variation='cancel' onClick={() => moves.playAgain(playerID)}>
          Jogar de novo
        </Button>
      ) : null}
      <div>
        Vez de {cellValueMapping && cellValueMapping[ctx.currentPlayer]}
        {' - '}
        {currentPlayerName}
      </div>

      <Board
        victoryLine={G.matchResult?.winner?.victoryData}
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
