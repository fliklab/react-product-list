import "./App.css";
import ProductList from "./components/ProductList/ProductList";
import { mockProducts } from "./server/data";

function App() {
  return (
    <>
      <h1>상품 목록</h1>
      <ProductList data={mockProducts}></ProductList>
    </>
  );
}

export default App;
