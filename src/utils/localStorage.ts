import { LikedItems, LikedItem } from "../types/like";

const LIKED_ITEMS_KEY = "likedItems";

export const getLikedItems = (): LikedItems => {
  const items = localStorage.getItem(LIKED_ITEMS_KEY);
  return items ? JSON.parse(items) : {};
};

export const toggleLikedItem = (item: LikedItem): boolean => {
  const items = getLikedItems();
  const isLiked = items[item.id] !== undefined;

  if (isLiked) {
    delete items[item.id];
  } else {
    items[item.id] = item;
  }

  localStorage.setItem(LIKED_ITEMS_KEY, JSON.stringify(items));
  return !isLiked;
};

export const removeLikedItem = (itemId: number): void => {
  const items = getLikedItems();
  delete items[itemId];
  localStorage.setItem(LIKED_ITEMS_KEY, JSON.stringify(items));
};
