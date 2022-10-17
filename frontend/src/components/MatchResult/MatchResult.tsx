import { FilteredMetadata } from 'boardgame.io'
import { useState } from 'react'
import { useGetPlayer } from '../../hooks/useGetPlayer'
import { IMatchResult } from '../../types/IGameState'
import IPlayer from '../../types/IPlayer'
import Button from '../Button'
import { Container, Title, Winner } from './MatchResult.styles'

interface IMatchResultUI {
  player: IPlayer;
  matchResult: IMatchResult;
  matchData: FilteredMetadata;
  moves: Record<string, (...args: any[]) => void>;
  playAgain: string[]
}

type ResultStateType = 'winner' | 'defeated' | 'draw';

const getResultState = (player: IPlayer, matchResult: IMatchResult): ResultStateType => {
  if (matchResult.isDraw) return 'draw'

  if (matchResult?.winner?.playerID === player.id) return 'winner'

  return 'defeated'
}

const getPlayAgainStatusText = (playAgainList: string[]) => {
  if (playAgainList.length === 0) return ''

  if (playAgainList.length === 1) return `(${playAgainList.length}/2)`

  return `(${playAgainList.length}/2)...`
}

export default function TurnInfo({
  player,
  matchResult,
  matchData,
  moves,
  playAgain,
}: IMatchResultUI) {
  const [clickedPlayAgain, setClickedPlayAgain] = useState(false)
  const resultState = getResultState(player, matchResult)
  const winner = useGetPlayer(matchResult.winner?.playerID || '', matchData)

  const resultStateTitleMap: { [key in ResultStateType]: string } = {
    draw: 'Empate!',
    winner: 'Você ganhou!',
    defeated: 'Você perdeu!',
  }

  const playAgainProgressText = getPlayAgainStatusText(playAgain)
  const disabledPlayAgain = clickedPlayAgain && !!playAgain.find((p) => p === player.id)

  return (
    <Container>
      <Title gameStatus={resultState}>{resultStateTitleMap[resultState]}</Title>
      <Winner gameStatus={resultState}>
        {resultState !== 'draw' ? (
          <>
            <span>🏆</span>
            <span>{winner.name || 'Sem ganhadores'}</span>
          </>
        ) : (
          <>
            <span />
            <span>Sem ganhadores</span>
          </>
        )}
      </Winner>
      <Button
        variation='cancel'
        disabled={disabledPlayAgain}
        onClick={() => {
          setClickedPlayAgain(true)
          moves.playAgain(player.id)
        }}
      >
        Jogar de novo {playAgainProgressText}
      </Button>
    </Container>
  )
}
