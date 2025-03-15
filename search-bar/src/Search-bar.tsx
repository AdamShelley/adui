import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useState, useRef, useEffect } from "react";
import "./Search-bar.css"; // Assuming you have a CSS file

interface Option {
  id: number;
  label: string;
}

interface SearchBarProps {
  dropdownOptions?: Option[];
}

const SearchBar: React.FC<SearchBarProps> = ({ dropdownOptions }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState(dropdownOptions);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const filterSuggestions = () => {
    if (searchValue.length > 0) {
      const filteredSuggestions = suggestions?.filter((suggestion) => {
        return suggestion.label
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      return filteredSuggestions;
    }
    return [];
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setSuggestions(filterSuggestions());
  };

  // Handle outside clicks to reset the focus state
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        inputRef.current &&
        !(inputRef.current as HTMLDivElement).contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            animate={{
              paddingLeft: isFocused ? "12px" : "8px",
            }}
          />

          {/* {isFocused && (
            <motion.button
              className="bg-zinc-500 text-white px-4 h-full rounded-sm mr-2 "
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              onClick={() => console.log("Search submitted")}
            >
              Search
            </motion.button>
          )} */}

          {isFocused && dropdownOptions?.length && suggestions && (
            <SuggestionDropdown suggestions={suggestions} />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchBar;

const SuggestionDropdown = ({ suggestions }: { suggestions: Option[] }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute w-full bg-white shadow-lg top-full left-0 right-0 rounded-b-xl border border-t-0 border-zinc-500 box-border overflow-hidden"
        style={{
          top: "calc(100% - 1px)",
          width: "calc(100% + 2px)",
          marginLeft: "-1px",
        }}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          duration: 0.2,
        }}
        exit={{ opacity: 0, height: 0 }}
      >
        <motion.ul className="p-2">
          {suggestions.map((suggestion, index) => (
            <motion.li
              key={suggestion?.id || suggestion.label}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded-md suggestion-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              whileTap={{ scale: 0.99 }}
            >
              {suggestion.label}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </AnimatePresence>
  );
};
