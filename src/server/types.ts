// 상품 인터페이스
export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description?: string;
  imageUrl?: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  createdAt?: Date;
}

export const CATEGORIES = [
  "상의",
  "하의",
  "원피스",
  "아우터",
  "액세서리",
] as const;
export type Category = (typeof CATEGORIES)[number];

// 필터 옵션 인터페이스
export interface QueryOptions {
  categories?: Category[];
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  sortBy?: "price" | "name";
  sortOrder?: "asc" | "desc";
}

// API 응답 인터페이스
export interface ApiResponse<T> {
  data: T;
  totalCount: number;
  hasMore: boolean;
  anchor?: string; // 다음 데이터 로드를 위한 앵커
}
