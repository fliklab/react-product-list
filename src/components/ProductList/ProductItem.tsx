import React, { useCallback } from "react";
import { Product } from "../../server/types";
import styled from "@emotion/styled";
import { Badge, CardBase, FlexContainer } from "../../styles/common";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

export interface ItemProps extends Product {
  onLikeToggle?: (item: Product) => void;
}

const ProductItemContainer = styled(CardBase)`
  display: flex;
  flex-direction: row;
  padding: ${(props) => props.theme.spacing.lg};
  gap: ${(props) => props.theme.spacing.md};
  cursor: pointer;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: ${(props) => props.theme.spacing.md};
  }
`;

const LikeButton = styled.button`
  position: absolute;
  top: ${(props) => props.theme.spacing.md};
  right: ${(props) => props.theme.spacing.md};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${(props) => props.theme.spacing.sm};
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &:hover {
    transform: scale(1.1);
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

const ProductInfo = styled(FlexContainer)`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`;

const ProductHeader = styled(FlexContainer)`
  flex-wrap: wrap;
`;

const ProductName = styled.h3`
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`;

const Price = styled.span`
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.primary.main};
`;

export const ProductItem = React.memo<ItemProps>(
  ({ id, name, price, category, imageUrl, isLiked, onLikeToggle }) => {
    const handleLikeClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onLikeToggle?.({ id, name, price, category, imageUrl, isLiked });
      },
      [id, name, price, category, imageUrl, isLiked, onLikeToggle]
    );

    return (
      <ProductItemContainer>
        <ImageContainer>
          {imageUrl ? (
            <ProductImage src={imageUrl} alt={name} />
          ) : (
            <span>{id}</span>
          )}
        </ImageContainer>
        <ProductInfo gap="sm">
          <ProductHeader gap="sm">
            <Badge variant={category}>{category}</Badge>
            <ProductName>{name}</ProductName>
          </ProductHeader>
          <Price>{price.toLocaleString()}원</Price>
        </ProductInfo>
        <LikeButton onClick={handleLikeClick}>
          {isLiked ? <IoHeart /> : <IoHeartOutline />}
        </LikeButton>
      </ProductItemContainer>
    );
  }
);

export default ProductItem;
