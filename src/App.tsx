import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import { TopBar } from "./components/TopBar";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background.default};
`;

const AppContainer = styled.div`
  display: flex;
  max-width: 540px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  background-color: white;
  min-height: 100vh;
`;

const PageContent = styled.div`
  padding-top: 4rem;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppWrapper>
        <AppContainer>
          <TopBar />
          <PageContent>
            <Outlet />
          </PageContent>
        </AppContainer>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
