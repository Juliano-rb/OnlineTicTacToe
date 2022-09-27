import { BoardProps } from 'boardgame.io/react'
import { useNavigate } from 'react-router-dom'
import { FilteredMetadata } from 'boardgame.io'
import { ReactNode, useEffect, useState } from 'react'
import LobbyApi from '../../api/LobbyApi'
import Toast from '../Toast'
import WaitingPlayers from './WaitingPlayersUI'
import { IGameState } from '../../types/IGameState'
import Playing from './PlayingUI'
import GameOver from './GameOverUI'
import { Container } from './GameScreen.styles'

interface GameScreenProps extends BoardProps<IGameState> {}

type IGameProgression = 'waiting player' | 'playing' | 'game over'

export default function GameScreen({
  ctx, G, moves, matchData, matchID, playerID, credentials,
}: GameScreenProps) {
  const [gameState, setGameState] = useState<IGameProgression>('waiting player')
  const allPlayersConnected = (matchInfo: FilteredMetadata) => matchInfo.every((m) => m.isConnected)

  useEffect(() => {
    if (!matchData) return

    if (!allPlayersConnected(matchData)) {
      setGameState('waiting player')
    } else if (G.matchResult) {
      setGameState('game over')
    } else {
      setGameState('playing')
    }
  }, [G.matchResult, matchData])

  console.log({
    matchData, G, gameState, matchID, playerID,
  })

  const navigate = useNavigate()

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

  const GameProgressionState: { [key in IGameProgression]: ReactNode } = {
    'waiting player': (
      <WaitingPlayers
        matchID={matchID}
        matchName={G.setupData?.matchName || ''}
        playerID={ctx.currentPlayer}
        credentials={credentials}
      />
    ),
    // eslint-disable-next-line quote-props
    'playing': (
      <Playing
        G={G}
        cellValueMapping={cellValueMapping}
        ctx={ctx}
        exitMatchFn={exitMatch}
        moves={moves}
        matchData={matchData}
        playerID={playerID}
      />
    ),
    'game over': (
      <GameOver
        G={G}
        cellValueMapping={cellValueMapping}
        ctx={ctx}
        exitMatchFn={exitMatch}
        matchData={matchData}
        moves={moves}
        credentials={credentials}
        matchID={matchID}
        playerID={playerID}

      />
    ),
  }

  return <Container>{GameProgressionState[gameState]}</Container>
}
