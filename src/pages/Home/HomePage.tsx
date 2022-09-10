import { ChangeEvent, useState } from 'react'
import _uniqueId from 'lodash/uniqueId'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import ClickableItem from '../../components/ClickableItem'
import Input from '../../components/Input'
import List from '../../components/List'
import Title from '../../components/Title'
import { Container, HorizontalDiv, MainUI } from './HomePage.styles'
import AvatarPick from '../../components/AvatarPick'
import Switch from '../../components/Switch'
import LobbyApi from '../../api/LobbyApi'
import useGetMatches from '../../hooks/useGetMatches'

function HomePage() {
  const { data: matchList, isLoading } = useGetMatches()
  const [playerName, setPlayerName] = useState<string>('')
  const [selecao, setSelecao] = useState<string>('Jogo rápido')
  const navigate = useNavigate()

  const createMatch = async () => {
    const matchID = await LobbyApi.createMath(playerName)
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
            {isLoading ? <div>Carregando oponentes...</div>
              : matchList?.map((match) => (
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
