import { css } from "@emotion/react";

export const fontFace = css`
  @font-face {
    font-family: "Pretendard";
    font-weight: 45 920;
    font-style: normal;
    font-display: swap;
    src: local("Pretendard Variable"),
      url("/fonts/PretendardVariable.woff2") format("woff2-variations"),
      url("/fonts/PretendardVariable.woff") format("woff-variations");
  }
`;

export const fontFamily = css`
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
`;
