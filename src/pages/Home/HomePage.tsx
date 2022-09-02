import { useState } from "react";
import Button from "../../components/Button";
import ClickableItem from "../../components/ClickableItem";
import Input from "../../components/Input";
import List from "../../components/List";
import MainLayout from "../../components/MainLayout";
import Title from "../../components/Title";
import Toggle from "../../components/Toggle";
import _uniqueId from "lodash/uniqueId";

const HomePage = () => {
  const [showMatchList, setShowMatchList] = useState<boolean>(false);

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
      <Button>Jogar</Button>
      <Button variation="cancel">Cancelar</Button>
      <Toggle
        onChange={(value) => {
          setShowMatchList(value);
        }}
      />

      {showMatchList ? <List title="Partidas">{itens}</List> : null}
    </MainLayout>
  );
};

export default HomePage;
