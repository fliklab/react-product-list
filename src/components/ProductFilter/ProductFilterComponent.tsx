import React from "react";
import styled from "@emotion/styled";
import { CATEGORIES, Category, QueryOptions } from "../../server/types";

type CategoryLabel = Category | "전체";

interface ProductFilterCommponentProps {
  filter: QueryOptions;
  categories: Category[];
  onFilterChange: (filter: Partial<QueryOptions>) => void;
  onReset: () => void;
}

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.xl};
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};

  label {
    min-width: 80px;
    font-weight: ${(props) => props.theme.typography.fontWeights.medium};
    color: ${(props) => props.theme.colors.text.primary};
  }

  select,
  input {
    padding: ${(props) => props.theme.spacing.sm};
    border: 1px solid ${(props) => props.theme.colors.border.main};
    border-radius: ${(props) => props.theme.borderRadius.sm};
    font-size: ${(props) => props.theme.typography.fontSizes.md};
    transition: all ${(props) => props.theme.transitions.duration.fast}
      ${(props) => props.theme.transitions.easing.easeInOut};

    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.primary.main};
      box-shadow: ${(props) => props.theme.shadows.sm};
    }
  }

  input {
    width: 120px;
  }

  span {
    margin: 0 ${(props) => props.theme.spacing.sm};
    color: ${(props) => props.theme.colors.text.secondary};
  }
`;

const ResetButton = styled.button`
  align-self: flex-end;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.danger.main};
  color: ${(props) => props.theme.colors.danger.text};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: background-color
    ${(props) => props.theme.transitions.duration.fast}
    ${(props) => props.theme.transitions.easing.easeInOut};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};

  &:hover {
    background-color: ${(props) => props.theme.colors.danger.dark};
  }
`;

const CategoryToggleGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const CategoryToggle = styled.button<{ isActive: boolean }>`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border: 1px solid
    ${(props) =>
      props.isActive
        ? props.theme.colors.primary.main
        : props.theme.colors.border.main};
  border-radius: ${(props) => props.theme.borderRadius.pill};
  background-color: ${(props) =>
    props.isActive
      ? props.theme.colors.primary.main
      : props.theme.colors.background.default};
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.primary.text
      : props.theme.colors.text.primary};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.duration.fast}
    ${(props) => props.theme.transitions.easing.easeInOut};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};

  &:hover {
    background-color: ${(props) =>
      props.isActive
        ? props.theme.colors.primary.dark
        : props.theme.colors.grey[100]};
  }
`;

const DebugTextArea = styled.textarea`
  width: 300px;
  height: 100px;
  font-family: monospace;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  padding: ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.border.main};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  background-color: ${(props) => props.theme.colors.background.default};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const ProductFilterComponent: React.FC<ProductFilterCommponentProps> = ({
  filter,
  onFilterChange,
  onReset,
}) => {
  // 카테고리 토글 핸들러 - "전체" 버튼과 다른 카테고리 버튼 로직 처리
  const handleCategoryToggle = (category: CategoryLabel) => {
    // "전체" 선택 시 필터 초기화
    if (category === "전체") {
      onFilterChange({ categories: undefined });
      return;
    }

    let updatedCategories: Category[] = [];

    // 이미 선택된 카테고리인 경우 제거
    if (filter.categories?.includes(category)) {
      updatedCategories = filter.categories.filter((cat) => cat !== category);
    }
    // 선택되지 않은 카테고리인 경우 추가
    else {
      updatedCategories = [...(filter.categories || []), category];
    }
    onFilterChange({
      categories: updatedCategories.length > 0 ? updatedCategories : undefined,
    });
  };

  // 선택 상태 확인 함수
  const isCategorySelected = (category: CategoryLabel) => {
    if (category === "전체") {
      // 아무 카테고리도 선택되지 않았거나 카테고리가 undefined면 "전체" 선택 상태
      return !filter.categories || filter.categories.length === 0;
    }
    return filter.categories?.includes(category) ?? false;
  };

  // 가격 필터 핸들러
  const handlePriceChange = (type: "minPrice" | "maxPrice", value: string) => {
    const numberValue = value === "" ? undefined : Number(value);
    onFilterChange({ [type]: numberValue });
  };

  // 정렬 핸들러
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split("-");
    onFilterChange({
      sortBy: sortBy as "price" | "name",
      sortOrder: sortOrder as "asc" | "desc",
    });
  };

  return (
    <FilterContainer>
      <FilterGroup>
        <label>카테고리:</label>
        <CategoryToggleGroup>
          <CategoryToggle
            isActive={isCategorySelected("전체")}
            onClick={() => handleCategoryToggle("전체")}
          >
            전체
          </CategoryToggle>
          {CATEGORIES.map((category) => (
            <CategoryToggle
              key={category}
              isActive={isCategorySelected(category)}
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </CategoryToggle>
          ))}
        </CategoryToggleGroup>
      </FilterGroup>
      <FilterGroup>
        <label>가격:</label>
        <input
          type="number"
          placeholder="최소 가격"
          value={filter.minPrice || ""}
          onChange={(e) => handlePriceChange("minPrice", e.target.value)}
        />
        <span>~</span>
        <input
          type="number"
          placeholder="최대 가격"
          value={filter.maxPrice || ""}
          onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
        />
      </FilterGroup>
      <FilterGroup>
        <label>정렬:</label>
        <select
          value={
            filter.sortBy ? `${filter.sortBy}-${filter.sortOrder || "asc"}` : ""
          }
          onChange={handleSortChange}
        >
          <option value="">기본 정렬</option>
          <option value="price-asc">가격 낮은순</option>
          <option value="price-desc">가격 높은순</option>
          <option value="name-asc">이름 오름차순</option>
          <option value="name-desc">이름 내림차순</option>
        </select>
      </FilterGroup>
      <ResetButton onClick={onReset}>필터 초기화</ResetButton>
    </FilterContainer>
  );
};
