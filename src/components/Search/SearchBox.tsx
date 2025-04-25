import React from "react";
import styled from "@emotion/styled";
import { useSearchBox } from "../../hooks/useSearchBox";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.border.main};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  font-size: ${(props) => props.theme.typography.fontSizes.md};
  transition: all ${(props) => props.theme.transitions.duration.fast};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light};
  }
`;

const SuggestionsContainer = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.background.paper};
  border: 1px solid ${(props) => props.theme.colors.border.main};
  border-radius: ${(props) => props.theme.borderRadius.md};
  box-shadow: ${(props) => props.theme.shadows.md};
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const SuggestionItem = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  cursor: pointer;
  transition: background-color
    ${(props) => props.theme.transitions.duration.fast};

  &:hover {
    background-color: ${(props) => props.theme.colors.grey[100]};
  }

  strong {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const {
    query,
    suggestions,
    showSuggestions,
    containerRef,
    handleInputChange,
    handleKeyDown,
    handleSuggestionClick,
    handleInputFocus,
    highlightMatch,
  } = useSearchBox({ onSearch });

  return (
    <SearchContainer ref={containerRef}>
      <SearchInput
        type="text"
        placeholder="상품명 또는 카테고리로 검색 (Enter를 눌러 검색)"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
      />
      <SuggestionsContainer show={showSuggestions && suggestions.length > 0}>
        {suggestions.map((suggestion, index) => (
          <SuggestionItem
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {highlightMatch(suggestion)}
          </SuggestionItem>
        ))}
      </SuggestionsContainer>
    </SearchContainer>
  );
};
