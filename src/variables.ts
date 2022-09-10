const ENV = process.env.NODE_ENV
const { protocol, hostname, port } = window.location
const serverPort = ENV === 'development' ? '8000' : port

const SERVER_URL = process.env.REACT_APP_SERVER_URL || `${protocol}//${hostname}:${serverPort}`
const GAME_NAME = process.env.GAME_NAME || 'JogoDaVelha'

export default {
  gameName: GAME_NAME,
  serverURL: SERVER_URL,
}
