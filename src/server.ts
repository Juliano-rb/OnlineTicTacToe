import { Server, Origins } from 'boardgame.io/server'
import path from 'path'
import serve from 'koa-static'
import { TicTacToe } from './Game'

const { NODE_ENV } = process.env
const { ONLY_BACKEND } = process.env
const PORT = parseInt(process.env.PORT || '', 10)

const server = Server({
  games: [TicTacToe],
  origins: [Origins.LOCALHOST_IN_DEVELOPMENT, 'https://velha1.herokuapp.com'],
})

console.log('NODE_ENV ', NODE_ENV)
console.log('ONLY_BACKEND', ONLY_BACKEND)
if (NODE_ENV === 'development' || ONLY_BACKEND) {
  console.log('starting server at 8000...')
  server.run({
    port: PORT || 8000,
  })
} else {
  console.log('serving ./build directory and starting server at 8000...')
  // Build path relative to the server.js file
  const frontEndAppBuildPath = path.resolve(__dirname, '../build/')
  server.app.use(serve(frontEndAppBuildPath))

  server.run(PORT || 8000, () => {
    server.app.use(
      async (ctx, next) => serve(frontEndAppBuildPath)(
        Object.assign(ctx, { path: 'index.html' }),
        next,
      ),
    )
  })
}
