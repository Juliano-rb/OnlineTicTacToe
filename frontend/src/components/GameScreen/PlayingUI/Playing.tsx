import { ChatMessage, Ctx, FilteredMetadata } from 'boardgame.io'
import { useEffect, useRef } from 'react'
import PlayerSymbol from '../../PlayerSymbol'
import { IGameState } from '../../../types/IGameState'
import Button from '../../Button'
import Board from '../../Board'
import PlayerHub from '../../PlayerHub'
import { useGetOpponent, useGetPlayer } from '../../../hooks/useGetPlayer'
import { PlayerControllsContainer } from '../GameScreen.styles'
import { PlayerHubHandle } from '../../PlayerHub/PlayerHub'
import TurnInfo from '../../TurnInfo'
import { PanelContainer } from './Playing.styles'

interface IPlaying {
  exitMatchFn: () => void;
  G: IGameState;
  ctx: Ctx;
  playerID: string;
  matchData: FilteredMetadata;
  moves: Record<string, (...args: any[]) => void>;
  cellValueMapping: { [key: string]: string };
  sendChatMessage: (message: any) => void;
  chatMessages: ChatMessage[];
}

export default function Playing({
  exitMatchFn,
  cellValueMapping,
  G,
  moves,
  ctx,
  matchData,
  playerID,
  chatMessages,
  sendChatMessage,
}: IPlaying) {
  const currentPlayer = useGetPlayer(ctx.currentPlayer, matchData)
  const player = useGetPlayer(playerID, matchData)
  const opponent = useGetOpponent(playerID, matchData)
  const opponentHubRef = useRef<PlayerHubHandle>(null)
  const playerHubRef = useRef <PlayerHubHandle>(null)

  useEffect(() => {
    const totalMessages = chatMessages.length
    if (!totalMessages) return

    const lastMessage = chatMessages[totalMessages - 1]
    if (lastMessage.sender === playerID) {
      playerHubRef.current?.receiveNewMessage(lastMessage.payload)
      return
    }

    opponentHubRef.current?.receiveNewMessage(lastMessage.payload)
  }, [chatMessages, playerID])

  useEffect(() => {
    try {
      window.navigator.vibrate(200)
    } catch (error) {
      // console.error(error)
      alert(error)
    }
  }, [currentPlayer.id])

  return (
    <>
      <PlayerControllsContainer active={currentPlayer.id === opponent.id}>
        <PlayerHub
          ref={opponentHubRef}
          avatar={opponent.avatar}
          name={opponent.name}
          enableReaction={false}
        />
        <Button variation='cancel' onClick={exitMatchFn}>
          Sair
        </Button>
      </PlayerControllsContainer>
      <PanelContainer>
        <TurnInfo
          player={player}
          currentPlayer={currentPlayer}
        />

        <Board
          victoryLine={G.matchResult?.winner?.victoryData}
          player={ctx.currentPlayer}
          moveFunction={moves.clickCell}
          cells={G.cells}
          valueMapping={cellValueMapping}
        />
      </PanelContainer>
      <PlayerControllsContainer
        active={currentPlayer.id === player.id}
      >
        <PlayerSymbol
          value={player.id}
          valueMapping={cellValueMapping}
          size='large'
        />
        <PlayerHub
          ref={playerHubRef}
          avatar={player.avatar}
          name={player.name}
          orientation='right'
          action={sendChatMessage}
        />
      </PlayerControllsContainer>
    </>
  )
}
