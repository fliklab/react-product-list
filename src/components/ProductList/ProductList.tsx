import { Product } from "../../server/types";
import { ProductItem } from "./ProductItem";
import styles from "./ProductList.module.css";

interface ProductListProps {
  data: Product[];
  lastProductRef?: (node: HTMLDivElement | null) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  data,
  lastProductRef,
}) => {
  return (
    <div className={styles.productList}>
      {data.map((product, index) => (
        <div
          key={product.id}
          ref={
            lastProductRef && index === data.length - 1
              ? lastProductRef
              : undefined
          }
        >
          <ProductItem {...product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
