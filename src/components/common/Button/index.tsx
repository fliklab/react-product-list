import { ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};

  /* Variants */
  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background-color: #3f51b5;
          color: white;
        `;
      case "secondary":
        return `
          background-color: #f5f5f5;
          color: #333;
          border: 1px solid #ddd;
        `;
      case "danger":
        return `
          background-color: #f44336;
          color: white;
        `;
      default:
        return `
          background-color: #3f51b5;
          color: white;
        `;
    }
  }}

  /* Sizes */
  ${(props) => {
    switch (props.size) {
      case "small":
        return `
          padding: 4px 12px;
          font-size: 0.875rem;
        `;
      case "large":
        return `
          padding: 12px 24px;
          font-size: 1.125rem;
        `;
      default:
        return `
          padding: 8px 16px;
          font-size: 1rem;
        `;
    }
  }}

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton variant={variant} size={size} fullWidth={fullWidth} {...rest}>
      {children}
    </StyledButton>
  );
};
