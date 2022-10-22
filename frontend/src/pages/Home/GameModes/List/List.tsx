import _uniqueId from 'lodash/uniqueId'
import ClickableItem from '../../../../components/ClickableItem'
import MatchList from '../../../../components/MatchList'
import useGetMatches from '../../../../hooks/useGetMatches'
import { useJoinMatch } from '../Actions'

interface Props {
  avatar: string;
  playerName: string;
}

export default function ({ avatar, playerName }: Props) {
  const { data, isLoading } = useGetMatches()

  const joinMatch = useJoinMatch()

  return (
    <MatchList isLoading={isLoading}>
      {!isLoading && data
        ? data.map((match) => (
          <ClickableItem
            title={match?.setupData?.matchName || 'Partida sem nome'}
            actionText='Entrar'
            action={async () => joinMatch(match.matchID, playerName, avatar)}
            key={_uniqueId()}
          />
        ))
        : []}
    </MatchList>
  )
}
