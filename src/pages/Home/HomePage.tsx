import { ChangeEvent, useState } from 'react'
import _uniqueId from 'lodash/uniqueId'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import ClickableItem from '../../components/ClickableItem'
import Input from '../../components/Input'
import MatchList from '../../components/MatchList'
import Title from '../../components/Title'
import { Container, HorizontalDiv, MainUI } from './HomePage.styles'
import AvatarPick from '../../components/AvatarPick'
import Switch from '../../components/Switch'
import LobbyApi from '../../api/LobbyApi'
import useGetMatches from '../../hooks/useGetMatches'
import { useSetStorage } from '../../hooks/useSetStorage'

function HomePage() {
  const { data: matchList, isLoading } = useGetMatches()
  const [playerName, setPlayerName] = useState<string>('')
  const [selecao, setSelecao] = useState<string>('Ver jogos')
  const [avatar, setAvatar] = useState<string>('')
  const navigate = useNavigate()
  const setStorage = useSetStorage()

  const joinMatch = async (matchID: string, player: string) => {
    const { playerCredentials, playerID } = await LobbyApi.joinMatch(
      matchID,
      player,
      avatar,
    )

    setStorage({ credentials: playerCredentials, playerID, matchID })

    navigate({ pathname: '/play' })
  }

  const createMatch = async () => {
    const matchID = await LobbyApi.createMath(playerName)
    console.log(`match ${matchID} created`)

    joinMatch(matchID, playerName)
  }

  const playerNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value)
  }

  return (
    <Container>
      <Title>Velha</Title>
      <MainUI>
        <Switch
          // options={["Jogo rápido", "Ver jogos", "Criar jogo", "Jogo local"]}
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
        {selecao === 'Ver jogos' && (
          <MatchList isLoading={isLoading}>
            {matchList
              && matchList.map((match) => (
                <ClickableItem
                  title={match?.setupData?.matchName || 'Partida sem nome'}
                  actionText='Entrar'
                  action={() => joinMatch(match.matchID, playerName)}
                  key={_uniqueId()}
                />
              ))}
          </MatchList>
        )}
        {selecao === 'Criar jogo' && (
          <Button
            onClick={() => {
              createMatch()
            }}
          >
            Criar
          </Button>
        )}
      </MainUI>
    </Container>
  )
}

export default HomePage
