import React, { useEffect, useState } from "react";
import { Category, Product } from "../../server/types";
import { MockProductAPI } from "../../server/api";
import { ProductFilterComponent } from "../ProductFilter/ProductFilterComponent";
import { ProductList } from "./ProductList";
import { usePersistedQueryOption } from "../../hooks/usePersistedFilter";
import { useProductFilter } from "../../hooks/useProductFilter";

export const ProductListContainer: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  // 페이지 새로고침/재접속 시에도 필터 상태 유지
  const { option, updateOption, resetOption } =
    usePersistedQueryOption("product-filter");

  // 필터링 로직
  const { filteredProducts } = useProductFilter(products, option);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const api = new MockProductAPI();
        const data = await api.getProducts();
        setProducts(data.data);

        // 고유 카테고리 추출
        const uniqueCategories = Array.from(
          new Set(data.data.map((product: Product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("상품 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>상품을 불러오는 중...</div>;
  }

  return (
    <div className="product-container">
      <h1>상품 목록</h1>

      <ProductFilterComponent
        filter={option}
        categories={categories}
        onFilterChange={updateOption}
        onReset={resetOption}
      />

      <ProductList data={filteredProducts} />
    </div>
  );
};
