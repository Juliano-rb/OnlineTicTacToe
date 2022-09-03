import { useState } from "react";
import Button from "../../components/Button";
import ClickableItem from "../../components/ClickableItem";
import Input from "../../components/Input";
import List from "../../components/List";
import MainLayout from "../../components/MainLayout";
import Title from "../../components/Title";
import Toast from "../../components/Toast";
import Toggle from "../../components/Toggle";
import _uniqueId from "lodash/uniqueId";
import PlayerHub from "../../components/PlayerHub";
import Card from "../../components/Card";
import EmojiList from "../../components/PlayerHub/EmojiList";
import AvatarPick from "../../components/AvatarPick/AvatarPick";
import Switch from "../../components/Switch";

const HomePage = () => {
  const [showMatchList, setShowMatchList] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('E lá vamos nós')
  const [selecao, setSelecao] = useState<string>("Jogo rápido")

  const itens = [
    <ClickableItem
      title="Flavinho do Pneu"
      actionText="Entrar"
      action={() => alert("clicou")}
      key={_uniqueId()}
    />,
    <ClickableItem
      title="Flavinho do Pneu"
      actionText="Entrar"
      action={() => alert("clicou")}
      key={_uniqueId()}
    />,
  ];

  return (
    <MainLayout>
      <Title>Velha</Title>
      <Input type="text" placeholder="Seu apelido" />
      <Button>Jogo rápido</Button><br/>
      <Button variation="cancel">Cancelar</Button>
      <Toggle
        onChange={(value) => {
          setShowMatchList(value);
        }}
      />

      {showMatchList ? <List title="Partidas">{itens}</List> : null}
      <br />
      <Toast title="Partida" description="Shaolim Matador de Porco" />

      <PlayerHub avatar="🧓" name="Flavinho do Pneu" message={message} />

      <AvatarPick avatar='👩🏼' avatarList={['🧓🏼','👩🏼‍🦰','👩🏼','👨🏿','👩🏿','👶🏽','👵🏼','🧔🏼','👨🏼','👨🏼‍🦰','👨🏼‍🦲', '🤶🏼']} />
    
      <Switch options={['Jogo rápido', "Ver oponentes"]} setOption={setSelecao} />
       <div>{selecao}</div>
    </MainLayout>
  );
};

export default HomePage;
