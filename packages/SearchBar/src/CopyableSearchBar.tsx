"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../utils/cn";

// -------------------- Types --------------------

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
  width?: string;
  height?: string;
  darkMode?: boolean;
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
  isDarkMode?: boolean;
}

// -------------------- Components --------------------

export const SearchBar: React.FC<SearchBarProps> = ({
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
  width = "400px",
  height = "48px",
  darkMode,
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

  // Detect system dark mode if darkMode prop is not explicitly provided
  const [systemDarkMode, setSystemDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode === undefined) {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      setSystemDarkMode(darkModeMediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setSystemDarkMode(e.matches);
      };

      darkModeMediaQuery.addEventListener("change", handleChange);
      return () =>
        darkModeMediaQuery.removeEventListener("change", handleChange);
    }
  }, [darkMode]);

  // Use explicit prop if provided, otherwise use detected system setting
  const isDarkMode = darkMode !== undefined ? darkMode : systemDarkMode;

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

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

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

    setTimeout(() => {
      setSearchValue(suggestion.label);
      setDisplayValue(suggestion.label);
      setShowSuggestions(false);
      onSelect?.(suggestion);
      setSelectedIndex(-1);

      if (clearOnSelect) {
        requestAnimationFrame(() => {
          setSearchValue("");
          setDisplayValue("");
          setSelectedSuggestionId(null);
        });
      } else {
        setTimeout(() => {
          setSelectedSuggestionId(null);
        }, 300);
      }
    }, 200);
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
      <div aria-live="polite" className="sr-only" role="status">
        {suggestionsToDisplay.length > 0
          ? `${suggestionsToDisplay.length} suggestions available.${
              selectedIndex >= 0
                ? ` ${suggestionsToDisplay[selectedIndex]?.label} selected.`
                : ""
            }`
          : searchValue.length > 0
          ? "No suggestions available."
          : ""}
      </div>

      <motion.div
        className={`w-full flex ${
          minimizable ? "justify-start pl-4" : "justify-center"
        } items-center`}
        style={{ height }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key="search-container"
      >
        <motion.div
          ref={inputRef}
          role="combobox"
          aria-expanded={
            isFocused && showSuggestions && suggestionsToDisplay.length > 0
          }
          aria-owns="search-suggestions"
          aria-haspopup="listbox"
          className={`relative flex items-center rounded-lg border box-border ${
            isDarkMode
              ? "bg-zinc-800 border-zinc-600"
              : "bg-white border-zinc-200"
          } ${
            isFocused
              ? isDarkMode
                ? "border-zinc-400"
                : "border-zinc-500"
              : isDarkMode
              ? "border-zinc-700"
              : "border-zinc-200"
          }`}
          initial={{ width: minimizable ? "48px" : width }}
          animate={{
            width: minimizable
              ? isMinimized
                ? "60px"
                : width
              : isFocused
              ? `calc(${width} + 12px)`
              : width,
            height: minimizable
              ? isMinimized
                ? height
                : height
              : isFocused
              ? height
              : height,
            borderBottom: isFocused
              ? isDarkMode
                ? "border-zinc-700"
                : "border-zinc-200"
              : isDarkMode
              ? "border-zinc-700"
              : "border-zinc-200",
            boxShadow: isFocused
              ? isDarkMode
                ? "0 5px 10px rgba(0, 0, 0, 0.2)"
                : "0 5px 10px rgba(0, 0, 0, 0.05)"
              : "none",
            borderBottomLeftRadius:
              isFocused &&
              showSuggestions &&
              searchValue.length > 0 &&
              dropdownOptions.length > 0
                ? 0
                : "0.375rem",
            borderBottomRightRadius:
              isFocused &&
              showSuggestions &&
              searchValue.length > 0 &&
              dropdownOptions.length > 0
                ? 0
                : "0.375rem",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            originX: minimizable ? 0 : 0.5,
          }}
        >
          <div
            className={cn(
              "flex items-center justify-center",
              minimizable && isMinimized ? "mx-auto" : "ml-3 mr-1"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "flex-shrink-0",
                isDarkMode ? "text-zinc-400" : "text-gray-400",
                minimizable ? "cursor-pointer" : "",
                isMinimized
                  ? isDarkMode
                    ? "text-zinc-300"
                    : "text-slate-800"
                  : ""
              )}
              style={{
                width: "16px",
                height: "16px",
                minWidth: "16px",
                maxWidth: "16px",
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => minimizable && setIsMinimized(!isMinimized)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {(!minimizable || !isMinimized) && (
            <>
              <motion.input
                type="text"
                aria-label={placeholder || "Search"}
                aria-autocomplete="list"
                aria-controls="search-suggestions"
                aria-activedescendant={
                  selectedIndex >= 0
                    ? `suggestion-${suggestionsToDisplay[selectedIndex]?.id}`
                    : undefined
                }
                placeholder={placeholder || "Search..."}
                className={`p-3 w-full outline-none relative ${
                  isDarkMode
                    ? "bg-zinc-800 text-zinc-100 placeholder-zinc-400"
                    : "text-zinc-800 placeholder-gray-400"
                }`}
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
                style={{ fontSize: "14px" }}
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
                        `rounded-sm p-1 mr-2 transition cursor-pointer text-xs ${
                          isDarkMode
                            ? "bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
                            : "bg-zinc-50 hover:bg-zinc-100 text-zinc-800"
                        }`,
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
                    isDarkMode={isDarkMode}
                  />
                )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

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
  isDarkMode = false,
}: SuggestionDropdownProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`z-[999] absolute w-full shadow-lg top-full left-0 right-0 rounded-b-xl border border-t-0 box-border overflow-hidden ${
          isDarkMode
            ? "bg-zinc-800 border-zinc-600"
            : "bg-white border-zinc-500"
        }`}
        style={{
          top: "calc(100% - 1px)",
          width: "calc(100% + 2px)",
          marginLeft: "-1px",
          transformOrigin: "top",
          fontSize: "14px",
        }}
        initial={{
          opacity: 0,
          height: 0,
          scaleY: 0.8,
        }}
        animate={{
          opacity: selectedSuggestionId ? [1, 0.8, 0] : 1,
          height: "auto",
          scaleY: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          opacity: selectedSuggestionId
            ? { duration: 0.2, times: [0, 0.5, 1] }
            : { duration: 0.15 },
          height: { duration: 0.2 },
        }}
        exit={{
          opacity: 0,
          height: 0,
          scaleY: 0.8,
          transition: {
            duration: 0.15,
            height: { duration: 0.1 },
          },
        }}
      >
        <motion.ul
          className="p-2"
          id="search-suggestions"
          role="listbox"
          aria-label="Search suggestions"
        >
          {suggestions.length > 0 ? (
            <>
              {suggestions.map((suggestion, index) => {
                const isSelected =
                  index === selectedIndex ||
                  selectedSuggestionId === suggestion.id;

                if (renderItem) {
                  return (
                    <motion.div
                      key={suggestion.id || index}
                      role="option"
                      aria-selected={isSelected}
                      id={`suggestion-${suggestion.id}`}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{
                        opacity:
                          selectedSuggestionId &&
                          selectedSuggestionId !== suggestion.id
                            ? 0
                            : 1,
                        x: 0,
                        scale: isSelected ? 1.01 : 1,
                        backgroundColor:
                          selectedSuggestionId === suggestion.id
                            ? isDarkMode
                              ? "#2d3748"
                              : "#f3f4f6"
                            : undefined,
                      }}
                      transition={{
                        delay: index * 0.02,
                        duration: 0.15,
                        scale: { duration: 0.2 },
                        opacity: { duration: 0.1 },
                      }}
                      whileTap={{ scale: 0.98 }}
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
                    className={`p-2 cursor-pointer rounded-md text-left suggestion-item ${
                      isDarkMode
                        ? `hover:bg-zinc-700 ${
                            isSelected ? "font-medium !bg-zinc-700" : ""
                          }`
                        : `hover:bg-gray-100 ${
                            isSelected ? "font-medium !bg-zinc-100" : ""
                          }`
                    } ${isDarkMode ? "text-zinc-200" : "text-zinc-800"}`}
                    role="option"
                    id={`suggestion-${suggestion.id}`}
                    aria-selected={isSelected}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{
                      opacity:
                        selectedSuggestionId &&
                        selectedSuggestionId !== suggestion.id
                          ? 0
                          : 1,
                      x: 0,
                      scale: selectedSuggestionId === suggestion.id ? 1.01 : 1,
                      backgroundColor:
                        selectedSuggestionId === suggestion.id
                          ? isDarkMode
                            ? "#2d3748"
                            : "#f3f4f6"
                          : undefined,
                    }}
                    transition={{
                      delay: index * 0.02,
                      duration: 0.15,
                      backgroundColor: { duration: 0.2 },
                      opacity: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.98 }}
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
                                          : isDarkMode
                                          ? "bg-yellow-700"
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
                  className={`text-xs p-2 text-center border-t mt-1 ${
                    isDarkMode
                      ? "text-zinc-400 border-zinc-700"
                      : "text-gray-500 border-gray-100"
                  }`}
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
                className={`p-2 text-center ${
                  isDarkMode ? "text-zinc-400" : "text-gray-500"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {customLoader}
              </motion.div>

              <motion.div
                className={`p-2 text-center ${
                  isDarkMode ? "text-zinc-400" : "text-gray-500"
                }`}
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
