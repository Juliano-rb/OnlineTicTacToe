/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react'
import { BoardProps } from 'boardgame.io/react'
import { TicTacToeState } from './Game'
import Board from '../components/Board'

interface TicTacToeProps extends BoardProps<TicTacToeState> {}

export function TicTacToeBoard({
  ctx, G, moves, matchData,
}: TicTacToeProps) {
  return (
    <Board
      player={ctx.currentPlayer}
        // setPlayer={setPlayer}
        // setCells={setCells}
      moveFunction={moves.clickCell}
      cells={G.cells}
      valueMapping={{ 0: 'X', 1: 'O' }}
    />
  )
}
