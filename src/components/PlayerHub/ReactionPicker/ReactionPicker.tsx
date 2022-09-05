import styled, { keyframes } from "styled-components";
import _uniqueId from "lodash/uniqueId";
import { bounceIn } from "react-animations";
import colors from "../../../assets/styles/colors";
import Card from "../../Card";

const REACTIONS = {
  text: [
    "Você é bom!",
    "Bem jogado",
    "Parabéns",
    "Eu vou ganhar",
    "Sim",
    "Não",
    "Uau!!",
    "Quero revanche",
  ],
  emoji: ["😎", "😍", "😮", "😡", "😥", "😈", "👍", "👋", "🤛"],
};

interface Props {
  action?: (data: string) => void;
  setIsOpen?: (value: boolean) => void;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Group = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-start;

  position: relative;
  top: 50%;

  border-radius: 4px;

  background-color: ${colors.white};

  animation: 0.4s ${keyframes`${bounceIn}`};

  div {
    display: flex;
    flex: 1 1 content;
    font-size: 0.8rem;
    cursor: pointer;
    max-width: fit-content;

    :hover {
      background-color: ${colors.shadow};
      transform: scale(1.2);
      transition: 0.1s;
    }
  }

  h1{
    font-size: 1.07rem;
  }
`;

const ReactionPicker = ({ action }: Props) => {
  return (
    <Container>
      <Group>
        {REACTIONS.text.map((reaction) => (
          <Card
            key={_uniqueId()}
            action={() => action && action(reaction)}
            text={reaction}
          />
        ))}
      </Group>

      <Group>
        {REACTIONS.emoji.map((reaction) => (
          <Card
            key={_uniqueId()}
            action={() => action && action(reaction)}
          >
            <h1>{reaction}</h1>
          </Card>
        ))}
      </Group>
    </Container>
  );
};

export default ReactionPicker;
