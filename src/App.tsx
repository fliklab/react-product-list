import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { ProductListContainer } from "./components/ProductList/ProductListContainer";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";

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

const AppHeader = styled.header`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const AppTitle = styled.h1`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.typography.fontSizes.xxl};
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <AppHeader>
          <AppTitle>상품 리스트</AppTitle>
        </AppHeader>
        <ProductListContainer />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
