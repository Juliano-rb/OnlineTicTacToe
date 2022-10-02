import Router from '@koa/router'
import { Server, Origins, FlatFile } from 'boardgame.io/server'
import path from 'path'
import serve from 'koa-static'
import { TicTacToe } from './game/Game'

const { NODE_ENV } = process.env
const { ONLY_BACKEND } = process.env
const PORT = parseInt(process.env.PORT || '', 10)

const router = new Router()
router.get('/wakeup', async (ctx) => {
  try {
    const response = await fetch('https://keep-alive-tictactoe.onrender.com')
    console.log(response)

    ctx.body = '{message: "who dares wake me up?"}'
  } catch (error) {
    console.log(error)
  }
})

const server = Server({
  games: [TicTacToe],
  origins: [
    Origins.LOCALHOST_IN_DEVELOPMENT,
    'http://dev-jogarvelha.herokuapp.com',
    'https://dev-jogarvelha.herokuapp.com',
    'https://jogarvelha.web.app',
  ],
  db: new FlatFile({
    dir: 'storage',
    logging: false,
    // ttl: (optional, see node-persist docs),
  }),
})

server.app.use(router.routes())

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
    server.app.use(async (ctx, next) => serve(frontEndAppBuildPath)(
      Object.assign(ctx, { path: 'index.html' }),
      next,
    ))
  })
}
