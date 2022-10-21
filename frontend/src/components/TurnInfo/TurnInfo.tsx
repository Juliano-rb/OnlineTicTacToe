import IPlayer from '../../types/IPlayer'
import { Container } from './TurnInfo.styles'

interface IGameStatus {
  player: IPlayer;
  currentPlayer: IPlayer;
}

export default function TurnInfo({
  player,
  currentPlayer,
}: IGameStatus) {
  return (
    <Container>
      <div>
        {player.id === currentPlayer.id
          ? 'Sua vez!'
          : <>É a vez de <span>{currentPlayer.name}</span></>}
      </div>
    </Container>
  )
}
