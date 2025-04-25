import { Product } from "../../server/types";
import { ProductItem } from "./ProductItem";
import styled from "@emotion/styled";

interface ProductListProps {
  data: Product[];
  lastProductRef?: (node: HTMLDivElement | null) => void;
}

const ProductListContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const ProductItemWrapper = styled.div`
  width: 100%;
`;

export const ProductList: React.FC<ProductListProps> = ({
  data,
  lastProductRef,
}) => {
  return (
    <ProductListContainer>
      {data.map((product, index) => (
        <ProductItemWrapper
          key={product.id}
          ref={
            lastProductRef && index === data.length - 1
              ? lastProductRef
              : undefined
          }
        >
          <ProductItem {...product} />
        </ProductItemWrapper>
      ))}
    </ProductListContainer>
  );
};

export default ProductList;
