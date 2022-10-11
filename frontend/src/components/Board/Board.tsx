import { IVictoryLine } from '../../types/IVictory'
import { Container, Table } from './Board.styles'
import Cell from './Cell'
import VictoryLine from './VictoryLine'

interface Props {
  cells: string[];
  valueMapping?: { [key: string]: string };
  player: string;
  setCells?: (value: string[]) => void;
  setPlayer?: (data: string) => void;
  moveFunction?: (index: number) => void;
  victoryLine?: IVictoryLine;
}

function Board({
  cells,
  valueMapping,
  setCells,
  player,
  setPlayer,
  moveFunction,
  victoryLine,
}: Props) {
  const onClick = (index: number, playerAct: string) => {
    if (victoryLine) return
    if (cells[index]) return

    const cellsCopy = [...cells]

    cellsCopy[index] = playerAct
    if (setCells) setCells(cellsCopy)

    if (setPlayer) setPlayer(playerAct === '0' ? '1' : '0')

    if (moveFunction) moveFunction(index)
  }

  return (
    <Container>
      {victoryLine && (
        <VictoryLine
          position={victoryLine.position}
          rotation={victoryLine.rotation}
          winner={victoryLine.winner}
        />
      )}

      <Table role='table'>
        <tbody>
          <tr>
            <Cell
              onClick={() => onClick(0, player)}
              value={cells[0]}
              index={0}
              cellMapping={valueMapping}
            />
            <Cell
              onClick={() => onClick(1, player)}
              value={cells[1]}
              index={1}
              cellMapping={valueMapping}
            />
            <Cell
              onClick={() => onClick(2, player)}
              value={cells[2]}
              index={2}
              cellMapping={valueMapping}
            />
          </tr>
          <tr>
            <Cell
              onClick={() => onClick(3, player)}
              value={cells[3]}
              index={3}
              cellMapping={valueMapping}
            />
            <Cell
              onClick={() => onClick(4, player)}
              value={cells[4]}
              index={4}
              cellMapping={valueMapping}
            />
            <Cell
              onClick={() => onClick(5, player)}
              value={cells[5]}
              index={5}
              cellMapping={valueMapping}
            />
          </tr>
          <tr>
            <Cell
              onClick={() => onClick(6, player)}
              value={cells[6]}
              index={6}
              cellMapping={valueMapping}
            />
            <Cell
              onClick={() => onClick(7, player)}
              value={cells[7]}
              index={7}
              cellMapping={valueMapping}
            />
            <Cell
              onClick={() => onClick(8, player)}
              value={cells[8]}
              index={8}
              cellMapping={valueMapping}
            />
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

export default Board
