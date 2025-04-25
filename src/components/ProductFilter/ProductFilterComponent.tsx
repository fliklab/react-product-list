import React from "react";
import styled from "@emotion/styled";
import { Category, QueryOptions } from "../../server/types";
import { FilterBar } from "./FilterBar";

interface ProductFilterComponentProps {
  filter: QueryOptions;
  categories: Category[];
  onFilterChange: (filter: QueryOptions) => void;
  onReset: () => void;
}

const FilterContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

export const ProductFilterComponent: React.FC<ProductFilterComponentProps> = ({
  filter,
  onFilterChange,
  onReset,
}) => {
  return (
    <FilterContainer>
      <FilterBar
        filter={filter}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
    </FilterContainer>
  );
};
