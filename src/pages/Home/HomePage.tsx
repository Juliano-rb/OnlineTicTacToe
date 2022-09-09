import { useState } from 'react'
import _uniqueId from 'lodash/uniqueId'
// import { LobbyClient } from 'boardgame.io/client'
// import { LobbyAPI } from 'boardgame.io'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import ClickableItem from '../../components/ClickableItem'
import Input from '../../components/Input'
import List from '../../components/List'
import Title from '../../components/Title'
import { Container, HorizontalDiv, MainUI } from './HomePage.styles'
import AvatarPick from '../../components/AvatarPick'
import Switch from '../../components/Switch'

function HomePage() {
  const [selecao, setSelecao] = useState<string>('Jogo rápido')

  const navigate = useNavigate()

  const itens = [
    <ClickableItem
      title='Flavinho do Pneu'
      actionText='Entrar'
      action={() => alert('clicou')}
      key={_uniqueId()}
    />,
    <ClickableItem
      title='Flavinho do Pneu'
      actionText='Entrar'
      action={() => alert('clicou')}
      key={_uniqueId()}
    />,
    <ClickableItem
      title='Flavinho do Pneu'
      actionText='Entrar'
      action={() => alert('clicou')}
      key={_uniqueId()}
    />,
    <ClickableItem
      title='Flavinho do Pneu'
      actionText='Entrar'
      action={() => alert('clicou')}
      key={_uniqueId()}
    />,
    <ClickableItem
      title='Flavinho do Pneu'
      actionText='Entrar'
      action={() => alert('clicou')}
      key={_uniqueId()}
    />,
    <ClickableItem
      title='Flavinho do Pneu'
      actionText='Entrar'
      action={() => alert('clicou')}
      key={_uniqueId()}
    />,
    <ClickableItem
      title='Flavinho do Pneu'
      actionText='Entrar'
      action={() => alert('clicou')}
      key={_uniqueId()}
    />,
    <ClickableItem
      title='Flavinho do Pneu'
      actionText='Entrar'
      action={() => alert('clicou')}
      key={_uniqueId()}
    />,
    <ClickableItem
      title='Flavinho do Pneu'
      actionText='Entrar'
      action={() => alert('clicou')}
      key={_uniqueId()}
    />,
  ]

  return (
    <Container>
      <Title>Velha</Title>
      <MainUI>
        <Switch
          options={['Jogo rápido', 'Ver oponentes']}
          setOption={setSelecao}
        />
        <HorizontalDiv>
          <Input type='text' placeholder='Seu apelido' />
          <AvatarPick avatar='👩🏼' />
        </HorizontalDiv>
        {selecao === 'Ver oponentes' && (
          <List action={{ text: 'Criar jogo', action: () => alert('ola') }}>
            {itens}
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
