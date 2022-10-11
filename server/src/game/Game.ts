// disabling due to gameboard.io
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { Ctx, Game } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'
import { IGameState } from './types'
import {
  leaveMatch, playAgain, setNewMatchID,
} from './moves'

import { IsVictory } from './getVictoryLine'

function IsDraw(cells: (null | string)[]) {
  return cells.filter((c) => c === '').length === 0
}

export const TicTacToe: Game<IGameState> = {
  name: 'JogoDaVelha',
  setup: (ctx, setupData) => ({
    cells: Array(9).fill(''),
    gameOver: { playAgain: [], newMatchID: '' },
    setupData,
  }),
  minPlayers: 2,
  maxPlayers: 2,

  moves: {
    clickCell: (G: IGameState, ctx: Ctx, id: any): string | undefined => {
      if (G.matchResult) return
      if (G.cells[id] !== '') {
        return INVALID_MOVE
      }

      G.cells[id] = ctx.currentPlayer
    },
  },

  // TODO: refactor this
  turn: {
    minMoves: 1,
    maxMoves: 1,

    stages: {
      gameOver: {
        moves: { playAgain, leaveMatch, setNewMatchID },
      },
    },
    onBegin: (G, ctx) => {
      if (G.matchResult) ctx.events?.setActivePlayers({ currentPlayer: 'gameOver', others: 'gameOver' })
    },
    onEnd: (G: IGameState, ctx: Ctx) => {
      const victoryData = IsVictory(G.cells, ctx.currentPlayer)
      if (G.matchResult) return

      if (victoryData) {
        G.matchResult = {
          winner: { playerID: ctx.currentPlayer, victoryData },
        }
      }
      if (IsDraw(G.cells)) {
        G.matchResult = { isDraw: true }
      }
    },
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
