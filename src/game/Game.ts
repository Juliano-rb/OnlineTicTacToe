// disabling due to gameboard.io
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { Game } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'
import { IsVictory } from './getVictoryLine'

export interface TicTacToeState {
  cells: string[];
  setupData: {
    matchName: string,
    playerAvatar: string
  }
}

// Return true if all `cells` are occupied.
function IsDraw(cells: (null | string)[]) {
  return cells.filter((c) => c === '').length === 0
}

export const TicTacToe: Game<TicTacToeState> = {
  name: 'JogoDaVelha',
  setup: (ctx, setupData) => ({ cells: Array(9).fill(''), setupData }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  minPlayers: 2,
  maxPlayers: 2,

  moves: {
    clickCell: (G, ctx, id) => {
      if (G.cells[id] !== '') {
        return INVALID_MOVE
      }

      G.cells[id] = ctx.currentPlayer
    },
  },

  endIf: (G, ctx) => {
    const victoryData = IsVictory(G.cells, ctx.currentPlayer)
    if (victoryData) {
      return { winner: ctx.currentPlayer, victoryData }
    }
    if (IsDraw(G.cells)) {
      return { draw: true }
    }
  },

  ai: {
    enumerate: (G) => {
      const moves = []
      for (let i = 0; i < 9; i += 1) {
        if (G.cells[i] === '') {
          moves.push({ move: 'clickCell', args: [i] })
        }
      }
      return moves
    },
  },
}
