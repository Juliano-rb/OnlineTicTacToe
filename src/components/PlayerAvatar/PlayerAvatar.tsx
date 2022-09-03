import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { zoomInLeft, fadeOut } from "react-animations";
import colors from "../../assets/styles/colors";
import Card from "../Card";
import Avatar from "./Avatar";

const FADE_IN_DURATION = 2000;
const FADE_OUT_DURATION = 450;
const DEFAULT_MESSAGE_DURATION = 3000;

export {
  FADE_IN_DURATION,
  FADE_OUT_DURATION,
  DEFAULT_MESSAGE_DURATION
}

interface Props {
  avatar: string;
  name: string;
  message: string;
  messageDuration?: number;
  orientation?: "left" | "right";
}

interface AdjustableItem {
  orientation: "left" | "right";
}

const Container = styled.div<AdjustableItem>`
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
  justify-content: space-between;
  align-items: ${(props) =>
    props.orientation === "left" ? "flex-start" : "flex-end"};

  div {
    animation: ${FADE_IN_DURATION}ms ${keyframes`${zoomInLeft}`};
  }

  div.fadeOut {
    animation: ${FADE_OUT_DURATION}ms ${keyframes`${fadeOut}`};
  }
`;

const PlayerAvatar = ({
  avatar,
  name,
  message,
  orientation = "left",
  messageDuration = DEFAULT_MESSAGE_DURATION,
}: Props) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  useEffect(() => {
    setShowMessage(true);

    setTimeout(() => {
      if (messageRef?.current) messageRef.current.className = "fadeOut";

      setTimeout(() => {
        setShowMessage(false);
      }, FADE_OUT_DURATION - 50);
    }, messageDuration + FADE_IN_DURATION);
  }, [message, messageDuration]);

  return (
    <Container orientation={orientation}>
      <Avatar avatar={avatar}/>
      <FlexDiv orientation={orientation}>
        <p>{name}</p>
        {message && showMessage && (
          <div ref={messageRef} data-test-id="message">
            <Card text={message} />
          </div>
        )}
      </FlexDiv>
    </Container>
  );
};

export default PlayerAvatar;
