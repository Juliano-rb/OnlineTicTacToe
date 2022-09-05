import styled, { keyframes } from "styled-components";
import _uniqueId from 'lodash/uniqueId'
import { bounceIn } from "react-animations";
import colors from "../../../assets/styles/colors";
import Card from "../../Card";

interface Props {
  emojiList: string[];
  action?: (data: string) => void;
  setIsOpen?: (value: boolean)=>void;
}

const Container = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: space-around;

    position: relative;
    top: 50%;
    margin: 0 auto;

    max-width: 300px;
    border-radius: 4px;
    
    background-color: ${colors.white};

    animation: 0.4s ${keyframes`${bounceIn}`};

    div{
      flex: 1 1 0px;
      font-size: 1.6rem;
      cursor: pointer;

      :hover {
        background-color: ${colors.shadow};
        transform: scale(1.2);
        transition: 0.1s;
      }
    }
`

const EmojiList = ({
  emojiList,
  action
}: Props) => {
  return (
    <Container>
      {emojiList.map(emoji => <Card key={_uniqueId()} action={() => action && action(emoji)} text={emoji} />)}
    </Container>
  )

};

export default EmojiList;
