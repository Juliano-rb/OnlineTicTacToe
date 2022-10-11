import { FilteredMetadata } from 'boardgame.io'
import { useGetPlayer } from '../../hooks/useGetPlayer'
import { IMatchResult } from '../../types/IGameState'
import IPlayer from '../../types/IPlayer'
import PlayerSymbolSmall from '../PlayerSymbolSmall'
import Toast from '../Toast'
import { Container, Title } from './MatchResult.styles'

interface IMatchResultUI {
  player: IPlayer;
  matchResult: IMatchResult;
  matchData: FilteredMetadata;
  valueMapping: { [key: string]: string };
}

type ResultStateType = 'winner' | 'defeated' | 'draw';

const getResultState = (player: IPlayer, matchResult: IMatchResult): ResultStateType => {
  if (matchResult.isDraw) return 'draw'

  if (matchResult?.winner?.playerID === player.id) return 'winner'

  return 'defeated'
}

export default function TurnInfo({
  player,
  matchResult,
  matchData,
  valueMapping,
}: IMatchResultUI) {
  const resultState = getResultState(player, matchResult)
  const winner = useGetPlayer(matchResult.winner?.playerID || '', matchData)

  const resultStateTitleMap: { [key in ResultStateType]: string } = {
    draw: 'Empate!',
    winner: 'Você ganhou!',
    defeated: 'Você perdeu!',
  }

  return (
    <Container>
      <Title>{resultStateTitleMap[resultState]}</Title>
      {resultState !== 'draw' && (
      <Toast title='Vencedor' description={winner.name}>
        <PlayerSymbolSmall value={winner.id} valueMapping={valueMapping} />
      </Toast>
      )}
    </Container>
  )
}
