// 상품 인터페이스
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl?: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  createdAt?: Date;
}

// 카테고리 타입
export type Category = "상의" | "하의" | "원피스" | "아우터" | "액세서리";

// 가격 필터 인터페이스
export interface PriceFilter {
  min?: number;
  max?: number;
}

// 필터 옵션 인터페이스
export interface FilterOptions {
  category?: Category;
  priceRange?: PriceFilter;
  searchQuery?: string;
}

// API 응답 인터페이스
export interface ApiResponse<T> {
  data: T;
  totalCount: number;
  hasMore: boolean;
  anchor?: string; // 다음 데이터 로드를 위한 앵커
}
