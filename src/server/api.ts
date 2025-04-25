import { keywords, mockProducts } from "./data";
import { ApiResponse, QueryOptions, Product } from "./types";

// 앵커 기반 시스템 구현
export class MockProductAPI {
  private products: Product[] = mockProducts; // 가짜 제품 데이터 200개 정도
  private pageSize: number = 10;

  // 상품 목록 조회 (앵커 기반 페이지네이션)
  async getProducts(
    options: QueryOptions = {},
    anchor?: string,
    limit: number = this.pageSize
  ): Promise<ApiResponse<Product[]>> {
    // 필터링된 상품 생성
    const filteredProducts = this.filterAndSortProducts(this.products, options);

    // 앵커 기반 페이지네이션
    let startIndex = 0;
    if (anchor) {
      const anchorIndex = filteredProducts.findIndex((p) => p.id === anchor);
      startIndex = anchorIndex !== -1 ? anchorIndex + 1 : 0;
    }

    const endIndex = startIndex + limit;
    const pagedProducts = filteredProducts.slice(startIndex, endIndex);
    const hasMore = endIndex < filteredProducts.length;

    // 다음 앵커 계산
    const nextAnchor = hasMore
      ? pagedProducts[pagedProducts.length - 1].id
      : undefined;

    const response = {
      data: pagedProducts,
      totalCount: filteredProducts.length,
      hasMore,
      anchor: nextAnchor,
    };

    // 네트워크 지연을 시뮬레이션
    await new Promise((resolve) =>
      setTimeout(resolve, 500 + 8 * Math.random() * 100)
    );

    const request = {
      options,
      anchor,
      limit,
    };

    console.log("getProducts", { request, response });

    return response;
  }

  // 상품 등록
  async addProduct(
    product: Omit<Product, "id" | "createdAt">
  ): Promise<Product> {
    const createdAt = new Date();
    const newProduct = {
      ...product,
      id: crypto.randomUUID(),
      createdAt,
    };
    this.products.push(newProduct);

    return newProduct;
  }

  // 상품 좋아요 토글
  async toggleLike(productId: string): Promise<Product> {
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // 로컬스토리지에서 좋아요 맵 가져오기
    const likedProductsMap = JSON.parse(
      localStorage.getItem("likedProducts") || "{}"
    );

    // 좋아요 상태 토글
    product.isLiked = !product.isLiked;

    // 로컬스토리지 업데이트
    if (product.isLiked) {
      likedProductsMap[productId] = true;
    } else {
      delete likedProductsMap[productId];
    }
    localStorage.setItem("likedProducts", JSON.stringify(likedProductsMap));

    return product;
  }

  // 상품 찜하기 토글
  async toggleBookmark(productId: string): Promise<Product> {
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // 로컬스토리지에서 찜하기 맵 가져오기
    const bookmarkedProductsMap = JSON.parse(
      localStorage.getItem("bookmarkedProducts") || "{}"
    );

    // 찜하기 상태 토글
    product.isBookmarked = !product.isBookmarked;

    // 로컬스토리지 업데이트
    if (product.isBookmarked) {
      bookmarkedProductsMap[productId] = true;
    } else {
      delete bookmarkedProductsMap[productId];
    }
    localStorage.setItem(
      "bookmarkedProducts",
      JSON.stringify(bookmarkedProductsMap)
    );

    return product;
  }

  // 필터링 로직
  private filterAndSortProducts(
    products: Product[],
    options: QueryOptions
  ): Product[] {
    const { categories, minPrice, maxPrice, sortBy, sortOrder, searchQuery } =
      options;

    const isProductIncluded = (product: Product) => {
      // 검색어 필터링
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(query);
        const categoryMatch = product.category.toLowerCase().includes(query);
        if (!nameMatch && !categoryMatch) return false;
      }

      if (categories?.length && !categories.includes(product.category))
        return false;
      if (minPrice && product.price < minPrice) return false;
      if (maxPrice && product.price > maxPrice) return false;
      return true;
    };

    const filteredProducts = products.filter(isProductIncluded).sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });

    return filteredProducts;
  }

  // 추천 검색어 조회
  async getSuggestions(query: string): Promise<string[]> {
    if (query.length < 1) return [];

    const suggestKeywords = keywords
      .filter((keyword) => keyword.startsWith(query))
      .slice(0, 5);

    // 검색어가 1글자인 경우 키워드만 검색해서 추천
    if (query.length === 1) {
      console.log("getSuggestions", { query, suggestions: suggestKeywords });
      return suggestKeywords;
    }
    // 검색어로 상품 필터링
    const suggestProducts = this.products
      .filter((product) => {
        const name = product.name.toLowerCase();
        const searchQuery = query.toLowerCase();

        // 1. 상품명이 검색어로 시작하는 경우
        // 2. 상품명에 검색어가 포함된 경우
        return name.startsWith(searchQuery) || name.includes(searchQuery);
      })
      .sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        const searchQuery = query.toLowerCase();

        // 정확도에 따른 정렬
        const aStartsWithName = aName.startsWith(searchQuery) ? 0 : 1;
        const bStartsWithName = bName.startsWith(searchQuery) ? 0 : 1;

        return aStartsWithName - bStartsWithName;
      })
      .slice(0, 5)
      .map((suggestion) => suggestion.name);

    const suggestions = [
      ...suggestKeywords.slice(0, 2),
      ...suggestProducts.slice(0, 3),
    ];

    // 네트워크 지연 시뮬레이션 (실제 서버 환경과 비슷하게)
    await new Promise((resolve) =>
      setTimeout(resolve, 100 + Math.random() * 100)
    );

    console.log("getSuggestions", { query, suggestions });

    return suggestions;
  }
}
