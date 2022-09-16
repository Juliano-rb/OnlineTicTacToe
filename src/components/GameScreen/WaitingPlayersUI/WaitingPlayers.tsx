import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LobbyApi from '../../../api/LobbyApi'
import colors from '../../../assets/styles/colors'
import Button from '../../Button'
import ShareButton from '../../ShareButton'
import Title from '../../Title'
import Toast from '../../Toast'

interface IWaitingPlayers {
  matchName: string;
  playerID: string;
  credentials: string;
  matchID: string;
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  /* justify-content: center; */
  row-gap: 30px;
  width: 100%;
  
`

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  row-gap: 18px;

  >span {
    color: ${colors.white};
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    font-size: 1rem;
  }

`

const ButtonsStyle = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    row-gap: 6px;
`

export default function WaitingPlayers({
  matchID,
  matchName,
  playerID,
  credentials,
}: IWaitingPlayers) {
  const navigate = useNavigate()

  const { protocol, hostname, port } = window.location
  const shareUrl = `${protocol}//${hostname}:${port}?join=${matchID}`

  const exitMatch = async () => {
    await LobbyApi.leaveMatch(matchID, playerID, credentials)
    navigate('/')
  }

  return (
    <Container>
      <Title>Velha</Title>
      <Main>
        <Toast title='Partida' description={matchName} />
        <span>Aguardando jogador entrar...</span>

        <br />
        <ButtonsStyle>
          <ShareButton
            shareUrl={shareUrl}
            buttonText='Compartilhar'
            shareTitle='Jogue Jogo da Velha comigo! Use o link abaixo:'
          />
          <Button onClick={exitMatch} variation='cancel'>
            Cancelar
          </Button>
        </ButtonsStyle>
      </Main>
    </Container>
  )
}
