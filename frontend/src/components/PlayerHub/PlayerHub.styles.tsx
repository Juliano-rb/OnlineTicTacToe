import styled from 'styled-components'
import colors from '../../assets/styles/colors'

interface AdjustableItem {
  orientation: 'left' | 'right';
}

export const Container = styled.div<AdjustableItem>`
  display: flex;
  flex-direction: ${(props) => (props.orientation === 'left' ? 'row' : 'row-reverse')};

  span {
    color: ${colors.white};
    overflow: hidden;
    text-align: left;

    text-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
    width:100% ;
  }
`

export const FlexDiv = styled.div<AdjustableItem>`
  align-items: ${(props) => (props.orientation === 'left' ? 'flex-start' : 'flex-end')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 135px;
  row-gap: 6px;
`
