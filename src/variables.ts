const SERVER_URL = process.env.REACT_APP_SERVER_URL
const GAME_NAME = process.env.GAME_NAME || 'JogoDaVelha'

export default {
  gameName: GAME_NAME,
  serverURL: SERVER_URL,
}
