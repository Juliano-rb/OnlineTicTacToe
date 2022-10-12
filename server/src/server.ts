import axios from 'axios'
import { Server, Origins, FlatFile } from 'boardgame.io/server'
import path from 'path'
import serve from 'koa-static'
import { TicTacToe } from './game/Game'

const { NODE_ENV } = process.env
const { ONLY_BACKEND } = process.env
const PORT = parseInt(process.env.PORT || '8000', 10)
const WAKEUP_SERVICE_URL = process.env.WAKEUP_URL || 'http://localhost:8888'

const PROD_ORIGINS = ["https://jogarvelha.web.app"];

const DEV_ORIGINS = [/.*/];

const server = Server({
  games: [TicTacToe],
  origins: NODE_ENV == "production" ? PROD_ORIGINS : DEV_ORIGINS,
  db: new FlatFile({
    dir: 'storage',
    logging: false,
    // ttl: (optional, see node-persist docs),
  }),
})

server.router.get('/wakeup', async (ctx) => {
  try {
    console.log(
      `\n** Someone is waking me up, answering to ${WAKEUP_SERVICE_URL}...`,
    )

    const response = await axios.get(WAKEUP_SERVICE_URL)
    console.log('** Response from waking up server:', response.data)
  } catch (error) {
    console.log('error', error as any)
  }
  ctx.body = 'success'
})

console.log('NODE_ENV ', NODE_ENV)
console.log('ONLY_BACKEND', ONLY_BACKEND)
if (NODE_ENV === 'development' || ONLY_BACKEND) {
  console.log(`starting server at ${PORT}...`)
  server.run({
    port: PORT,
  })
} else {
  console.log(`serving ./build directory and starting server at ${PORT}...`)
  // Build path relative to the server.js file
  const frontEndAppBuildPath = path.resolve(__dirname, '../build/')
  server.app.use(serve(frontEndAppBuildPath))

  server.run(PORT, () => {
    server.app.use(async (ctx, next) => serve(frontEndAppBuildPath)(
      Object.assign(ctx, { path: 'index.html' }),
      next,
    ))
  })
}
