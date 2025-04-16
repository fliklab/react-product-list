import React from "react";
import { CATEGORIES, Category, QueryOptions } from "../../server/types";
import styles from "./ProductFilterComponent.module.css";

type CategoryLabel = Category | "전체";

interface ProductFilterCommponentProps {
  filter: QueryOptions;
  categories: Category[];
  onFilterChange: (filter: Partial<QueryOptions>) => void;
  onReset: () => void;
}

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
    <div className={styles.productFilter}>
      <div className={styles.filterGroup}>
        <label>카테고리:</label>
        <div className={styles.categoryToggleGroup}>
          <button
            className={`${styles.categoryToggle} ${
              isCategorySelected("전체") ? styles.active : ""
            }`}
            onClick={() => handleCategoryToggle("전체")}
          >
            전체
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`${styles.categoryToggle} ${
                isCategorySelected(category) ? styles.active : ""
              }`}
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
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
      </div>

      <div className={styles.filterGroup}>
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
      </div>

      <div className={styles.filterGroup}>
        <label>디버그:</label>
        <textarea
          value={JSON.stringify(filter, null, 2)}
          readOnly
          style={{ width: "300px", height: "100px", fontFamily: "monospace" }}
        />
      </div>

      <button className={styles.resetButton} onClick={onReset}>
        필터 초기화
      </button>
    </div>
  );
};
