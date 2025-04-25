import styled from "@emotion/styled";
import { IoTrashOutline } from "react-icons/io5";
import { LikedItem } from "../types/like";

const Card = styled.div`
  display: flex;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const Content = styled.div`
  flex: 1;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const Price = styled.span`
  color: #e84118;
  font-weight: bold;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #666;
  font-size: 1.2rem;
  display: flex;
  align-items: center;

  &:hover {
    color: #e84118;
  }
`;

interface Props {
  item: LikedItem;
  onDelete: (itemId: number) => void;
}

export const LikedItemCard = ({ item, onDelete }: Props) => {
  return (
    <Card>
      <Image src={item.image} alt={item.name} />
      <Content>
        <Name>{item.name}</Name>
        <Price>{item.price.toLocaleString()}원</Price>
      </Content>
      <DeleteButton onClick={() => onDelete(item.id)}>
        <IoTrashOutline />
      </DeleteButton>
    </Card>
  );
};
