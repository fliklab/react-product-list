import styled from "@emotion/styled";
import { LikedItem } from "../../types/like";
import { LikedItemCard } from "./LikedItemCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 1024px;
  margin: 4rem auto 0;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 480px;
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
