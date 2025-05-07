import styled from "@emotion/styled";
import { IoTrashOutline } from "react-icons/io5";
import { LikedItem } from "../../types/like";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background: #f0f0f0;
  box-sizing: border-box;
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Image = ({ src, alt }: { src: string; alt: string }) => {
  if (!src) {
    return <ImageContainer />;
  }
  return (
    <ImageContainer>
      <ProductImage src={src} alt={alt} />
    </ImageContainer>
  );
};

const Content = styled.div`
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

const Price = styled.span`
  color: ${(props) => props.theme.colors.primary.main};
  font-weight: 600;
  font-size: 16px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0.5rem;
  color: #666;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #fff;
    color: #e84118;
    transform: scale(1.1);
  }
`;

interface Props {
  item: LikedItem;
  onDelete: (itemId: number) => void;
}

export const LikedItemCard = ({ item, onDelete }: Props) => {
  return (
    <CardContainer>
      <div style={{ position: "relative" }}>
        <Image src={item.image} alt={item.name} />
        <DeleteButton onClick={() => onDelete(item.id)}>
          <IoTrashOutline />
        </DeleteButton>
      </div>
      <Content>
        <Name>{item.name}</Name>
        <Price>{item.price.toLocaleString()}원</Price>
      </Content>
    </CardContainer>
  );
};
