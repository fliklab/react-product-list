import styles from "./App.module.css";
import { ProductListContainer } from "./components/ProductList/ProductListContainer";

function App() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <h1 className={styles.appTitle}>상품 리스트</h1>
        <p className={styles.appDescription}>
          다양한 상품을 확인하고 쇼핑을 즐겨보세요!
        </p>
      </header>
      <ProductListContainer />
    </div>
  );
}

export default App;
