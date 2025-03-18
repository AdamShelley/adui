import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useState, useRef, useEffect, useCallback } from "react";
import "./Search-bar.css";

interface Option {
  id: number;
  label: string;
}

interface SearchBarProps {
  dropdownOptions?: Option[];
  maxSuggestions?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  dropdownOptions = [],
  maxSuggestions = 5,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [displayValue, setDisplayValue] = useState(""); // New state for display value
  const [filteredSuggestions, setFilteredSuggestions] = useState<Option[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const filterSuggestions = useCallback(
    (value: string) => {
      if (!dropdownOptions || value.length === 0) return [];

      return dropdownOptions.filter((suggestion) =>
        suggestion.label.toLowerCase().includes(value.toLowerCase())
      );
    },
    [dropdownOptions]
  );

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    setDisplayValue(value); // Keep display value in sync when typing
    setFilteredSuggestions(filterSuggestions(value));
    setSelectedIndex(-1); // Reset selection index when typing
  };

  const handleSuggestionClick = (suggestion: Option) => {
    setSearchValue(suggestion.label);
    setDisplayValue(suggestion.label); // Update display value on selection
    setIsFocused(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const suggestionsToDisplay =
      searchValue.length > 0
        ? filteredSuggestions.slice(0, maxSuggestions)
        : dropdownOptions.slice(0, maxSuggestions);

    if (event.key === "Enter") {
      // If we have a selected suggestion, use it
      if (selectedIndex >= 0 && selectedIndex < suggestionsToDisplay.length) {
        handleSuggestionClick(suggestionsToDisplay[selectedIndex]);
      } else {
        // Try to find an exact match
        const selectedSuggestion = filteredSuggestions.find(
          (suggestion) => suggestion.label === searchValue
        );
        if (selectedSuggestion) {
          handleSuggestionClick(selectedSuggestion);
        }
        setIsFocused(false);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (suggestionsToDisplay.length > 0) {
        const nextIndex =
          selectedIndex < suggestionsToDisplay.length - 1
            ? selectedIndex + 1
            : 0;
        setSelectedIndex(nextIndex);
        // Show the suggestion in the input but don't update searchValue
        setDisplayValue(suggestionsToDisplay[nextIndex].label);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (suggestionsToDisplay.length > 0) {
        const prevIndex =
          selectedIndex > 0
            ? selectedIndex - 1
            : suggestionsToDisplay.length - 1;
        setSelectedIndex(prevIndex);
        // Show the suggestion in the input but don't update searchValue
        setDisplayValue(suggestionsToDisplay[prevIndex].label);
      }
    } else if (event.key === "Escape") {
      setIsFocused(false);
      setSelectedIndex(-1);
      setDisplayValue(searchValue); // Reset display value to match search value
    }
  };

  useEffect(() => {
    if (searchValue) {
      setFilteredSuggestions(filterSuggestions(searchValue));
    }
  }, [dropdownOptions, filterSuggestions, searchValue]);

  useEffect(() => {
    // Initialize displayValue with searchValue
    setDisplayValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        inputRef.current &&
        !(inputRef.current as HTMLDivElement).contains(event.target as Node)
      ) {
        setIsFocused(false);
        setDisplayValue(searchValue); // Reset display value when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchValue]);

  const suggestionsToDisplay =
    searchValue.length > 0
      ? filteredSuggestions.slice(0, maxSuggestions)
      : dropdownOptions.slice(0, maxSuggestions);

  const hasMoreResults =
    searchValue.length > 0
      ? filteredSuggestions.length > maxSuggestions
      : dropdownOptions.length > maxSuggestions;

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className="w-full flex justify-center items-center h-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key="search-container"
      >
        <motion.div
          ref={inputRef}
          className={`relative flex items-center rounded-lg border box-border bg-white ${
            isFocused ? "border-zinc-500" : "border-zinc-200"
          }`}
          initial={{ width: "50%" }}
          animate={{
            width: isFocused ? "51%" : "50%",
            borderBottom: isFocused ? "border-zinc-200" : "border-zinc-200",
            boxShadow: isFocused ? "0 5px 10px rgba(0, 0, 0, 0.05)" : "none",
            borderBottomLeftRadius: isFocused ? 0 : "0.375rem",
            borderBottomRightRadius: isFocused ? 0 : "0.375rem",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
          }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-3 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ scale: 1 }}
            animate={{
              scale: isFocused ? 1.1 : 1,
              rotate: isFocused ? 0 : -5,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </motion.svg>

          <motion.input
            type="text"
            placeholder="Search..."
            className="p-3 w-full outline-none relative "
            onFocus={() => setIsFocused(true)}
            onChange={onChangeHandler}
            value={displayValue} // Use displayValue instead of searchValue
            onKeyDown={(e) => handleKeyDown(e)}
            animate={{
              paddingLeft: isFocused ? "12px" : "8px",
            }}
          />

          {isFocused && dropdownOptions?.length > 0 && (
            <SuggestionDropdown
              suggestions={suggestionsToDisplay}
              onSuggestionClick={handleSuggestionClick}
              hasMoreResults={hasMoreResults}
              totalResults={
                searchValue.length > 0
                  ? filteredSuggestions.length
                  : dropdownOptions.length
              }
              selectedIndex={selectedIndex}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchBar;

interface SuggestionDropdownProps {
  suggestions: Option[];
  onSuggestionClick: (suggestion: Option) => void;
  hasMoreResults?: boolean;
  totalResults?: number;
  selectedIndex?: number; // Add this prop to the interface
}

const SuggestionDropdown = ({
  suggestions,
  onSuggestionClick,
  hasMoreResults = false,
  totalResults = 0,
  selectedIndex = -1, // Add this prop with default value
}: SuggestionDropdownProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute w-full bg-white shadow-lg top-full left-0 right-0 rounded-b-xl border border-t-0 border-zinc-500 box-border overflow-hidden"
        style={{
          top: "calc(100% - 1px)",
          width: "calc(100% + 2px)",
          marginLeft: "-1px",
          transformOrigin: "top",
        }}
        initial={{
          opacity: 0,
          height: 0,
          scaleY: 0.8,
          y: -5,
        }}
        animate={{
          opacity: 1,
          height: "auto",
          scaleY: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          duration: 0.3,
          opacity: { duration: 0.2 },
          height: { duration: 0.25 },
        }}
        exit={{
          opacity: 0,
          height: 0,
          scaleY: 0.8,
          transition: {
            duration: 0.2,
            height: { duration: 0.15 },
          },
        }}
      >
        <motion.ul className="p-2">
          {suggestions.length > 0 ? (
            <>
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={suggestion.id || index}
                  className={`p-2 hover:bg-gray-100 cursor-pointer rounded-md suggestion-item ${
                    index === selectedIndex ? "bg-gray-100" : ""
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onSuggestionClick(suggestion)}
                >
                  {suggestion.label}
                </motion.li>
              ))}
              {hasMoreResults && (
                <motion.div
                  className="text-xs text-gray-500 p-2 text-center border-t border-gray-100 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {`Showing ${suggestions.length} of ${totalResults} results`}
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              className="p-2 text-gray-500 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No results found
            </motion.div>
          )}
        </motion.ul>
      </motion.div>
    </AnimatePresence>
  );
};
