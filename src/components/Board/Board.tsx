import { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../../assets/styles/colors'
import Cell from './Cell'
import VictoryLine from './VictoryLine'
import { IsVictory as CheckVictory } from './VictoryLine/getVictoryLine'
import { IVictory } from './VictoryLine/VictoryLine'

interface Props {
  cells: string[];
  valueMapping?: any;
  player: string;
  setCells?: (value: string[]) => void;
  setPlayer?: (data: string) => void;
  moveFunction?: (index: number) => void;
}

const Container = styled.div`
    margin: 0 auto;
    padding: 6px;
    position: relative;
    width: fit-content;
`

const Table = styled.table`
  margin: 0 auto;

  td {
    border: 4px solid ${colors.dark};
  }

  ._0 {
    border-left: 4px solid ${colors.main};
    border-top: 4px solid ${colors.main};
  }
  ._1 {
    border-top: 4px solid ${colors.main};
  }
  ._2 {
    border-right: 4px solid ${colors.main};
    border-top: 4px solid ${colors.main};
  }
  ._3 {
    border-left: 4px solid ${colors.main};
  }
  ._4 {
  }
  ._5 {
    border-right: 4px solid ${colors.main};
  }
  ._6 {
    border-bottom: 4px solid ${colors.main};
    border-left: 4px solid ${colors.main};
  }
  ._7 {
    border-bottom: 4px solid ${colors.main};
  }
  ._8 {
    border-bottom: 4px solid ${colors.main};
    border-right: 4px solid ${colors.main};
  }
`

function Board({
  cells, valueMapping, setCells, player, setPlayer, moveFunction,
}: Props) {
  const [victory, setVictory] = useState<IVictory | null>()

  useEffect(() => {
    const isVictory = CheckVictory(cells, player)
    setVictory(isVictory)
  }, [cells, player])

  const onClick = (index: number, playerAct: string) => {
    if (victory) return
    if (cells[index]) return

    const cellsCopy = [...cells]

    cellsCopy[index] = playerAct
    if (setCells) setCells(cellsCopy)

    if (setPlayer) setPlayer(playerAct === '0' ? '1' : '0')

    debugger
    if (moveFunction) moveFunction(index)
  }

  return (
    <Container>
      {victory && (
      <VictoryLine
        position={victory.position}
        rotation={victory.rotation}
        winner={victory.winner}
      />
      )}
      <div>Vez de {valueMapping && valueMapping[player]}</div>

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
