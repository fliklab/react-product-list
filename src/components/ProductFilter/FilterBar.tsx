import React, { useState } from "react";
import styled from "@emotion/styled";
import { QueryOptions } from "../../server/types";
import { FilterDropdown } from "./FilterDropdown";
import { CATEGORIES } from "../../server/types";

interface FilterBarProps {
  filter: QueryOptions;
  onFilterChange: (filter: QueryOptions) => void;
}

const FilterBarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md} 0;
`;

const FilterButton = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.background.paper};
  border: 1px solid
    ${(props) =>
      props.isActive
        ? props.theme.colors.primary.main
        : props.theme.colors.border.main};
  border-radius: ${(props) => props.theme.borderRadius.pill};
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.primary.main
      : props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.duration.fast};

  &:hover {
    border-color: ${(props) => props.theme.colors.primary.main};
    color: ${(props) => props.theme.colors.primary.main};
  }

  &::after {
    content: "▼";
    font-size: 8px;
    margin-left: ${(props) => props.theme.spacing.sm};
  }
`;

const FilterDropdownContainer = styled.div`
  position: relative;
`;

type ActiveDropdown = "category" | "price" | "sort" | null;

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);

  const handleButtonClick = (dropdown: ActiveDropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleClose = () => {
    setActiveDropdown(null);
  };

  const isFilterActive = (type: ActiveDropdown): boolean => {
    switch (type) {
      case "category":
        return !!filter.categories?.length;
      case "price":
        return !!(filter.minPrice || filter.maxPrice);
      case "sort":
        return !!filter.sortBy;
      default:
        return false;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const getButtonText = (type: ActiveDropdown): string => {
    switch (type) {
      case "category":
        if (filter.categories?.length) {
          if (filter.categories.length === CATEGORIES.length) {
            return "카테고리: 전체";
          }
          return `카테고리: ${filter.categories.join(", ")}`;
        }
        return "카테고리";
      case "price":
        if (filter.minPrice || filter.maxPrice) {
          return `가격: ${
            filter.minPrice ? formatPrice(filter.minPrice) : 0
          } ~ ${filter.maxPrice ? formatPrice(filter.maxPrice) : "무제한"}`;
        }
        return "가격";
      case "sort":
        if (filter.sortBy) {
          return `${filter.sortBy === "price" ? "가격" : "이름"}${
            filter.sortOrder === "asc" ? " 오름차순" : " 내림차순"
          }`;
        }
        return "정렬";
      default:
        return "";
    }
  };

  return (
    <FilterBarContainer>
      <FilterDropdownContainer>
        <FilterButton
          isActive={isFilterActive("category")}
          onClick={() => handleButtonClick("category")}
        >
          {getButtonText("category")}
        </FilterButton>
        {activeDropdown === "category" && (
          <FilterDropdown
            type="category"
            filter={filter}
            onApply={onFilterChange}
            onClose={handleClose}
          />
        )}
      </FilterDropdownContainer>

      <FilterDropdownContainer>
        <FilterButton
          isActive={isFilterActive("price")}
          onClick={() => handleButtonClick("price")}
        >
          {getButtonText("price")}
        </FilterButton>
        {activeDropdown === "price" && (
          <FilterDropdown
            type="price"
            filter={filter}
            onApply={onFilterChange}
            onClose={handleClose}
          />
        )}
      </FilterDropdownContainer>

      <FilterDropdownContainer>
        <FilterButton
          isActive={isFilterActive("sort")}
          onClick={() => handleButtonClick("sort")}
        >
          {getButtonText("sort")}
        </FilterButton>
        {activeDropdown === "sort" && (
          <FilterDropdown
            type="sort"
            filter={filter}
            onApply={onFilterChange}
            onClose={handleClose}
          />
        )}
      </FilterDropdownContainer>
    </FilterBarContainer>
  );
};
