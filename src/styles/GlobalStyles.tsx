import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
  <Global
    styles={(theme) => css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        font-size: 16px;

        @media (max-width: ${theme.breakpoints.md}) {
          font-size: 14px;
        }
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        background-color: ${theme.colors.background.default};
        color: ${theme.colors.text.primary};
        line-height: ${theme.typography.lineHeights.normal};
        font-size: ${theme.typography.fontSizes.md};
      }

      h1 {
        font-size: ${theme.typography.fontSizes.xxl};
        font-weight: ${theme.typography.fontWeights.bold};
      }

      h2 {
        font-size: ${theme.typography.fontSizes.xl};
        font-weight: ${theme.typography.fontWeights.bold};
      }

      h3 {
        font-size: ${theme.typography.fontSizes.lg};
        font-weight: ${theme.typography.fontWeights.medium};
      }

      p {
        font-size: ${theme.typography.fontSizes.md};
        margin-bottom: ${theme.spacing.md};
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
        font: inherit;
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        border-radius: ${theme.borderRadius.sm};
        transition: all ${theme.transitions.duration.fast};

        &:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
      }

      input,
      select,
      textarea {
        font: inherit;
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        border: 1px solid ${theme.colors.border.main};
        border-radius: ${theme.borderRadius.sm};
        background-color: ${theme.colors.background.default};
        width: 100%;
        transition: all ${theme.transitions.duration.fast};

        &:focus {
          outline: none;
          border-color: ${theme.colors.primary.main};
          box-shadow: 0 0 0 2px ${theme.colors.primary.light}33;
        }

        &::placeholder {
          color: ${theme.colors.text.disabled};
        }

        &:disabled {
          background-color: ${theme.colors.grey[100]};
          cursor: not-allowed;
        }
      }

      select {
        appearance: none;
        padding-right: ${theme.spacing.xl};
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right ${theme.spacing.sm} center;
      }

      textarea {
        min-height: 100px;
        resize: vertical;
      }
    `}
  />
);
