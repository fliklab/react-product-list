import styled from "@emotion/styled";
import { LikedItem } from "../../types/like";
import { LikedItemCard } from "./LikedItemCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100vw;
  padding: 12px;
  margin: 0;
  box-sizing: border-box;
  max-width: 540px;

  @media (max-width: 768px) {
    gap: 8px;
    padding: 8px;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  margin-top: 2rem;
  width: 100%;
`;

interface Props {
  items: LikedItem[];
  onDelete: (itemId: number) => void;
}

export const LikedItemList = ({ items, onDelete }: Props) => {
  if (items.length === 0) {
    return <EmptyMessage>찜한 상품이 없습니다.</EmptyMessage>;
  }

  return (
    <Container>
      {items.map((item) => (
        <LikedItemCard key={item.id} item={item} onDelete={onDelete} />
      ))}
    </Container>
  );
};
