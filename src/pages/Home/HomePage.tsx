import { ChangeEvent, useEffect, useState } from 'react'
import _uniqueId from 'lodash/uniqueId'
// import { LobbyClient } from 'boardgame.io/client'
// import { LobbyAPI } from 'boardgame.io'
import { useNavigate } from 'react-router-dom'
import { LobbyAPI } from 'boardgame.io'
import Button from '../../components/Button'
import ClickableItem from '../../components/ClickableItem'
import Input from '../../components/Input'
import List from '../../components/List'
import Title from '../../components/Title'
import { Container, HorizontalDiv, MainUI } from './HomePage.styles'
import AvatarPick from '../../components/AvatarPick'
import Switch from '../../components/Switch'
import LobbyApi from './LobbyApi'

function HomePage() {
  const [playerName, setPlayerName] = useState<string>('')
  const [selecao, setSelecao] = useState<string>('Jogo rápido')
  const [matchList, setMatchList] = useState<LobbyAPI.Match[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await LobbyApi.listMatches()
      setMatchList(data)
    }

    fetchData()
  }, [])

  const createMatch = async () => {
    const matchID = LobbyApi.createMath(playerName)
    console.log(`match ${matchID} created`)
  }

  const playerNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value)
  }
  return (
    <Container>
      <Title>Velha</Title>
      <MainUI>
        <Switch
          options={['Jogo rápido', 'Ver oponentes']}
          setOption={setSelecao}
        />
        <HorizontalDiv>
          <Input type='text' placeholder='Seu apelido' value={playerName} onChange={playerNameChange} />
          <AvatarPick avatar='👩🏼' />
        </HorizontalDiv>
        {selecao === 'Ver oponentes' && (
          <List action={{ text: 'Criar jogo', action: () => createMatch() }}>
            {matchList.map((match) => (
              <ClickableItem
                title={match?.setupData?.matchName || 'Partida sem nome'}
                actionText='Entrar'
                action={() => alert(match?.setupData?.matchName || 'Partida sem nome')}
                key={_uniqueId()}
              />
            ))}
          </List>
        )}
        {selecao === 'Jogo rápido' && (
          <Button onClick={() => { navigate('/play') }}>Jogar</Button>
        )}
      </MainUI>
    </Container>
  )
}

export default HomePage
