import { LobbyClient } from 'boardgame.io/client'
import Match from '../types/Matches'

const ENV = process.env.NODE_ENV
const { protocol, hostname, port } = window.location
const serverPort = ENV === 'development' ? '8000' : port

const SERVER_URL = process.env.REACT_APP_SERVER_URL || `${protocol}//${hostname}:${serverPort}`
const GAME_NAME = process.env.GAME_NAME || 'JogoDaVelha'

const lobbyClient = new LobbyClient({ server: SERVER_URL })

export default {
  listMatches: async () : Promise<Match[]> => {
    const { matches } = await lobbyClient.listMatches(GAME_NAME)
    return matches
  },
  getMatch: async (matchID: string) => {
    const match = await lobbyClient.getMatch(GAME_NAME, matchID)
    return match
  },
  createMath: async (matchName: string) => {
    const { matchID } = await lobbyClient.createMatch(GAME_NAME, {
      numPlayers: 2,
      setupData: {
        matchName,
      },
    })

    return matchID
  },
  joinMatch: async (
    matchID: string,
    playerName: string,
    playerIDJoin?: string,
  ) => {
    const { playerCredentials, playerID } = await lobbyClient.joinMatch(
      GAME_NAME,
      matchID,
      {
        playerID: playerIDJoin,
        playerName,
      },
    )

    return { playerCredentials, playerID }
  },
  leaveMatch: async (matchID: string, playerID: string, credentials: string) => {
    await lobbyClient.leaveMatch(GAME_NAME, matchID, {
      playerID,
      credentials,
    })
  },
  playAgain: async (matchID: string, playerID: string, credentials: string) => {
    const { nextMatchID } = await lobbyClient.playAgain(GAME_NAME, matchID, {
      playerID,
      credentials,
    })

    return nextMatchID
  },
}
