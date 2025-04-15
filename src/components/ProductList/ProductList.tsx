import { Product } from "../../server/types";
import { ProductItem } from "./ProductItem";
import styles from "./ProductList.module.css";

interface ProductListProps {
  data: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ data }) => {
  return (
    <div className={styles.productList}>
      {data.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
