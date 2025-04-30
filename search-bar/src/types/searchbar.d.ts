import { FC } from "react";
import {
  Option,
  SearchBarProps,
  SuggestionDropdownProps,
} from "./SearchBarTypes";

// Component exports
export declare const SearchBar: FC<SearchBarProps>;
declare const DefaultSearchBar: FC<SearchBarProps>;
export default DefaultSearchBar;

// Type exports
export type { Option, SearchBarProps, SuggestionDropdownProps };

// Utility exports
export declare function cn(
  ...inputs: (string | undefined | null | false)[]
): string;
