import React from "react";

export interface Option {
  id: number;
  label: string;
}

export interface SearchBarProps {
  dropdownOptions?: Option[];
  maxSuggestions?: number;
  placeholder?: string;
  onSelect?: (selectedOption: Option) => void;
  onChange?: (inputValue: string) => void;
  disabled?: boolean;
  minimizable?: boolean;
  showClearButton?: boolean;
  clearButtonStyleClass?: string;
  clearOnSelect?: boolean;
  noResultsMessage?: string;
  filterDebounceTime?: number;
  renderItem?: (item: Option, isSelected: boolean) => React.ReactNode;
  highlightMatches?: boolean;
  highlightMatchesStyles?: string;
  customLoader?: React.ReactNode;
}

export interface SuggestionDropdownProps {
  suggestions: Option[];
  onSuggestionClick: (suggestion: Option) => void;
  hasMoreResults?: boolean;
  totalResults?: number;
  selectedIndex?: number;
  searchValue?: string;
  selectedSuggestionId?: number | null;
  noResultsMessage?: string;
  renderItem?: (item: Option, isSelected: boolean) => React.ReactNode;
  highlightMatches?: boolean;
  highlightMatchesStyles?: string;
  customLoader?: React.ReactNode;
}
