import { Global, css } from "@emotion/react";
import { fontFace, fontFamily } from "./fonts";

export const GlobalStyles = () => (
  <Global
    styles={(theme) => css`
      ${fontFace}

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        ${fontFamily}
      }

      html,
      body,
      #root {
        width: 100%;
        margin: 0;
        padding: 0;
        flex: 1;
        display: flex;
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
        font: inherit;
        padding: 0;
        margin: 0;
        outline: none;
        color: inherit;
        text-align: inherit;
        text-decoration: none;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
      }

      button:focus {
        outline: none;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
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
        background-color: #ffffff !important;
        color: #333333 !important;
        line-height: ${theme.typography.lineHeights.normal};
        font-size: ${theme.typography.fontSizes.md};
      }

      h1 {
        font-size: ${theme.typography.fontSizes.xxl};
        font-weight: ${theme.typography.fontWeights.bold};
        color: #333333;
      }

      h2 {
        font-size: ${theme.typography.fontSizes.xl};
        font-weight: ${theme.typography.fontWeights.bold};
        color: #333333;
      }

      h3 {
        font-size: ${theme.typography.fontSizes.lg};
        font-weight: ${theme.typography.fontWeights.medium};
        color: #333333;
      }

      p {
        font-size: ${theme.typography.fontSizes.md};
        margin-bottom: ${theme.spacing.md};
        color: #333333;
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
        font: inherit;
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        border-radius: ${theme.borderRadius.sm};
        transition: all ${theme.transitions.duration.fast};
        color: #333333;

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
        border: 1px solid #e0e0e0;
        border-radius: ${theme.borderRadius.sm};
        background-color: #ffffff !important;
        width: 100%;
        transition: all ${theme.transitions.duration.fast};
        color: #333333 !important;

        &:focus {
          outline: none;
          border-color: #4a90e2;
          box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
        }

        &::placeholder {
          color: #757575;
        }

        &:disabled {
          background-color: #f5f5f5 !important;
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
        color: #333333 !important;
      }
    `}
  />
);
