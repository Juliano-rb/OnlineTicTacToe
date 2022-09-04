import { useState } from "react";
import Button from "../../components/Button";
import ClickableItem from "../../components/ClickableItem";
import Input from "../../components/Input";
import List from "../../components/List";
import MainLayout from "../../components/MainLayout";
import Title from "../../components/Title";
import Toast from "../../components/Toast";
import _uniqueId from "lodash/uniqueId";
import PlayerHub from "../../components/PlayerHub";
import AvatarPick from "../../components/AvatarPick/AvatarPick";
import Switch from "../../components/Switch";
import ShareIcon from "@mui/icons-material/Share";

const HomePage = () => {
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
    <ClickableItem
      title="Flavinho do Pneu"
      actionText="Entrar"
      action={() => alert("clicou")}
      key={_uniqueId()}
    />,<ClickableItem
    title="Flavinho do Pneu"
    actionText="Entrar"
    action={() => alert("clicou")}
    key={_uniqueId()}
  />,<ClickableItem
  title="Flavinho do Pneu"
  actionText="Entrar"
  action={() => alert("clicou")}
  key={_uniqueId()}
/>,
  ];

  return (
    <MainLayout>
      <Title>Velha</Title>
      <Switch options={['Jogo rápido', "Ver oponentes"]} setOption={setSelecao} />
      <Input type="text" placeholder="Seu apelido" />
      <br/>
      <Button onClick={()=>setMessage(message + '.')}>Jogo rápido</Button><br/>
      <Button variation="share" onClick={()=>{
        try {
          navigator.share({ url:"http://velha1.herokuapp.com", title:"Teset", text:"Este é um teste" })
          
        } catch (error) {
          alert(error)
        }
      }}><ShareIcon fontSize="small" /> Compartilhar</Button>

      {selecao === "Ver oponentes" ? <List action={{text:"Criar jogo", action:()=>alert('ola')}} >{itens}</List> : null}
      <br />
      <Toast title="Partida" description="Shaolim Matador de Porco" />

      <PlayerHub avatar="🧓" name="Flavinho do Pneu" message={message} />

      <AvatarPick avatar='👩🏼' avatarList={['🧓🏼','👩🏼‍🦰','👩🏼','👨🏿','👩🏿','👶🏽','👵🏼','🧔🏼','👨🏼','👨🏼‍🦰','👨🏼‍🦲', '🤶🏼']} />
    
      
    </MainLayout>
  );
};

export default HomePage;
