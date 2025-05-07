import { useState, useCallback } from "react";
import { LikedItems, LikedItem } from "../types/like";
import {
  getLikedItems,
  toggleLikedItem,
  removeLikedItem,
} from "../utils/localStorage";

export const useLikedItems = () => {
  const [likedItems, setLikedItems] = useState<LikedItems>(getLikedItems());

  const toggleItem = useCallback((item: LikedItem) => {
    const isLiked = toggleLikedItem(item);
    setLikedItems(getLikedItems());
    return isLiked;
  }, []);

  const removeItem = useCallback((itemId: number) => {
    removeLikedItem(itemId);
    setLikedItems(getLikedItems());
  }, []);

  const isItemLiked = useCallback(
    (itemId: number) => {
      return likedItems[itemId] !== undefined;
    },
    [likedItems]
  );

  return {
    likedItems,
    toggleItem,
    removeItem,
    isItemLiked,
  };
};
