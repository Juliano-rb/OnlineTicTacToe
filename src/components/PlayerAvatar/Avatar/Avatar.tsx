import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { zoomInLeft, fadeOut } from "react-animations";
import colors from "../../../assets/styles/colors";
import Card from "../../Card";

interface Props {
  avatar: string;
}

const Container = styled.div`
    font-size: 3rem;
    cursor: pointer;
`
const Avatar = ({
  avatar,
}: Props) => {
  return (
      <Container>{avatar}</Container>
  );
};

export default Avatar;
