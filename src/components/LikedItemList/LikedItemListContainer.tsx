import { useLikedItems } from "../../hooks/useLikedItems";
import { LikedItemList } from "./LikedItemList";

export const LikedItemListContainer = () => {
  const { likedItems, removeItem } = useLikedItems();
  const items = Object.values(likedItems);

  return <LikedItemList items={items} onDelete={removeItem} />;
};
