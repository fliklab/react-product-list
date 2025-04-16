import React, { useEffect, useState, useRef, useCallback } from "react";
import { Category, Product, QueryOptions } from "../../server/types";
import { MockProductAPI } from "../../server/api";
import { ProductFilterComponent } from "../ProductFilter/ProductFilterComponent";
import { ProductList } from "./ProductList";
import { usePersistedQueryOption } from "../../hooks/usePersistedFilter";
import { Loader } from "../common/Loader";

export const ProductListContainer: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  // 무한 스크롤을 위한 상태들
  const [anchor, setAnchor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  // 페이지 새로고침/재접속 시에도 필터 상태 유지
  const { option, updateOption, resetOption } =
    usePersistedQueryOption("product-filter");

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreProducts(option, anchor);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, option, anchor]
  );

  // 초기 데이터 로드
  useEffect(() => {
    const fetchProducts = async (option: QueryOptions) => {
      try {
        setLoading(true);
        setInitialLoad(true);

        const api = new MockProductAPI();
        const data = await api.getProducts(option, undefined); // anchor 초기화

        setProducts(data.data);
        setAnchor(data.anchor);
        setHasMore(data.hasMore);

        // 고유 카테고리 추출
        const uniqueCategories = Array.from(
          new Set(data.data.map((product: Product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("상품 로딩 실패:", error);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchProducts(option);
  }, [option]);

  // 추가 데이터 로드 함수
  const fetchMoreProducts = async (option: QueryOptions, anchor?: string) => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const api = new MockProductAPI();
      const data = await api.getProducts(option, anchor);

      setProducts((prevProducts) => [...prevProducts, ...data.data]);
      setAnchor(data.anchor);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("추가 상품 로딩 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoad && loading) {
    return <Loader size="large" text="상품을 불러오는 중..." />;
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

      <ProductList data={products} lastProductRef={lastProductRef} />

      {loading && !initialLoad && (
        <Loader size="small" text="추가 상품을 불러오는 중..." />
      )}
      {!hasMore && products.length > 0 && (
        <div className="no-more-products">모든 상품을 불러왔습니다.</div>
      )}
    </div>
  );
};
