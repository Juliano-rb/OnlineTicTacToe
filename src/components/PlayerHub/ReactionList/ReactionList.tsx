import { ReactNode } from "react";
import styled from "styled-components";

interface Props{
  messages: ReactNode[]
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 6px;
`;

const ReactionList = ({messages}:Props)=>{
  return <Container>{messages.map((message) => message)}</Container>;
}

export default ReactionList