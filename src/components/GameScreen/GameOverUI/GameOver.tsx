import { Ctx, FilteredMetadata } from 'boardgame.io'
import { useCallback, useEffect } from 'react'
import { IGameState } from '../../../types/IGameState'
import Button from '../../Button'
import Board from '../../Board'
import { useJoinMatch } from '../../../pages/Home/GameModes/Actions'
import LobbyApi from '../../../api/LobbyApi'
import { useGetOpponent, useGetPlayer } from '../../../hooks/useGetPlayer'
import IPlayer from '../../../types/IPlayer'
import PlayerHub from '../../PlayerHub'
import { PlayerControllsContainer } from '../GameScreen.styles'

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
  const player = useGetPlayer(playerID, matchData)
  const opponent = useGetOpponent(playerID, matchData)

  const newMatchID = G.gameOver?.newMatchID || ''
  const playAgain = G.gameOver?.playAgain || ''

  const joinNewMatch = useCallback(
    async (nextMatch: string, playerData: IPlayer, cred: string) => {
      await LobbyApi.leaveMatch(matchID, playerData.id, cred)
      joinMatch(nextMatch, playerData.name || playerID, playerData.avatar)
    },
    [joinMatch, matchID, playerID],
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
      if (!credentials || !playerID || !player.id) return

      if (playAgain.length === ctx.numPlayers) {
        if (!newMatchID && playerID === playAgain[0]) {
          const nextMatchID = await createNewMatch(player.name)
          await joinNewMatch(nextMatchID, player, credentials)
        } else if (newMatchID && playerID !== playAgain[0]) {
          await joinNewMatch(newMatchID, player, credentials)
        }
      }
    }
    effect()
  }, [
    createNewMatch,
    credentials,
    ctx.numPlayers,
    joinNewMatch,
    newMatchID,
    playAgain,
    player,
    playerID,
  ])

  return (
    <>
      <PlayerControllsContainer>
        <PlayerHub avatar={opponent.avatar} name={opponent.name} />
        <Button variation='cancel' onClick={exitMatchFn}>
          Sair
        </Button>
      </PlayerControllsContainer>

      <div>

        <Button variation='cancel' onClick={() => moves.playAgain(playerID)}>
          Jogar de novo
        </Button>
        <div>
          O vencedor foi{' '}
          {useGetPlayer(G.matchResult?.winner?.playerID || '', matchData).name}
        </div>

        <Board
          victoryLine={G.matchResult?.winner?.victoryData}
          player={ctx.currentPlayer}
          moveFunction={moves.clickCell}
          cells={G.cells}
          valueMapping={cellValueMapping}
        />
      </div>
      <PlayerControllsContainer>
        <div />
        <PlayerHub
          avatar={player.avatar}
          name={player.name}
          orientation='right'
        />
      </PlayerControllsContainer>
    </>
  )
}
