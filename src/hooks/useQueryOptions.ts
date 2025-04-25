import { useSearchParams } from "react-router-dom";
import { QueryOptions, Category } from "../server/types";
import { useMemo } from "react";

export function useQueryOptions(): {
  option: QueryOptions;
  updateOption: (newOption: QueryOptions) => void;
  resetOption: () => void;
} {
  const [searchParams, setSearchParams] = useSearchParams();

  const option = useMemo(() => {
    const searchQuery = searchParams.get("searchQuery") || "";
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 0;
    const categories =
      (searchParams
        .get("categories")
        ?.split(",")
        .filter(Boolean) as Category[]) || [];
    const sortBy = (searchParams.get("sortBy") as "price" | "name") || "name";
    const sortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "asc";

    return {
      searchQuery,
      minPrice,
      maxPrice,
      categories,
      sortBy,
      sortOrder,
    };
  }, [searchParams]);

  const updateOption = (newOption: QueryOptions) => {
    const params = new URLSearchParams();

    if (newOption.searchQuery) params.set("searchQuery", newOption.searchQuery);
    if (newOption.minPrice)
      params.set("minPrice", newOption.minPrice.toString());
    if (newOption.maxPrice)
      params.set("maxPrice", newOption.maxPrice.toString());
    if (newOption.categories?.length)
      params.set("categories", newOption.categories.join(","));
    if (newOption.sortBy) params.set("sortBy", newOption.sortBy);
    if (newOption.sortOrder) params.set("sortOrder", newOption.sortOrder);

    setSearchParams(params);
  };

  const resetOption = () => {
    setSearchParams(new URLSearchParams());
  };

  return { option, updateOption, resetOption };
}
