import styled from 'styled-components'
import colors from '../../assets/styles/colors'

export const Container = styled.div`
  margin: 0 auto;
  padding: 2px;
  position: relative;
  width: fit-content;
`

export const Table = styled.table`
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
