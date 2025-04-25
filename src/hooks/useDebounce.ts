import { useState, useEffect } from "react";

/**
 * 입력값에 대한 디바운스 처리를 수행하는 커스텀 훅
 * @param value - 디바운스할 값
 * @param delay - 디바운스 지연 시간 (밀리초)
 * @returns 디바운스된 값
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
