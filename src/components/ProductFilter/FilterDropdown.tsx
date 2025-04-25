import React, { useState } from "react";
import styled from "@emotion/styled";
import { QueryOptions } from "../../server/types";
import { CategoryDropdown } from "./CategoryDropdown";

interface FilterDropdownProps {
  type: "category" | "price" | "sort";
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
  min-width: 200px;
`;

const PriceInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Input = styled.input`
  padding: ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.border.main};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  width: 120px;
`;

const OptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
`;

const OptionItem = styled.li<{ isActive?: boolean }>`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  cursor: pointer;
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.primary.main
      : props.theme.colors.text.primary};
  font-weight: ${(props) =>
    props.isActive
      ? props.theme.typography.fontWeights.bold
      : props.theme.typography.fontWeights.regular};
  border-radius: ${(props) => props.theme.borderRadius.sm};

  &:hover {
    background-color: ${(props) => props.theme.colors.grey[100]};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.lg};
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  cursor: pointer;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  background-color: ${(props) =>
    props.variant === "primary"
      ? props.theme.colors.primary.main
      : props.theme.colors.grey[200]};
  color: ${(props) =>
    props.variant === "primary"
      ? props.theme.colors.primary.text
      : props.theme.colors.text.primary};

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary"
        ? props.theme.colors.primary.dark
        : props.theme.colors.grey[300]};
  }
`;

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  type,
  filter,
  onApply,
  onClose,
}) => {
  const [draftFilter, setDraftFilter] = useState<QueryOptions>(filter);

  const handlePriceChange = (type: "minPrice" | "maxPrice", value: string) => {
    const numberValue = value === "" ? undefined : Number(value);
    setDraftFilter({ ...draftFilter, [type]: numberValue });
  };

  const handlePriceApply = () => {
    onApply(draftFilter);
    onClose();
  };

  const handleSortClick = (
    sortBy: "price" | "name",
    sortOrder: "asc" | "desc"
  ) => {
    const newFilter = {
      ...filter,
      sortBy,
      sortOrder,
    };
    onApply(newFilter);
    onClose();
  };

  if (type === "category") {
    return (
      <CategoryDropdown filter={filter} onApply={onApply} onClose={onClose} />
    );
  }

  return (
    <DropdownContainer>
      {type === "price" && (
        <>
          <PriceInputGroup>
            <Input
              type="number"
              placeholder="최소 가격"
              value={draftFilter.minPrice || ""}
              onChange={(e) => handlePriceChange("minPrice", e.target.value)}
            />
            <span>~</span>
            <Input
              type="number"
              placeholder="최대 가격"
              value={draftFilter.maxPrice || ""}
              onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
            />
          </PriceInputGroup>
          <ButtonGroup>
            <Button onClick={onClose}>취소</Button>
            <Button variant="primary" onClick={handlePriceApply}>
              적용
            </Button>
          </ButtonGroup>
        </>
      )}

      {type === "sort" && (
        <OptionList>
          <OptionItem
            isActive={filter.sortBy === "price" && filter.sortOrder === "asc"}
            onClick={() => handleSortClick("price", "asc")}
          >
            가격 낮은순
          </OptionItem>
          <OptionItem
            isActive={filter.sortBy === "price" && filter.sortOrder === "desc"}
            onClick={() => handleSortClick("price", "desc")}
          >
            가격 높은순
          </OptionItem>
          <OptionItem
            isActive={filter.sortBy === "name" && filter.sortOrder === "asc"}
            onClick={() => handleSortClick("name", "asc")}
          >
            이름 오름차순
          </OptionItem>
          <OptionItem
            isActive={filter.sortBy === "name" && filter.sortOrder === "desc"}
            onClick={() => handleSortClick("name", "desc")}
          >
            이름 내림차순
          </OptionItem>
        </OptionList>
      )}
    </DropdownContainer>
  );
};
