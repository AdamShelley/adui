import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useState, useRef, useEffect, useCallback } from "react";
import "./Search-bar.css";
import { cn } from "./utils/cn";

interface Option {
  id: number;
  label: string;
}

interface SearchBarProps {
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

const SearchBar: React.FC<SearchBarProps> = ({
  dropdownOptions = [],
  maxSuggestions = 5,
  placeholder,
  onSelect,
  onChange,
  disabled,
  showClearButton,
  clearButtonStyleClass,
  clearOnSelect,
  minimizable,
  noResultsMessage,
  filterDebounceTime = 100,
  renderItem,
  highlightMatches,
  highlightMatchesStyles,
  customLoader,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [displayValue, setDisplayValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Option[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isMinimized, setIsMinimized] = useState(minimizable);
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<
    number | null
  >(null);

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
    setDisplayValue(value);
    setShowSuggestions(true);

    // Clear any existing timeout
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce the actual filtering and state updates
    debounceTimerRef.current = setTimeout(() => {
      setSearchValue(value);
      if (value.length > 0) {
        setFilteredSuggestions(filterSuggestions(value));
        onChange?.(value);
      } else {
        setFilteredSuggestions([]);
      }
      setSelectedIndex(-1);
    }, filterDebounceTime);
  };

  const handleSuggestionClick = (suggestion: Option) => {
    setSelectedSuggestionId(suggestion.id);
    setSearchValue(suggestion.label);
    setDisplayValue(suggestion.label);

    setTimeout(() => {
      onSelect?.(suggestion);
      setShowSuggestions(false);
      setSelectedIndex(-1);
      setSelectedSuggestionId(null);

      if (clearOnSelect) {
        setSearchValue("");
        setDisplayValue("");
      }
    }, filterDebounceTime);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const suggestionsToDisplay =
      searchValue.length > 0
        ? filteredSuggestions.slice(0, maxSuggestions)
        : dropdownOptions.slice(0, maxSuggestions);

    if (event.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < suggestionsToDisplay.length) {
        handleSuggestionClick(suggestionsToDisplay[selectedIndex]);
      } else {
        const selectedSuggestion = filteredSuggestions.find(
          (suggestion) => suggestion.label === searchValue
        );
        if (selectedSuggestion) {
          handleSuggestionClick(selectedSuggestion);
        } else {
          setIsFocused(false);
          const inputElement = inputRef.current as HTMLElement | null;
          if (inputElement) {
            inputElement.animate(
              [
                { transform: "scale(1)" },
                { transform: "scale(1.02)" },
                { transform: "scale(1)" },
              ],
              { duration: filterDebounceTime, easing: "ease-in-out" }
            );
          }
        }
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (suggestionsToDisplay.length > 0) {
        const nextIndex =
          selectedIndex < suggestionsToDisplay.length - 1
            ? selectedIndex + 1
            : 0;
        setSelectedIndex(nextIndex);
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
        setDisplayValue(suggestionsToDisplay[prevIndex].label);
      }
    } else if (event.key === "Escape") {
      setIsFocused(false);
      setSelectedIndex(-1);
      setDisplayValue(searchValue);
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    if (searchValue) {
      setFilteredSuggestions(filterSuggestions(searchValue));
    }
  }, [dropdownOptions, filterSuggestions, searchValue]);

  useEffect(() => {
    setDisplayValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        inputRef.current &&
        !(inputRef.current as HTMLDivElement).contains(event.target as Node)
      ) {
        setIsFocused(false);
        setDisplayValue(searchValue);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clean up any pending debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
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

  const clearSearchHandler = () => {
    setSearchValue("");
    setDisplayValue("");
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setIsFocused(false);
  };

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className={`w-full flex ${
          minimizable ? "justify-start pl-4" : "justify-center"
        } items-center h-16`}
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
          initial={{ width: minimizable ? "48px" : "50%" }}
          animate={{
            width: minimizable
              ? isMinimized
                ? "60px"
                : "51%"
              : isFocused
              ? "53%"
              : "50%",
            height: minimizable
              ? isMinimized
                ? "100%"
                : "100%"
              : isFocused
              ? "100%"
              : "100%",
            borderBottom: isFocused ? "border-zinc-200" : "border-zinc-200",
            boxShadow: isFocused ? "0 5px 10px rgba(0, 0, 0, 0.05)" : "none",
            borderBottomLeftRadius:
              isFocused && showSuggestions && searchValue.length > 0
                ? 0
                : "0.375rem",
            borderBottomRightRadius:
              isFocused &&
              showSuggestions &&
              searchValue.length > 0 &&
              suggestionsToDisplay.length > 0
                ? 0
                : "0.375rem",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            originX: 0,
          }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${
              minimizable && isMinimized ? "mx-auto" : "ml-3"
            } text-gray-400 ${minimizable ? "cursor-pointer" : ""} ${
              isMinimized ? "text-slate-800 font-bold" : ""
            } flex-shrink-0 min-w-[20px]`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ scale: 1 }}
            animate={{
              rotate: isFocused ? 0 : -5,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            onClick={() => minimizable && setIsMinimized(!isMinimized)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </motion.svg>

          {(!minimizable || !isMinimized) && (
            <>
              <motion.input
                type="text"
                placeholder={placeholder || "Search..."}
                className="p-3 w-full outline-none relative"
                disabled={disabled}
                onFocus={() => {
                  setIsFocused(true);
                  if (searchValue.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                onChange={onChangeHandler}
                value={displayValue}
                onKeyDown={(e) => handleKeyDown(e)}
                animate={{
                  paddingLeft: "8px",
                  opacity: 1,
                  width: "100%",
                }}
                initial={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              />
              <AnimatePresence>
                {showClearButton && searchValue.length ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    key="clear-button"
                  >
                    <button
                      className={cn(
                        "rounded-sm p-1 mr-2 bg-zinc-50 hover:bg-zinc-100 transition cursor-pointer",
                        clearButtonStyleClass
                      )}
                      onClick={clearSearchHandler}
                    >
                      Clear
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {isFocused &&
                dropdownOptions?.length > 0 &&
                searchValue.length > 0 &&
                showSuggestions && (
                  <SuggestionDropdown
                    suggestions={suggestionsToDisplay}
                    onSuggestionClick={handleSuggestionClick}
                    hasMoreResults={hasMoreResults}
                    noResultsMessage={noResultsMessage}
                    renderItem={renderItem}
                    searchValue={searchValue}
                    totalResults={
                      searchValue.length > 0
                        ? filteredSuggestions.length
                        : dropdownOptions.length
                    }
                    selectedIndex={selectedIndex}
                    selectedSuggestionId={selectedSuggestionId}
                    highlightMatches={highlightMatches}
                    highlightMatchesStyles={highlightMatchesStyles}
                    customLoader={customLoader}
                  />
                )}
            </>
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
  selectedIndex?: number;
  searchValue?: string;
  selectedSuggestionId?: number | null;
  noResultsMessage?: string;
  renderItem?: (item: Option, isSelected: boolean) => React.ReactNode;
  highlightMatches?: boolean;
  highlightMatchesStyles?: string;
  customLoader?: React.ReactNode;
}

const SuggestionDropdown = ({
  suggestions,
  onSuggestionClick,
  hasMoreResults = false,
  totalResults = 0,
  selectedIndex = -1,
  selectedSuggestionId = null,
  searchValue = "",
  noResultsMessage,
  renderItem,
  highlightMatches,
  highlightMatchesStyles,
  customLoader,
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
              {suggestions.map((suggestion, index) => {
                const isSelected =
                  index === selectedIndex ||
                  selectedSuggestionId === suggestion.id;

                if (renderItem) {
                  // Wrap custom rendered item in a motion.div to handle animations
                  return (
                    <motion.div
                      key={suggestion.id || index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: isSelected ? [1, 1.05, 1] : 1,
                        backgroundColor:
                          selectedSuggestionId === suggestion.id
                            ? ["#ffffff", "#f3f4f6", "#ffffff"]
                            : undefined,
                      }}
                      transition={{
                        delay: index * 0.03,
                        duration: 0.2,
                        scale: { duration: 0.3 },
                        backgroundColor: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSuggestionClick(suggestion)}
                      className="cursor-pointer"
                    >
                      {renderItem(suggestion, isSelected)}
                    </motion.div>
                  );
                }

                return (
                  <motion.li
                    key={suggestion.id || index}
                    className={`p-2 hover:bg-gray-100 cursor-pointer rounded-md suggestion-item ${
                      isSelected ? "font-medium !bg-zinc-100" : ""
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale:
                        selectedSuggestionId === suggestion.id
                          ? [1, 1.05, 1]
                          : 1,
                      backgroundColor:
                        selectedSuggestionId === suggestion.id
                          ? ["#ffffff", "#f3f4f6", "#ffffff"]
                          : undefined,
                    }}
                    transition={{
                      delay: index * 0.03,
                      duration: 0.2,
                      scale: { duration: 0.3 },
                      backgroundColor: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSuggestionClick(suggestion)}
                  >
                    {highlightMatches ? (
                      <span>
                        {suggestion.label
                          .split(new RegExp(`(${searchValue})`, "i"))
                          .map((part, i) => {
                            return (
                              <span
                                key={i}
                                className={
                                  part.toLowerCase() ===
                                  searchValue.toLowerCase()
                                    ? `${
                                        highlightMatchesStyles
                                          ? highlightMatchesStyles
                                          : "bg-yellow-200"
                                      }`
                                    : ""
                                }
                              >
                                {part}
                              </span>
                            );
                          })}
                      </span>
                    ) : (
                      <span>{suggestion.label}</span>
                    )}
                  </motion.li>
                );
              })}
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
            <>
              <motion.div
                className="p-2 text-gray-500 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {customLoader}
              </motion.div>

              <motion.div
                className="p-2 text-gray-500 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {noResultsMessage?.length
                  ? noResultsMessage
                  : "No results found"}
              </motion.div>
            </>
          )}
        </motion.ul>
      </motion.div>
    </AnimatePresence>
  );
};
