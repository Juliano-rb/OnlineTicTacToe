import { ReactNode, useRef, useState } from "react";
import styled from "styled-components";
import colors from "../../assets/styles/colors";
import Emoji from "../Emoji";
import ReactionPicker from "./ReactionPicker";
import Modal from "../Modal";
import Reaction from "./Reaction";
import ReactionList from "./ReactionList";

const DEFAULT_MESSAGE_DURATION = 3000;
export {DEFAULT_MESSAGE_DURATION}
interface Props {
  avatar: string;
  name: string;
  messageDuration?: number;
  orientation?: "left" | "right";
}

interface AdjustableItem {
  orientation: "left" | "right";
}

const Container = styled.div<AdjustableItem>`
  position: relative;
  display: flex;
  flex-direction: ${(props) =>
    props.orientation === "left" ? "row" : "row-reverse"};

  p {
    color: ${colors.white};
    text-align: left;
    text-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
  }
`;

const FlexDiv = styled.div<AdjustableItem>`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  justify-content: space-between;
  align-items: ${(props) =>
    props.orientation === "left" ? "flex-start" : "flex-end"};

`;

const PlayerHub = ({
  avatar,
  name,
  orientation = "left",
  messageDuration = DEFAULT_MESSAGE_DURATION,
}: Props) => {
  const [messageList, setMessageList] = useState<ReactNode[]>([]);
  const [showChat, setShowChat] = useState<boolean>(false);

  const newMessage = (message: string)=>{
    setMessageList([
      ...messageList,
      <Reaction messageDuration={messageDuration} message={message} />,
    ]);
  }

  const clickReactionAction = (data: string) => {
    newMessage(data);
    setShowChat(false);
  };

  return (
    <Container orientation={orientation}>
      <Emoji emoji={avatar} action={() => setShowChat(true)} />
      <FlexDiv orientation={orientation}>
        <p>{name}</p>
        <ReactionList messages={messageList} />
      </FlexDiv>
      {showChat && (
        <Modal setIsOpen={setShowChat}>
          <ReactionPicker action={clickReactionAction} />
        </Modal>
      )}
    </Container>
  );
};

export default PlayerHub;
