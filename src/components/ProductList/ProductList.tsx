import { Product } from "../../server/types";
import { ProductItem } from "./ProductItem";
import styled from "@emotion/styled";

interface ProductListProps {
  data: Product[];
  lastProductRef?: (node: HTMLDivElement | null) => void;
}

const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  width: 100%;
  max-width: ${(props) => props.theme.breakpoints.lg};
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.spacing.sm};
  }
`;

const ProductItemWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: ${(props) => props.theme.borderRadius.md};
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: transform ${(props) => props.theme.transitions.duration.fast}
    ${(props) => props.theme.transitions.easing.easeInOut};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.md};
  }
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
