import { Ctx, FilteredMetadata } from 'boardgame.io'
import { useEffect } from 'react'
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

  useEffect(() => {
    if (!credentials || !playerID || !currentPlayerName) return

    const joinNewMatch = async (nextMatch: string) => {
      try {
        await LobbyApi.leaveMatch(matchID, playerID, credentials)
      } catch (error) {
        console.log(error)
      }
      joinMatch(nextMatch, getPlayerName(playerID) || playerID, '👩🏿')
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
    ctx.playerID,
    currentPlayerName,
    joinMatch,
    matchID,
    moves,
    newMatchID,
    playAgain,
    playerID,
  ])

  return (
    <>
      <Button variation='cancel' onClick={exitMatchFn}>
        Sair
      </Button>
      <Button
        variation='cancel'
        onClick={() => moves.playAgain(ctx.currentPlayer)}
      >
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
