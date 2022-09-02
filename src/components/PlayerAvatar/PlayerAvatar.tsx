import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { zoomInLeft, fadeOut } from "react-animations";
import colors from "../../assets/styles/colors";
import Card from "../Card";

const FADE_IN_DURATION = 2000;
const FADE_OUT_DURATION = 450;

interface Props {
  avatar: string;
  name: string;
  message: string;
  messageDuration?: number;
}

const PlayerAvatarStyle = styled.div`
  display: flex;

  .avatar {
    font-size: 3rem;
  }

  p {
    color: ${colors.white};
    text-align: left;
    text-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
  }
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    animation: ${FADE_IN_DURATION}ms ${keyframes`${zoomInLeft}`};
  }

  div.fadeOut {
    animation: ${FADE_OUT_DURATION}ms ${keyframes`${fadeOut}`};
  }
`;

const PlayerAvatar = ({ avatar, name, message, messageDuration=3000 }: Props) => {
  const messageRef = useRef<HTMLDivElement>(null)
  const [showMessage, setShowMessage] = useState<boolean>(false)

  useEffect(()=>{
    setShowMessage(true)
    
    setTimeout(() => {
      if (messageRef?.current) messageRef.current.className = "fadeOut";

      setTimeout(() => {
        setShowMessage(false);
      }, FADE_OUT_DURATION-50);
    }, messageDuration+FADE_IN_DURATION);

  }, [message, messageDuration])

  return (
    <PlayerAvatarStyle>
      <div className="avatar">{avatar}</div>
      <FlexDiv>
        <p>{name}</p>
        {message && showMessage && (
          <div ref={messageRef}>
            <Card text={message} />
          </div>
        )}
      </FlexDiv>
    </PlayerAvatarStyle>
  );
};

export default PlayerAvatar;
