import { Product } from "../../server/types";
import { ProductItem } from "./ProductItem";
import styled from "@emotion/styled";
import { ContainerBase, FlexContainer } from "../../styles/common";

interface ProductListProps {
  data: Product[];
  lastProductRef?: (node: HTMLDivElement | null) => void;
}

const ProductListContainer = styled(ContainerBase)`
  ${FlexContainer} {
    flex-direction: column;
  }
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
      <FlexContainer direction="column" gap="md">
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
      </FlexContainer>
    </ProductListContainer>
  );
};

export default ProductList;
