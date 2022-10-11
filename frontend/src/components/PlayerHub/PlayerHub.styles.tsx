import styled from 'styled-components'
import colors from '../../assets/styles/colors'

interface AdjustableItem {
  orientation: 'left' | 'right';
}

export const Container = styled.div<AdjustableItem>`
  display: flex;
  flex-direction: ${(props) => (props.orientation === 'left' ? 'row' : 'row-reverse')};

  p {
    color: ${colors.white};
    text-align: left;
    text-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
  }
`

export const FlexDiv = styled.div<AdjustableItem>`
  align-items: ${(props) => (props.orientation === 'left' ? 'flex-start' : 'flex-end')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 6px;
  width: fit-content;
`
