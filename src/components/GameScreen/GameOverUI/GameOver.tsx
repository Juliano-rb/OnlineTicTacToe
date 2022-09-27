import { Ctx, FilteredMetadata } from 'boardgame.io'
import { useCallback, useEffect } from 'react'
import { IGameState } from '../../../types/IGameState'
import Button from '../../Button'
import Board from '../../Board'
import { getPlayerName } from '../Utils'
import { useJoinMatch } from '../../../pages/Home/GameModes/Actions'
import LobbyApi from '../../../api/LobbyApi'

interface IGameOver {
  exitMatchFn: () => void;
  G: IGameState;
  ctx: Ctx;
  matchID: string;
  playerID: string;
  matchData: FilteredMetadata;
  moves: Record<string, (...args: any[]) => void>;
  credentials: string;
  cellValueMapping: any;
}

export default function GameOver({
  exitMatchFn,
  cellValueMapping,
  playerID,
  matchID,
  G,
  moves,
  ctx,
  matchData,
  credentials,
}: IGameOver) {
  const joinMatch = useJoinMatch()
  const currentPlayerName = getPlayerName(ctx.currentPlayer, matchData)

  const newMatchID = G.gameOver?.newMatchID || ''
  const playAgain = G.gameOver?.playAgain || ''

  const joinNewMatch = useCallback(
    async (nextMatch: string, player: string, cred: string) => {
      await LobbyApi.leaveMatch(matchID, player, cred)
      joinMatch(nextMatch, getPlayerName(player, matchData) || playerID, '👩🏿')
    },
    [joinMatch, matchData, matchID, playerID],
  )

  const createNewMatch = useCallback(
    async (playerName: string) => {
      const nextMatchID = await LobbyApi.createMath(playerName)
      moves.setNewMatchID(nextMatchID)
      return nextMatchID
    },
    [moves],
  )

  useEffect(() => {
    const effect = async () => {
      if (!credentials || !playerID || !currentPlayerName) return

      if (playAgain.length === ctx.numPlayers) {
        if (!newMatchID && playerID === playAgain[0]) {
          const nextMatchID = await createNewMatch(currentPlayerName)
          await joinNewMatch(nextMatchID, playerID, credentials)
        } else if (newMatchID && playerID !== playAgain[0]) {
          await joinNewMatch(newMatchID, playerID, credentials)
        }
      }
    }
    effect()
  }, [
    createNewMatch,
    credentials,
    ctx.numPlayers,
    currentPlayerName,
    joinNewMatch,
    newMatchID,
    playAgain,
    playerID,
  ])

  return (
    <>
      <Button variation='cancel' onClick={exitMatchFn}>
        Sair
      </Button>
      <Button variation='cancel' onClick={() => moves.playAgain(playerID)}>
        Jogar de novo
      </Button>
      <div>
        O vencedor foi{' '}
        {getPlayerName(G.matchResult?.winner?.playerID || '', matchData)}
      </div>

      <Board
        victoryLine={G.matchResult?.winner?.victoryData}
        player={ctx.currentPlayer}
        moveFunction={moves.clickCell}
        cells={G.cells}
        valueMapping={cellValueMapping}
      />
    </>
  )
}
