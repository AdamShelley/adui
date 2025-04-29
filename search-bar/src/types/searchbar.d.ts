import { FC, ReactNode } from "react";
import {
  Option,
  SearchBarProps,
  SuggestionDropdownProps,
} from "./SearchBarTypes";

// Component export
export declare const SearchBar: FC<SearchBarProps>;

// Type exports
export type { Option, SearchBarProps, SuggestionDropdownProps };

// Utility exports
export declare function cn(
  ...inputs: (string | undefined | null | false)[]
): string;
