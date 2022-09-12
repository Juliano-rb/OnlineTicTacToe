import styled from 'styled-components'
import colors from '../../assets/styles/colors'

export const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  display: flex;
  flex: 1;
  flex-direction: column;
  /* max-height: 100%; */
  justify-content: space-between;
  padding: 4px;

  h1 {
    color: ${colors.main};
    font-size: 1.2rem;
    margin-bottom: 10px;
    margin-top: 4px;
  }

  ul {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
    height: 320px;
    /* padding-right: 4px; */

    ::-webkit-scrollbar {
      /* background: ${colors.shadow}; */
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${colors.softier};
      width: 5px;
    }
  }

  li {
    height: fit-content;
    margin-bottom: 6px;
    /* min-height: 45px; */
    width: 100%;
  }
  li > span {
    color: ${colors.confirmSoft};
    font-size: 0.9rem;
    line-height: 2rem;
    vertical-align: center;
  }
  li:first-child {
    margin-top: 6px;
  }

  width: 100%;
`
