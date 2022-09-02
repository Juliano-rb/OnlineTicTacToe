import { useState } from "react";
import Button from "../../components/Button";
import ClickableItem from "../../components/ClickableItem";
import Input from "../../components/Input";
import MainLayout from "../../components/MainLayout";
import Title from "../../components/Title";
import Toggle from "../../components/Toggle";

const HomePage = ()=>{
  const [showMatchList, setShowMatchList] = useState<boolean>(false)

    return (
      <MainLayout>
        <Title>Velha</Title>
        <Input type="text" placeholder="Seu apelido" />
        <Button>Jogar</Button>
        <Button variation="cancel">Jogar</Button>
        <Toggle
          onChange={(value) => {
            setShowMatchList(value);
          }}
        />

        {showMatchList ? (
          <ClickableItem
            title="Flavinho do Pneu"
            actionText="Entrar"
            action={() => alert("clicou")}
          />
        ) : (
          ""
        )}
      </MainLayout>
    );
}

export default HomePage