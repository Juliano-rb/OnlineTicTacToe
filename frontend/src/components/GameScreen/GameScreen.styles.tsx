import styled from 'styled-components'
import colors from '../../assets/styles/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-left: 10px;
  margin-right: 10px; */
  /* row-gap: 10px; */
`

interface IPlayerControllsContainer{
  active?: boolean
}
export const PlayerControllsContainer = styled.div<IPlayerControllsContainer>`
  align-items: center;
  border-radius: 20px;

  display: flex;
  justify-content: space-between;
  padding: 10px;
  position: relative;

  ${(props) => (props.active
    ? `
    background: linear-gradient(134deg,${colors.main}, ${colors.smooth});
    box-shadow: 5px 5px 15px ${colors.smooth}, -10px -10px 20px ${colors.main_shadow};
  `
    : null)}
`
