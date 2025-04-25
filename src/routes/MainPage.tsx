import styled from "@emotion/styled";
import { ProductListContainer } from "../components/ProductList/ProductListContainer";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const PageTitle = styled.h1`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.typography.fontSizes.xxl};
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export function MainPage() {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>상품 리스트</PageTitle>
      </PageHeader>
      <ProductListContainer />
    </PageContainer>
  );
}
