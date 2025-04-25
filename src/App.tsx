import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import { MainPage } from "./routes/MainPage";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: 540px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.background.default};
  padding: ${(props) => props.theme.spacing.lg};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
