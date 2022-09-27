import { LobbyClient } from 'boardgame.io/client'
import Match from '../types/IMatches'
import variables from '../variables'

const lobbyClient = new LobbyClient({ server: variables.serverURL })

export default {
  listMatches: async (): Promise<Match[]> => {
    const { matches } = await lobbyClient.listMatches(variables.gameName)
    return matches
  },
  getMatch: async (matchID: string): Promise<Match> => {
    const match = await lobbyClient.getMatch(variables.gameName, matchID)
    return match
  },
  createMath: async (matchName: string) => {
    const { matchID } = await lobbyClient.createMatch(variables.gameName, {
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
    playerAvatar: string,
    playerIDJoin?: string,
  ) => {
    const { playerCredentials, playerID } = await lobbyClient.joinMatch(
      variables.gameName,
      matchID,
      {
        playerID: playerIDJoin,
        playerName,
        data: { playerName, playerAvatar },
      },
    )

    return { playerCredentials, playerID }
  },
  leaveMatch: async (matchID: string, playerID: string, credentials: string) => {
    await lobbyClient.leaveMatch(variables.gameName, matchID, {
      playerID,
      credentials,
    })
  },
  playAgain: async (matchID: string, playerID: string, credentials: string) => {
    const { nextMatchID } = await lobbyClient.playAgain(variables.gameName, matchID, {
      playerID,
      credentials,
    })

    return nextMatchID
  },
}
