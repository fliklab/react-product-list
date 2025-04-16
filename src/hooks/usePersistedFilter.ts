import { useState, useEffect } from "react";
import { QueryOptions } from "../server/types";

// 필터 옵션을 로컬 스토리지에 저장합니다
export function usePersistedQueryOption(key: string) {
  // 로컬 스토리지에서 상태 초기화
  const getInitialOption = (): QueryOptions => {
    const savedFilter = localStorage.getItem(key);
    return savedFilter ? JSON.parse(savedFilter) : {};
  };

  const [option, setOption] = useState<QueryOptions>(getInitialOption);

  // 필터 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(option));
  }, [key, option]);

  const updateOption = (newOption: Partial<QueryOptions>) => {
    setOption((prev: QueryOptions) => ({ ...prev, ...newOption }));
  };

  const resetOption = () => {
    setOption({});
  };

  return {
    option,
    updateOption,
    resetOption,
  };
}
