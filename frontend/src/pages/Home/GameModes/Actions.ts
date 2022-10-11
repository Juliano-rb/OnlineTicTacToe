import { NavigateFunction, useNavigate, useLocation } from 'react-router-dom'
import LobbyApi from '../../../api/LobbyApi'
import { useSetStorage } from '../../../hooks/useSetStorage'
import { ILocalStorage } from '../../../types/ILocalStorage'

const joinMatch = async (
  matchID: string,
  player: string,
  avatar: string,
  setStorage: (data: ILocalStorage) => void,
  navigate: NavigateFunction,
  actualPathName?: string,
) => {
  const { playerCredentials, playerID } = await LobbyApi.joinMatch(
    matchID,
    player,
    avatar,
  )

  setStorage({ credentials: playerCredentials, playerID, matchID })

  if (actualPathName === '/play') navigate(0)
  else navigate({ pathname: '/play' })
}

const createMatch = async (
  playerName: string,
  avatar: string,
  setStorage: (data: ILocalStorage) => void,
  navigate: NavigateFunction,
) => {
  const matchID = await LobbyApi.createMath(playerName)

  joinMatch(matchID, playerName, avatar, setStorage, navigate)
}

const useJoinMatch = () => {
  const setStorage = useSetStorage()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    matchID: string,
    player: string,
    avatar: string,
  ) => joinMatch(matchID, player, avatar, setStorage, navigate, location.pathname)
}

const useCreateMatch = () => {
  const setStorage = useSetStorage()
  const navigate = useNavigate()

  return (
    playerName: string,
    avatar: string,
  ) => createMatch(playerName, avatar, setStorage, navigate)
}

export { useJoinMatch, useCreateMatch }
