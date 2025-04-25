import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Spinner = styled.div<{ size?: "small" | "medium" | "large" }>`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  animation: ${spin} 1s linear infinite;

  ${(props) => {
    switch (props.size) {
      case "small":
        return `
          width: 20px;
          height: 20px;
        `;
      case "large":
        return `
          width: 50px;
          height: 50px;
        `;
      default:
        return `
          width: 30px;
          height: 30px;
        `;
    }
  }}
`;

const LoaderText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #666;
`;

export const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  text = "로딩 중...",
}) => {
  return (
    <LoaderContainer>
      <Spinner size={size} />
      {text && <LoaderText>{text}</LoaderText>}
    </LoaderContainer>
  );
};

export default Loader;
