import { Server, Origins } from "boardgame.io/server";
import { TicTacToe } from "./Game";

const port = parseInt(process.env.PORT || '')

const server = Server({
  games: [TicTacToe],
  origins: [Origins.LOCALHOST],
});

server.run(port || 8000);