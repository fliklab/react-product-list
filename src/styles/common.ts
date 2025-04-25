import styled from "@emotion/styled";
import { css } from "@emotion/react";

// 반응형 텍스트 스타일
export const responsiveText = (size: "sm" | "md" | "lg") => css`
  font-size: ${(props) => props.theme.typography.fontSizes[size]};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) =>
      props.theme.typography.fontSizes[
        size === "sm" ? "xs" : size === "md" ? "sm" : "md"
      ]};
  }
`;

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
export const Badge = styled.span`
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  background-color: ${(props) => props.theme.colors.background.paper};
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.sm};
`;
