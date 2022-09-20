import { useQuery } from '@tanstack/react-query'

import Match from '../types/IMatches'
import lobbyApi from '../api/LobbyApi'

const useGetMatch = (matchID: string) => useQuery<Match>(['match'], () => lobbyApi.getMatch(matchID), {
//   onError: () => console.log('houve um erro aqui'),
//   onSuccess: () => toast('Partidas carregados com sucesso!'),
  enabled: !!matchID,
  refetchOnWindowFocus: true,

})

export default useGetMatch
