import { Client } from "boardgame.io/react";
import { Local, SocketIO } from "boardgame.io/multiplayer";
import { TicTacToeBoard } from "./Board";
import { TicTacToe } from "./Game";
import { useState } from "react";

const ENV = process.env.NODE_ENV
const { protocol, hostname, port } = window.location
const serverPort = ENV === 'development'? '8000' : port

const server = `${protocol}//${hostname}:${serverPort}`;

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  // multiplayer: Local({ persist: true, storageKey: "bgio" }),
  multiplayer: SocketIO({ server })
});

const App = () => {
  const [playerId, setPlayerId] = useState<string | null>(null) 

  if (playerId === null) {
    return (
      <div>
        <p>Play as</p>
        <button onClick={() => setPlayerId("0")}>Player 0</button>
        <button onClick={() => setPlayerId("1")}>Player 1</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Player {playerId}</h2>
      <TicTacToeClient playerID={playerId} />
    </div>
  );
};

export default App;
