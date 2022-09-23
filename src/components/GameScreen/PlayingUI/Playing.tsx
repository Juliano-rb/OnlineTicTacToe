import { Ctx, FilteredMetadata } from 'boardgame.io'
import { IGameState } from '../../../types/IGameState'
import Button from '../../Button'
import Board from '../../Board'
import { getPlayerName } from '../Utils'

interface IPlaying {
  exitMatchFn: () => void;
  G: IGameState;
  ctx: Ctx;
  matchData: FilteredMetadata;
  moves: Record<string, (...args: any[]) => void>;
  cellValueMapping: any;
}

export default function WaitingPlayers({
  exitMatchFn,
  cellValueMapping,
  G,
  moves,
  ctx,
  matchData,
}: IPlaying) {
  const currentPlayerName = getPlayerName(ctx.currentPlayer, matchData)

  return (
    <>
      <Button variation='cancel' onClick={exitMatchFn}>
        Sair
      </Button>
      <div>
        Vez de {cellValueMapping && cellValueMapping[ctx.currentPlayer]}
        {' - '}
        {currentPlayerName}
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
