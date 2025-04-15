import { useMemo } from "react";
import { Product, FilterOptions } from "../server/types";

export function useProductFilter(products: Product[], filter?: FilterOptions) {
  // 필터링된 상품 목록 계산
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 카테고리 필터링
      if (filter?.categories && !filter.categories.includes(product.category)) {
        return false;
      }

      // 최소 가격 필터링
      if (
        filter?.minPrice !== undefined &&
        product.price < filter.minPrice
      ) {
        return false;
      }

      // 최대 가격 필터링
      if (
        filter?.maxPrice !== undefined &&
        product.price > filter.maxPrice
      ) {
        return false;
      }

      return true;
    });
  }, [products, filter]);

  return {
    filteredProducts,
  };
}
import { Product, FilterOptions } from "../server/types";

export function useProductFilter(products: Product[], filter?: FilterOptions) {
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
