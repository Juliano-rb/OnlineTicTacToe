/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import { BoardProps } from 'boardgame.io/react'
import { TicTacToeState } from './Game'

interface TicTacToeProps extends BoardProps<TicTacToeState> {}

export function TicTacToeBoard({
  ctx, G, moves, matchData,
}: TicTacToeProps) {
  const onClick = (id: number) => moves.clickCell(id)

  console.log(matchData)

  const getPlayerName = (id: string) => {
    const playerId = parseInt(ctx?.currentPlayer, 10)
    return matchData && matchData[playerId]?.name
  }

  let winner: any = ''
  if (ctx.gameover) {
    winner = ctx.gameover?.winner !== undefined ? (
      <div id='winner'>
        Winner:{' '}
        {getPlayerName(ctx.gameover.winner)}
      </div>
    ) : (
      <div id='winner'>Draw!</div>
    )
  }

  const turnOf = () => {
    if (!ctx.gameover?.winner) {
      return (
        <div>👉 {getPlayerName(ctx.currentPlayer)}</div>
      )
    }
  }

  const cellGlyphs = ['⭕', '❌']

  const cellStyle: React.CSSProperties = {
    border: '1px solid #555',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  }

  const tbody = []
  for (let i = 0; i < 3; i++) {
    const cells = []
    for (let j = 0; j < 3; j++) {
      const id = 3 * i + j
      const cellValue = parseInt(G.cells[id] || '', 10)
      cells.push(
        <td key={id}>
          {G.cells[id] ? (
            <div style={cellStyle}>{cellGlyphs[cellValue]}</div>
          ) : (
            <button style={cellStyle} onClick={() => onClick(id)} />
          )}
        </td>,
      )
    }
    tbody.push(<tr key={i}>{cells}</tr>)
  }

  return (
    <div>
      {turnOf()}
      <table id='board'>
        <tbody>{tbody}</tbody>
      </table>

      {winner}
    </div>
  )
}
