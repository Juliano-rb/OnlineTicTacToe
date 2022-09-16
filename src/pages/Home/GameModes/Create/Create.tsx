import LobbyApi from '../../../../api/LobbyApi'
import Button from '../../../../components/Button'
import { useJoinMatch } from '../Actions'

interface Props{
  avatar: string
  playerName: string
}

export default function ({ avatar, playerName }: Props) {
  const joinMatch = useJoinMatch()

  const createMatch = async () => {
    const matchID = await LobbyApi.createMath(playerName)
    console.log(`match ${matchID} created`)

    joinMatch(matchID, playerName, avatar)
  }

  return (
    <Button
      onClick={() => {
        createMatch()
      }}
    >
      Criar
    </Button>
  )
}
