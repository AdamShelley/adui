// Import styles directly in the entry point
import "./SearchBar.css";

// Main component export
export { SearchBar } from "./SearchBar";

// Type exports
export type {
  Option,
  SearchBarProps,
  SuggestionDropdownProps,
} from "./types/SearchBarTypes";

// Utility exports
export { cn } from "./utils/cn";
