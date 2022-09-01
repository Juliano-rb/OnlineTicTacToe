import { useState } from "react";
import Button from "../../components/Button";
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

        {showMatchList? 'test': ''}
      </MainLayout>
    );
}

export default HomePage