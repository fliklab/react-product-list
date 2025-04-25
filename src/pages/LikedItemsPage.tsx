import { LikedItemListContainer } from "../components/LikedItemList/LikedItemListContainer";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const LikedItemsPage = () => {
  return (
    <PageContainer>
      <LikedItemListContainer />
    </PageContainer>
  );
};
