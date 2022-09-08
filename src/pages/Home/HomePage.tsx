import { useState } from 'react'
import _uniqueId from 'lodash/uniqueId'
import Button from '../../components/Button'
import ClickableItem from '../../components/ClickableItem'
import Input from '../../components/Input'
import List from '../../components/List'
import MainLayout from '../../components/MainLayout'
import Title from '../../components/Title'
import Toast from '../../components/Toast'
import PlayerHub from '../../components/PlayerHub'
import AvatarPick from '../../components/AvatarPick/AvatarPick'
import Switch from '../../components/Switch'
import ShareButton from '../../components/ShareButton'

function HomePage() {
  const [message, setMessage] = useState<string>('E lá vamos nós')
  const [selecao, setSelecao] = useState<string>('Jogo rápido')

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
    />, <ClickableItem
      title='Flavinho do Pneu'
      actionText='Entrar'
      action={() => alert('clicou')}
      key={_uniqueId()}
    />, <ClickableItem
      title='Flavinho do Pneu'
      actionText='Entrar'
      action={() => alert('clicou')}
      key={_uniqueId()}
    />,
  ]

  return (
    <MainLayout>
      <Title>Velha</Title>
      <Switch options={['Jogo rápido', 'Ver oponentes']} setOption={setSelecao} />
      <Input type='text' placeholder='Seu apelido' />
      <br />
      <Button onClick={() => setMessage(`${message}.`)}>Jogo rápido</Button><br />

      <ShareButton buttonText='Compartilhar' shareUrl='https://velha.onrender.com' shareTitle='O Melhor jogo da velha já feito' />

      {selecao === 'Ver oponentes' ? <List action={{ text: 'Criar jogo', action: () => alert('ola') }}>{itens}</List> : null}
      <br />
      <Toast title='Partida' description='Shaolim Matador de Porco' />

      <PlayerHub avatar='🧓' name='Flavinho do Pneu' />

      <AvatarPick avatar='👩🏼' avatarList={['🧓🏼', '👩🏼‍🦰', '👩🏼', '👨🏿', '👩🏿', '👶🏽', '👵🏼', '🧔🏼', '👨🏼', '👨🏼‍🦰', '👨🏼‍🦲', '🤶🏼']} />

    </MainLayout>
  )
}

export default HomePage
