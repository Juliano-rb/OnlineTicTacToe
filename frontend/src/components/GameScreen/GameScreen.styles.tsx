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
    -webkit-transition: background-color 200ms linear;
    -ms-transition: background-color 200ms linear;
    transition: background-color 200ms linear;

    background-color: ${colors.dark};
  `
    : null)}
`
