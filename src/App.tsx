import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import { MainPage } from "./routes/MainPage";
import { LikedItemsPage } from "./pages/LikedItemsPage";
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
          <Router>
            <TopBar />
            <PageContent>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/liked" element={<LikedItemsPage />} />
              </Routes>
            </PageContent>
          </Router>
        </AppContainer>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
