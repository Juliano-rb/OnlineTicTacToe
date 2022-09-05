import { css, keyframes } from "styled-components";
import { slideInUp, zoomInLeft, fadeIn, fadeOut, tada, merge } from "react-animations";

const FADE_IN_DURATION = 1000;
const FADE_OUT_DURATION = 450;

const zoomInLeftKeyframes = keyframes`${zoomInLeft}`;
const fadeOutKeyframes = keyframes`${fadeOut}`;

const inKeyFrames = keyframes`${merge(merge(fadeIn, slideInUp), tada)}`;

const FancyIn = css(
  ["", ` ${FADE_IN_DURATION}ms linear;`] as any as TemplateStringsArray,
  inKeyFrames
);

const ZoomInLeft = css(
  ["", ` ${FADE_IN_DURATION}ms linear;`] as any as TemplateStringsArray,
  zoomInLeftKeyframes
);

const FadeOut = css(
  ["", ` ${FADE_OUT_DURATION}ms linear;`] as any as TemplateStringsArray,
  fadeOutKeyframes
);

export { ZoomInLeft, FadeOut, FancyIn, FADE_IN_DURATION, FADE_OUT_DURATION };
