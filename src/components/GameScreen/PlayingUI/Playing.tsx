import { Ctx, FilteredMetadata } from 'boardgame.io'
import { IGameState } from '../../../types/IGameState'
import Button from '../../Button'
import Board from '../../Board'
import PlayerHub from '../../PlayerHub'
import { useGetOpponent, useGetPlayer } from '../../../hooks/useGetPlayer'
import { PlayerControllsContainer } from '../GameScreen.styles'

interface IPlaying {
  exitMatchFn: () => void;
  G: IGameState;
  ctx: Ctx;
  playerID: string
  matchData: FilteredMetadata;
  moves: Record<string, (...args: any[]) => void>;
  cellValueMapping: any;
}

export default function Playing({
  exitMatchFn,
  cellValueMapping,
  G,
  moves,
  ctx,
  matchData,
  playerID,
}: IPlaying) {
  const currentPlayer = useGetPlayer(ctx.currentPlayer, matchData)
  const player = useGetPlayer(playerID, matchData)
  const opponent = useGetOpponent(playerID, matchData)

  return (
    <>
      <PlayerControllsContainer>
        <div>
            enableReaction={false}
        </div>
        <Button variation='cancel' onClick={exitMatchFn}>
          Sair
        </Button>
      </PlayerControllsContainer>

      <div>
        <div>
          Vez de {cellValueMapping && cellValueMapping[ctx.currentPlayer]}
          {' - '}
          {currentPlayer.name}
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
        <div>
          <PlayerHub
            avatar={player.avatar}
            name={player.name}
            orientation='right'
          />
        </div>
      </PlayerControllsContainer>
    </>
  )
}
