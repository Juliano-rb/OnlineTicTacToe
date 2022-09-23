import {
  ChangeEvent,
  ReactNode, useEffect, useState,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import Title from '../../components/Title'
import { Container, HorizontalDiv, MainUI } from './HomePage.styles'
import Switch from '../../components/Switch'
import List from './GameModes/List'
import Create from './GameModes/Create'
import { JoinBtn, JoinDescription } from './GameModes/Join'
import AvatarPick from '../../components/AvatarPick'
import Input from '../../components/Input'
import useGetMatch from '../../hooks/useGetMatch'
import { IGameModes } from '../../types/IGameModes'

function HomePage() {
  const [searchParams] = useSearchParams()

  const [avatar, setAvatar] = useState<string>('👴🏼')
  const [playerName, setPlayerName] = useState<string>('')
  const joinID = searchParams.get('join') || ''

  const { data: joinMatchData, isError, isLoading } = useGetMatch(joinID)
  const [selecao, setSelecao] = useState<IGameModes>(
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

  const GameModeSwitch: { [key in IGameModes]: ReactNode } = {
    'Ver jogos': <List avatar={avatar} playerName={playerName} />,
    'Criar jogo': <Create avatar={avatar} playerName={playerName} />,
    // eslint-disable-next-line quote-props
    'Entrar': (
      <JoinBtn
        disabled={isError || isLoading}
        joinID={joinID}
        avatar={avatar}
        playerName={playerName}
      />
    ),
  }

  return (
    <Container>
      <Title>Velha</Title>
      <MainUI>
        {joinID && (
          <JoinDescription
            error={isError}
            matchName={joinMatchData?.setupData?.matchName || '...'}
          />
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

        {GameModeSwitch[selecao]}
      </MainUI>
    </Container>
  )
}

export default HomePage
