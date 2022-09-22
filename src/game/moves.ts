/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { Ctx } from 'boardgame.io'
import { IGameState } from '../types/IGameState'

export const playAgain = (G: IGameState, ctx: Ctx, playerID: string) => {
  if (G.gameOver) {
    G.gameOver.playAgain.push(playerID)
  }
}

export const leaveMatch = (G: IGameState, ctx: Ctx) => {
  if (G.gameOver) {
    ctx.events?.endGame(G.matchResult)
  }
}

export const setNewMatchID = (G: IGameState, ctx: Ctx, matchID: string) => {
  if (G.gameOver) {
    G.gameOver.newMatchID = matchID
  }
}
