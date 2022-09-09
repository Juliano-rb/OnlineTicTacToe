/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client, Lobby } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import { TicTacToeBoard } from './Board'
import { TicTacToe } from './Game'

const ENV = process.env.NODE_ENV
const { protocol, hostname, port } = window.location
const serverPort = ENV === 'development' ? '8000' : port

const server = `${protocol}//${hostname}:${serverPort}`

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  // multiplayer: Local({ persist: true, storageKey: "bgio" }),
  multiplayer: SocketIO({ server }),
})

function App() {
  return (
    <Lobby
      gameServer={server}
      lobbyServer={server}
      gameComponents={[{ game: TicTacToe, board: TicTacToeBoard }]}
      debug
    />
  )
}

export default App
