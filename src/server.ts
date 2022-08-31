import { Server, Origins } from 'boardgame.io/server';
import path from 'path';
import serve from 'koa-static';
import { TicTacToe } from './Game';

const NODE_ENV = process.env.NODE_ENV
const PORT = parseInt(process.env.PORT || '')

const server = Server({
  games: [TicTacToe],
  origins: [Origins.LOCALHOST_IN_DEVELOPMENT, "https://velha1.herokuapp.com"],
});

console.log("NODE_ENV ", NODE_ENV)

if (NODE_ENV === 'development')
  server.run({
    port: PORT || 8000
  });
else {
  // Build path relative to the server.js file
  const frontEndAppBuildPath = path.resolve(__dirname, "../build/");
  server.app.use(serve(frontEndAppBuildPath))

  server.run(PORT || 8000, () => {
      server.app.use(
        async (ctx, next) =>
          await serve(frontEndAppBuildPath)(
            Object.assign(ctx, { path: "index.html" }),
            next
          )
      );
  })
}