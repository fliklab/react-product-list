import styled from "@emotion/styled";

interface EmptyListProps {
  icon?: string;
  message: string;
}

const EmptyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xxl} 0;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const EmptyListIcon = styled.span`
  font-size: ${(props) => props.theme.typography.fontSizes.xxl};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const EmptyListText = styled.p`
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
  margin: 0;
`;

export const EmptyList: React.FC<EmptyListProps> = ({
  icon = "🔍",
  message,
}) => {
  return (
    <EmptyListContainer>
      <EmptyListIcon>{icon}</EmptyListIcon>
      <EmptyListText>{message}</EmptyListText>
    </EmptyListContainer>
  );
};

export default EmptyList;
