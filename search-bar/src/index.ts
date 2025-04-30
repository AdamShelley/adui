// Import styles directly in the entry point
import "./SearchBar.css";

// Import SearchBar component
import { SearchBar as SearchBarComponent } from "./SearchBar";

// Main component export
export { SearchBarComponent as SearchBar };

// Also provide a default export for better compatibility
export default SearchBarComponent;

// Type exports
export type {
  Option,
  SearchBarProps,
  SuggestionDropdownProps,
} from "./types/SearchBarTypes";

// Utility exports
export { cn } from "./utils/cn";
