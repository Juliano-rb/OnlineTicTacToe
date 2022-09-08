import styled from 'styled-components'
import colors from '../../../assets/styles/colors'

export type VictoryPositions = 'top' | 'left' | 'right' | 'bottom' | 'middle';
export type VictoryRotations = '45deg' | '90deg' | '-45deg' | '0';

export interface IVictory {
  position: VictoryPositions;
  rotation: VictoryRotations;
  winner: string;
}

const alignmentMappig = {
  top: 'top: 17%;',
  left: 'left: -31%; top: 50%;',
  right: 'right: -31%; top: 50%;',
  bottom: 'bottom: 17%;',
  middle: 'top: 48%; left: 0%;',
}

const Container = styled.div<IVictory>`
  @keyframes bounce-in {
    0% {
      ${(props) => alignmentMappig[props.position]}
      transform: rotate(${(props) => props.rotation}) scale(0);
    }
    50% {
      ${(props) => alignmentMappig[props.position]}
      transform: rotate(${(props) => props.rotation}) scale(1.1);
    }
    70% {
      ${(props) => alignmentMappig[props.position]}
      transform: rotate(${(props) => props.rotation}) scale(1);
    }
    100% {
      ${(props) => alignmentMappig[props.position]}
      transform: rotate(${(props) => props.rotation}) scale(1.08);
    }
  }

  animation: bounce-in 0.5s;
  background-color: ${(props) => (props.winner === '0' ? colors.alert : colors.softier)};
  border-radius: 8px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  height: 8px;

  ${(props) => alignmentMappig[props.position]}
  position: absolute;

  transform: rotate(${(props) => props.rotation}) scale(1.06);
  width: 100%;
`

function VictoryLine({ position, rotation, winner }: IVictory) {
  return (
    <Container
      position={position}
      rotation={rotation}
      winner={winner}
    />
  )
}

export default VictoryLine
