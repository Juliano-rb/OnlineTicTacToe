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
  ctx,
  G,
  moves,
  matchData,
  matchID,
  playerID,
  credentials,
  sendChatMessage,
  chatMessages,
}: GameScreenProps) {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState<IGameProgression>('waiting player')
  const allPlayersConnected = (matchInfo: FilteredMetadata) => matchInfo.every((m) => m.isConnected)
  const cellValueMapping = { 0: 'X', 1: 'O' }

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

  if (!(((matchID && playerID ) && credentials ) && matchData)) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Toast title='Erro' description='Ocorreu um erro ao carregar a página' />
      </div>
    )
  }

  const exitMatch = async () => {
    try {
      await LobbyApi.leaveMatch(matchID, playerID, credentials)
    } catch (error) {
      // console.log(error)
    } finally {
      navigate('/')
    }
  }

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
        sendChatMessage={sendChatMessage}
        chatMessages={chatMessages}
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
        sendChatMessage={sendChatMessage}
        chatMessages={chatMessages}
      />
    ),
  }

  return <Container>{GameProgressionState[gameState]}</Container>
}
