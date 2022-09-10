import { LobbyClient } from 'boardgame.io/client'

const SERVER_URL = process.env.SERVER_URL || 'http://localhost'
const SERVER_PORT = process.env.PORT || '8000'
const SERVER = `${SERVER_URL}:${SERVER_PORT}`
console.log(`SERVER:${SERVER}`)
const GAME_NAME = process.env.GAME_NAME || 'JogoDaVelha'

const lobbyClient = new LobbyClient({ server: SERVER })

export default {
  listMatches: async () => {
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
