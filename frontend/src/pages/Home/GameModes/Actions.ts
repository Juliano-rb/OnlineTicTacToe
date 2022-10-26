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
  playerIDJoin?: string,
) => {
  const { playerCredentials, playerID } = await LobbyApi.joinMatch(
    matchID,
    player,
    avatar,
    playerIDJoin,
  )

  await setStorage({ credentials: playerCredentials, playerID, matchID })

  if (actualPathName === '/play') navigate(0)
  else navigate({ pathname: '/play' })
}

const createMatch = async (
  playerName: string,
  avatar: string,
  setStorage: (data: ILocalStorage) => void,
  navigate: NavigateFunction,
  playerOrder?: string[],
) => {
  const matchID = await LobbyApi.createMath(playerName, playerOrder)

  await joinMatch(matchID, playerName, avatar, setStorage, navigate)
}

const useJoinMatch = () => {
  const setStorage = useSetStorage()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    matchID: string,
    player: string,
    avatar: string,
    playerIDJoin?: string,
  ) => joinMatch(
    matchID,
    player,
    avatar,
    setStorage,
    navigate,
    location.pathname,
    playerIDJoin,
  )
}

const useCreateMatch = () => {
  const setStorage = useSetStorage()
  const navigate = useNavigate()

  return (
    playerName: string,
    avatar: string,
    playerOrder?: string[],
  ) => createMatch(playerName, avatar, setStorage, navigate, playerOrder)
}

export { useJoinMatch, useCreateMatch }
