import { mockProducts } from "./data";
import { ApiResponse, FilterOptions, Product } from "./types";

// 앵커 기반 시스템 구현
export class MockProductAPI {
  private products: Product[] = mockProducts; // 가짜 제품 데이터 200개 정도
  private pageSize: number = 10;

  // 상품 목록 조회 (앵커 기반 페이지네이션)
  async getProducts(
    filters: FilterOptions = {},
    anchor?: string,
    limit: number = this.pageSize
  ): Promise<ApiResponse<Product[]>> {
    // 필터링된 상품 생성
    const filteredProducts = this.filterProducts(this.products, filters);

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

    return {
      data: pagedProducts,
      totalCount: filteredProducts.length,
      hasMore,
      anchor: nextAnchor,
    };
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
  private filterProducts(
    products: Product[],
    filters: FilterOptions
  ): Product[] {
    const { category, priceRange } = filters;

    return products.filter((product) => {
      if (category && product.category !== category) return false;
      if (priceRange && priceRange.min && product.price < priceRange.min)
        return false;
      if (priceRange && priceRange.max && product.price > priceRange.max)
        return false;
      return true;
    });
  }
}
