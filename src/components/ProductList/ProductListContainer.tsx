import React, { useEffect, useState, useRef, useCallback } from "react";
import { Category, Product, QueryOptions } from "../../server/types";
import { MockProductAPI } from "../../server/api";
import { ProductFilterComponent } from "../ProductFilter/ProductFilterComponent";
import { ProductList } from "./ProductList";
import { useQueryOptions } from "../../hooks/useQueryOptions";
import { Loader } from "../common/Loader/index";
import { SearchBox } from "../Search/SearchBox";
import styled from "@emotion/styled";
import { useLikedItems } from "../../hooks/useLikedItems";

const PageContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.theme.spacing.lg} 0;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 0 ${(props) => props.theme.spacing.md};
  }
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xl} 0;
`;

export const ProductListContainer: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFetched, setIsFetched] = useState(false);

  // 무한 스크롤을 위한 상태들
  const [anchor, setAnchor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  // URL 쿼리 파라미터 사용
  const { option, updateOption, resetOption } = useQueryOptions();
  const { toggleItem, isItemLiked } = useLikedItems();

  // API 인스턴스를 메모이제이션
  const api = useRef(new MockProductAPI());

  // 추가 데이터 로드 함수
  const fetchMoreProducts = useCallback(
    async (currentOption: QueryOptions, currentAnchor?: string) => {
      if (!hasMore || loading) return;

      try {
        setLoading(true);
        const data = await api.current.getProducts(
          currentOption,
          currentAnchor
        );

        const productsWithLikeStatus = data.data.map((product) => ({
          ...product,
          isLiked: isItemLiked(Number(product.id)),
        }));

        setProducts((prevProducts) => [
          ...prevProducts,
          ...productsWithLikeStatus,
        ]);
        setAnchor(data.anchor);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error("추가 상품 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    },
    [hasMore, loading, isItemLiked]
  );

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
    [loading, hasMore, fetchMoreProducts, option, anchor]
  );

  // 초기 데이터 로드
  useEffect(() => {
    const fetchInitialProducts = async () => {
      // 이미 데이터를 불러왔다면 다시 불러오지 않음
      if (isFetched) return;

      try {
        setLoading(true);
        setInitialLoad(true);

        const data = await api.current.getProducts(option, undefined);
        const productsWithLikeStatus = data.data.map((product) => ({
          ...product,
          isLiked: isItemLiked(Number(product.id)),
        }));

        setProducts(productsWithLikeStatus);
        setAnchor(data.anchor);
        setHasMore(data.hasMore);

        const uniqueCategories = Array.from(
          new Set(data.data.map((product: Product) => product.category))
        );
        setCategories(uniqueCategories);
        setIsFetched(true);
      } catch (error) {
        console.error("상품 로딩 실패:", error);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchInitialProducts();
  }, [option]); // isItemLiked 제거, option만 의존성으로 유지

  // 좋아요 상태가 변경될 때마다 products 상태 업데이트
  useEffect(() => {
    if (!isFetched) return;

    setProducts((prevProducts) =>
      prevProducts.map((product) => ({
        ...product,
        isLiked: isItemLiked(Number(product.id)),
      }))
    );
  }, [isItemLiked, isFetched]);

  const handleSearch = (query: string) => {
    setIsFetched(false); // 검색어가 변경되면 다시 fetch 하도록 설정
    updateOption({ searchQuery: query || undefined });
  };

  const handleLikeToggle = useCallback(
    (product: Product) => {
      const isLiked = toggleItem({
        id: Number(product.id),
        name: product.name,
        price: product.price,
        image: product.imageUrl || "",
      });

      // 개별 상품의 isLiked 상태만 업데이트
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === product.id ? { ...p, isLiked } : p))
      );
    },
    [toggleItem]
  );

  return (
    <PageContainer>
      <ContentContainer>
        <ListContainer>
          <SearchBox onSearch={handleSearch} />
          <ProductFilterComponent
            filter={option}
            categories={categories}
            onFilterChange={(newFilter) => {
              // 검색어는 유지하고 다른 필터만 업데이트
              updateOption({
                ...newFilter,
                searchQuery: option.searchQuery,
              });
            }}
            onReset={resetOption}
          />

          {initialLoad ? (
            <LoaderWrapper>
              <Loader size="large" text="상품을 불러오는 중..." />
            </LoaderWrapper>
          ) : (
            <>
              <ProductList
                data={products}
                lastProductRef={lastProductRef}
                onLikeToggle={handleLikeToggle}
              />
              {loading && !initialLoad && (
                <LoaderWrapper>
                  <Loader size="small" text="추가 상품을 불러오는 중..." />
                </LoaderWrapper>
              )}
              {!hasMore && products.length > 0 && (
                <LoaderWrapper>
                  <div>모든 상품을 불러왔습니다.</div>
                </LoaderWrapper>
              )}
            </>
          )}
        </ListContainer>
      </ContentContainer>
    </PageContainer>
  );
};
