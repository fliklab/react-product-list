import styles from "./App.module.css";
import { ProductListContainer } from "./components/ProductList/ProductListContainer";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.appContainer}>
        <header className={styles.appHeader}>
          <h1 className={styles.appTitle}>상품 리스트</h1>
          <p className={styles.appDescription}>
            다양한 상품을 확인하고 쇼핑을 즐겨보세요!
          </p>
        </header>
        <ProductListContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
