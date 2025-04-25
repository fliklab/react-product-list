import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Category } from "../server/types";

// 기본 카드 스타일
export const CardBase = styled.div`
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: ${(props) => props.theme.borderRadius.md};
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: transform ${(props) => props.theme.transitions.duration.fast}
    ${(props) => props.theme.transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

// 기본 컨테이너 스타일
export const ContainerBase = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.breakpoints.lg};
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.spacing.sm};
  }
`;

// 플렉스 컨테이너 스타일
export const FlexContainer = styled.div<{
  direction?: "row" | "column";
  gap?: "xs" | "sm" | "md" | "lg";
}>`
  display: flex;
  flex-direction: ${({ direction = "row" }) => direction};
  gap: ${(props) => props.theme.spacing[props.gap || "md"]};
  align-items: center;
`;

// 배지 스타일
export const Badge = styled.span<{ variant?: Category }>`
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};

  ${({ variant }) => {
    switch (variant) {
      case "상의":
        return css`
          background-color: #e3f2fd;
          color: #1976d2;
        `;
      case "하의":
        return css`
          background-color: #e8f5e9;
          color: #2e7d32;
        `;
      case "아우터":
        return css`
          background-color: #f3e5d9;
          color: #d4573c;
        `;
      case "원피스":
        return css`
          background-color: #f3e5f5;
          color: #9c27b0;
        `;
      case "액세서리":
        return css`
          background-color: #e1f5fe;
          color: #0288d1;
        `;
      default:
        return css`
          background-color: #f5f5f5;
          color: #616161;
        `;
    }
  }}
`;
