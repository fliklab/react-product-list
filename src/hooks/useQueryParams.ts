import { useSearchParams } from "react-router-dom";
import { QueryOptions, Category, CATEGORIES } from "../server/types";

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryOption = (): QueryOptions => {
    const categories = searchParams
      .get("categories")
      ?.split(",")
      .filter((cat): cat is Category => CATEGORIES.includes(cat as Category));

    return {
      categories: categories || undefined,
      searchQuery: searchParams.get("searchQuery") || undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      sortBy: (searchParams.get("sortBy") as "price" | "name") || undefined,
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || undefined,
    };
  };

  const updateQueryOption = (newOption: Partial<QueryOptions>) => {
    const currentOption = getQueryOption();
    const updatedOption = { ...currentOption, ...newOption };

    // 값이 기본값인 경우 URL에서 제거
    const params = new URLSearchParams();
    if (updatedOption.categories?.length)
      params.set("categories", updatedOption.categories.join(","));
    if (updatedOption.searchQuery)
      params.set("searchQuery", updatedOption.searchQuery);
    if (updatedOption.minPrice)
      params.set("minPrice", String(updatedOption.minPrice));
    if (updatedOption.maxPrice)
      params.set("maxPrice", String(updatedOption.maxPrice));
    if (updatedOption.sortBy) params.set("sortBy", updatedOption.sortBy);
    if (updatedOption.sortOrder)
      params.set("sortOrder", updatedOption.sortOrder);

    setSearchParams(params);
  };

  const resetQueryOption = () => {
    setSearchParams(new URLSearchParams());
  };

  return {
    option: getQueryOption(),
    updateOption: updateQueryOption,
    resetOption: resetQueryOption,
  };
};
