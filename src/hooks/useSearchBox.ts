import React, { useState, useRef, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { MockProductAPI } from "../server/api";

interface UseSearchBoxProps {
  onSearch: (query: string) => void;
}

interface UseSearchBoxReturn {
  query: string;
  suggestions: string[];
  showSuggestions: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSuggestionClick: (suggestion: string) => void;
  handleInputFocus: () => void;
  highlightMatch: (text: string) => string | (string | React.ReactElement)[];
}

/**
 * 검색 기능을 제공하는 커스텀 훅
 * @param props - 검색 이벤트 핸들러를 포함하는 props
 * @returns 검색 관련 상태와 핸들러들을 포함하는 객체
 */
export const useSearchBox = ({
  onSearch,
}: UseSearchBoxProps): UseSearchBoxReturn => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const loadingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const api = useRef(new MockProductAPI());

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (loadingRef.current) return;
      if (debouncedQuery.length >= 1) {
        loadingRef.current = true;
        try {
          const suggestions = await api.current.getSuggestions(debouncedQuery);
          setSuggestions(suggestions);
          setShowSuggestions(true);
        } catch (error) {
          console.error("추천 검색어 로딩 실패:", error);
        } finally {
          loadingRef.current = false;
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (query.length >= 1) {
      setShowSuggestions(true);
    }
  };

  const highlightMatch = (
    text: string
  ): string | (string | React.ReactElement)[] => {
    if (!text || typeof text !== "string") return "";
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) => {
      if (regex.test(part)) {
        return React.createElement("strong", { key: i }, part);
      }
      return part;
    });
  };

  return {
    query,
    suggestions,
    showSuggestions,
    containerRef,
    handleInputChange,
    handleKeyDown,
    handleSuggestionClick,
    handleInputFocus,
    highlightMatch,
  };
};
