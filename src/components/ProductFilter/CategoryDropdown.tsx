import React, { useState } from "react";
import styled from "@emotion/styled";
import { CATEGORIES, Category, QueryOptions } from "../../server/types";

interface CategoryDropdownProps {
  filter: QueryOptions;
  onApply: (filter: QueryOptions) => void;
  onClose: () => void;
}

const DropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + ${(props) => props.theme.spacing.sm});
  left: 0;
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.lg};
  padding: ${(props) => props.theme.spacing.lg};
  z-index: 1000;
  min-width: 300px;
  max-width: 500px;
`;

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm} 0;
`;

const CategoryChip = styled.button<{ isSelected: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primary.main
      : props.theme.colors.background.default};
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primary.text
      : props.theme.colors.text.primary};
  border: 1px solid
    ${(props) =>
      props.isSelected
        ? props.theme.colors.primary.main
        : props.theme.colors.border.main};
  border-radius: ${(props) => props.theme.borderRadius.pill};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.duration.fast};

  &:hover {
    background-color: ${(props) =>
      props.isSelected
        ? props.theme.colors.primary.dark
        : props.theme.colors.grey[100]};
    border-color: ${(props) =>
      props.isSelected
        ? props.theme.colors.primary.dark
        : props.theme.colors.primary.main};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.lg};
  padding-top: ${(props) => props.theme.spacing.md};
  border-top: 1px solid ${(props) => props.theme.colors.border.main};
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  background-color: ${(props) =>
    props.variant === "primary"
      ? props.theme.colors.primary.main
      : props.theme.colors.grey[200]};
  color: ${(props) =>
    props.variant === "primary"
      ? props.theme.colors.primary.text
      : props.theme.colors.text.primary};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: background-color
    ${(props) => props.theme.transitions.duration.fast};

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary"
        ? props.theme.colors.primary.dark
        : props.theme.colors.grey[300]};
  }
`;

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  filter,
  onApply,
  onClose,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    filter.categories || []
  );

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleApply = () => {
    onApply({
      ...filter,
      categories:
        selectedCategories.length > 0 ? selectedCategories : undefined,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedCategories([]);
  };

  return (
    <DropdownContainer>
      <ChipsContainer>
        {CATEGORIES.map((category) => (
          <CategoryChip
            key={category}
            isSelected={selectedCategories.includes(category)}
            onClick={() => handleCategoryToggle(category)}
          >
            {category}
          </CategoryChip>
        ))}
      </ChipsContainer>
      <ButtonGroup>
        <Button onClick={handleReset}>초기화</Button>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleApply} variant="primary">
          적용
        </Button>
      </ButtonGroup>
    </DropdownContainer>
  );
};
