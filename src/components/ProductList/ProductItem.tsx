import { Product } from "../../server/types";
import styles from "./ProductItem.module.css";

export interface ProductItemProps extends Product {
  key: string;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  name,
  price,
  category,
  imageUrl,
}) => {
  return (
    <div className={styles.productItem}>
      <div className={styles.productImagePlaceholder}>
        {imageUrl ? (
          <img className={styles.productThumbnail} src={imageUrl} alt={name} />
        ) : null}
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productNameContainer}>
          <span className={styles.productCategory}>{category}</span>
          <h3 className={styles.productName}>{name}</h3>
        </div>
        <span className={styles.productPrice}>{price.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default ProductItem;
