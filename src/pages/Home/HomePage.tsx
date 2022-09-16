import {
  ChangeEvent,
  ReactNode, useEffect, useState,
} from 'react'
import Title from '../../components/Title'
import { Container, HorizontalDiv, MainUI } from './HomePage.styles'
import Switch from '../../components/Switch'
import { useQueryParams } from '../../hooks/useQueryParams'
import List from './GameModes/List'
import Create from './GameModes/Create'
import { JoinBtn, JoinDescription } from './GameModes/Join'
import AvatarPick from '../../components/AvatarPick'
import Input from '../../components/Input'
import useGetMatch from '../../hooks/useGetMatch'

function HomePage() {
  const [avatar, setAvatar] = useState<string>('👴🏼')
  const [playerName, setPlayerName] = useState<string>('')
  const joinID = useQueryParams().get('join') || ''
  // TODO: try to put in a component to conditionaly fetch
  const { data: joinMatchData, isError, isLoading } = useGetMatch(joinID)
  const [selecao, setSelecao] = useState<string>(
    joinID ? 'Entrar' : 'Ver jogos',
  )

  // TODO: improove this
  useEffect(() => {
    if (joinID && !isLoading && isError) {
      setSelecao('Ver jogos')
    }
  }, [joinID, isLoading, isError])

  const playerNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value)
  }

  const GameModeSwitch = new Map<string, ReactNode>([
    ['Ver jogos', <List avatar={avatar} playerName={playerName} />],
    ['Criar jogo', <Create avatar={avatar} playerName={playerName} />],
    [
      'Entrar',
      <JoinBtn
        disabled={isError || isLoading}
        joinID={joinID}
        avatar={avatar}
        playerName={playerName}
      />,
    ],
  ])

  return (
    <Container>
      <Title>Velha</Title>
      <MainUI>
        {joinID && (
          <JoinDescription error={isError} matchName={joinMatchData?.setupData?.matchName || '...'} />
        )}
        <Switch
          option={selecao}
          // options={["Jogo rápido", "Ver jogos", "Criar jogo", "Jogo local", "Entrar"]}
          options={['Ver jogos', 'Criar jogo']}
          setOption={setSelecao}
        />
        <HorizontalDiv>
          <Input
            type='text'
            placeholder='Seu apelido'
            value={playerName}
            onChange={playerNameChange}
          />
          <AvatarPick avatar={avatar} setAvatar={setAvatar} />
        </HorizontalDiv>

        {GameModeSwitch.get(selecao)}
      </MainUI>
    </Container>
  )
}

export default HomePage
