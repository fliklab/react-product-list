export interface LikedItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

export type LikedItems = Record<number, LikedItem>;
