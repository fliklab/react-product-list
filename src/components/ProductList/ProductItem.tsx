import { Product } from "../../server/types";
import styled from "@emotion/styled";

export type ItemProps = Product;

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${(props) => props.theme.spacing.lg};
  gap: ${(props) => props.theme.spacing.md};
  cursor: pointer;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: ${(props) => props.theme.spacing.md};
  }
`;

const ImageContainer = styled.div`
  width: 108px;
  height: 108px;
  background-color: ${(props) => props.theme.colors.grey[200]};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 80px;
    height: 80px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
`;

const ProductHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  flex-wrap: wrap;
`;

const Category = styled.span`
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  background-color: ${(props) => props.theme.colors.background.paper};
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.sm};
`;

const ProductName = styled.h3`
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.typography.fontSizes.md};
  }
`;

const Price = styled.span`
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.primary.main};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.typography.fontSizes.md};
  }
`;

export const ProductItem: React.FC<ItemProps> = ({
  id,
  name,
  price,
  category,
  imageUrl,
}) => {
  return (
    <ProductItemContainer>
      <ImageContainer>
        {imageUrl ? (
          <ProductImage src={imageUrl} alt={name} />
        ) : (
          <span>{id}</span>
        )}
      </ImageContainer>
      <ProductInfo>
        <ProductHeader>
          <Category>{category}</Category>
          <ProductName>{name}</ProductName>
        </ProductHeader>
        <Price>{price.toLocaleString()}원</Price>
      </ProductInfo>
    </ProductItemContainer>
  );
};

export default ProductItem;
