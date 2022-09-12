/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react'
import { BoardProps } from 'boardgame.io/react'
import { useNavigate } from 'react-router-dom'
import { TicTacToeState } from './Game'
import Board from '../components/Board'
import Button from '../components/Button'
import LobbyApi from '../api/LobbyApi'
import { useQueryParams } from '../hooks/useQueryParams'

interface TicTacToeProps extends BoardProps<TicTacToeState> {}

export function TicTacToeBoard({
  ctx, G, moves, matchData,
}: TicTacToeProps) {
  const navigate = useNavigate()

  const query = useQueryParams()
  const playerId = query.get('playerID') || ''
  const credentials = query.get('token') || ''
  const matchId = query.get('match') || ''

  const exitMatch = () => {
    LobbyApi.leaveMatch(matchId, playerId, credentials)
    navigate('/')
  }
  return (
    <>
      <Button variation='cancel' onClick={exitMatch}>
        Sair
      </Button>
      <Board
        player={ctx.currentPlayer}
        // setPlayer={setPlayer}
        // setCells={setCells}
        moveFunction={moves.clickCell}
        cells={G.cells}
        valueMapping={{ 0: 'X', 1: 'O' }}
      />
    </>
  )
}
