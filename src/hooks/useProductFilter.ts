import { useMemo } from "react";
import { Product, QueryOptions } from "../server/types";

// 클라이언트 사이드에서 필터링/정렬 적용(서버에 요청하도록 변경해야 함)
export function useProductFilter(products: Product[], filter?: QueryOptions) {
  // 필터링된 상품 목록 계산
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 카테고리 필터링
      if (filter?.categories && !filter.categories.includes(product.category)) {
        return false;
      }

      // 최소 가격 필터링
      if (filter?.minPrice !== undefined && product.price < filter.minPrice) {
        return false;
      }

      // 최대 가격 필터링
      if (filter?.maxPrice !== undefined && product.price > filter.maxPrice) {
        return false;
      }

      return true;
    });
  }, [products, filter]);

  return {
    filteredProducts,
  };
}
