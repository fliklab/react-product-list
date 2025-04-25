import styled from "@emotion/styled";
import { LikedItem } from "../types/like";
import { LikedItemCard } from "./LikedItemCard";

const Container = styled.div`
  padding: 1rem;
  margin-top: 4rem;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  margin-top: 2rem;
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
