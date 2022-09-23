import { FilteredMetadata } from 'boardgame.io'

export const getPlayerName = (player: string, matchData?: FilteredMetadata) => {
  const playerData = matchData?.find((p) => p.id.toString() === player)

  return playerData?.name
}
