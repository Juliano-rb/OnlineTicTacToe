import styled from 'styled-components'
import colors from '../../assets/styles/colors'
import { BounceIn } from '../../assets/styles/animations'

export const Container = styled.div`
  align-items: center;
  animation: ${BounceIn};
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 10%) 0px 10px 15px -3px,
    rgb(0 0 0 / 5%) 0px 4px 6px -2px;
  color: ${colors.main};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 320px;

  padding: 10px;
  row-gap: 10px;

  * {
    font-size: 1.1rem;
  }

  width: 100%;
  z-index: 1;
`
type IGameResult = 'winner' | 'defeated' | 'draw';

const GameResultColorsMap: { [key: string]: string } = {
  winner: colors.main,
  defeated: colors.alert,
  draw: colors.confirm,
}

interface ITitle {
  gameStatus: IGameResult;
}
export const Title = styled.h1<ITitle>`
  color: ${(props) => GameResultColorsMap[props.gameStatus]};
  font-size: 1.4rem ;
  margin: 0px;

`
interface IWinner {
  gameStatus: IGameResult;
}
export const Winner = styled.div<IWinner>`
  background-color: ${(props) => (props.gameStatus !== 'draw' ? `${colors.softier}` : '')};
  border-radius: 25px;
  
  box-shadow: ${(props) => (props.gameStatus !== 'draw' ? `3px 3px 10px ${colors.softier}, -3px -3px 3px ${colors.softier_shadow}` : '')};
  max-width: 98%;
  overflow: hidden;

  overflow-wrap: break-word;
  padding: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: fit-content;

  span:nth-child(1) {
    font-size: 1.5rem;
  }
  span:nth-child(2) {
    color: ${(props) => (props.gameStatus === 'draw' ? colors.disabled : colors.main)};
    font-size: 1rem;
  }
`
