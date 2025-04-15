import { useState, useEffect } from "react";
import { FilterOptions } from "../server/types";

export function usePersistedFilter(key: string) {
  // 로컬 스토리지에서 상태 초기화
  const getInitialFilter = (): FilterOptions => {
    const savedFilter = localStorage.getItem(key);
    return savedFilter ? JSON.parse(savedFilter) : {};
  };

  const [filter, setFilter] = useState<FilterOptions>(getInitialFilter);

  // 필터 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(filter));
  }, [key, filter]);

  const updateFilter = (newFilter: Partial<FilterOptions>) => {
    setFilter((prev: FilterOptions) => ({ ...prev, ...newFilter }));
  };

  const resetFilter = () => {
    setFilter({});
  };

  return {
    filter,
    updateFilter,
    resetFilter,
  };
}
