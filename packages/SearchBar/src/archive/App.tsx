import "./App.css";
import { SearchBar } from "./SearchBar";
import React, { useState } from "react";

const testSuggestions = [
  { id: 1, label: "Suggestion 1" },
  { id: 2, label: "Suggestion 2" },
  { id: 3, label: "Suggestion 3" },
  // fruits
  { id: 4, label: "Apple" },
  { id: 5, label: "Banana" },
  { id: 6, label: "Orange" },
  { id: 7, label: "Pineapple" },
  { id: 8, label: "Strawberry" },
  { id: 9, label: "Watermelon" },
  { id: 10, label: "Grapes" },
  { id: 11, label: "Mango" },
  { id: 12, label: "Peach" },
  { id: 13, label: "Blueberry" },
  { id: 14, label: "Raspberry" },
  { id: 15, label: "Blackberry" },
  { id: 16, label: "Kiwi" },
  { id: 17, label: "Papaya" },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("auto");

  const selectionHandler = (selectedOption: { id: number; label: string }) => {
    console.log("Selected option:", selectedOption);
  };

  const onInputChangeHandler = (inputValue: string) => {
    console.log("Input value changed:", inputValue);
  };

  const toggleDarkMode = (mode: string) => {
    setSelectedTheme(mode);
    if (mode === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (mode === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      // Auto - use system preference
      setDarkMode(true);
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-gray-100"}`}>
      <main className="mx-auto py-8 px-4">
        <p className="text-red-500">Test</p>
        <div className="flex flex-col items-center gap-8">
          <h1
            className={`text-2xl font-bold text-center ${
              darkMode ? "text-red-500" : "text-gray-800"
            }`}
          >
            SearchBar Component Test
          </h1>

          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded transition ${
                selectedTheme === "auto"
                  ? "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-zinc-700 text-zinc-200"
                  : "bg-white text-gray-800"
              } shadow`}
              onClick={() => toggleDarkMode("auto")}
            >
              Auto
            </button>
            <button
              className={`px-4 py-2 rounded transition ${
                selectedTheme === "light"
                  ? "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-zinc-700 text-zinc-200"
                  : "bg-white text-gray-800"
              } shadow`}
              onClick={() => toggleDarkMode("light")}
            >
              Light
            </button>
            <button
              className={`px-4 py-2 rounded transition ${
                selectedTheme === "dark"
                  ? "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-zinc-700 text-zinc-200"
                  : "bg-white text-gray-800"
              } shadow`}
              onClick={() => toggleDarkMode("dark")}
            >
              Dark
            </button>
          </div>

          <div
            className={`w-full max-w-3xl p-8 rounded-xl shadow-lg ${
              darkMode ? "bg-zinc-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-xl font-semibold mb-6">
              Default SearchBar (400px × 48px)
            </h2>
            <SearchBar
              dropdownOptions={testSuggestions}
              maxSuggestions={4}
              placeholder="Type to search..."
              onSelect={(e) => selectionHandler(e)}
              onChange={(e) => onInputChangeHandler(e)}
              showClearButton
              darkMode={darkMode}
              minimizable
              noResultsMessage="No results found"
            />
          </div>

          <div
            className={`w-full max-w-3xl p-8 rounded-xl shadow-lg ${
              darkMode ? "bg-zinc-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-xl font-semibold mb-6">
              Custom Width (500px × 48px)
            </h2>
            <SearchBar
              dropdownOptions={testSuggestions}
              maxSuggestions={4}
              placeholder="Custom width search..."
              onSelect={(e) => selectionHandler(e)}
              onChange={(e) => onInputChangeHandler(e)}
              showClearButton
              darkMode={darkMode}
              width="500px"
              noResultsMessage="No results found"
            />
          </div>

          <div
            className={`w-full max-w-3xl p-8 rounded-xl shadow-lg ${
              darkMode ? "bg-zinc-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-xl font-semibold mb-6">
              Custom Height (400px × 56px)
            </h2>
            <SearchBar
              dropdownOptions={testSuggestions}
              maxSuggestions={4}
              placeholder="Custom height search..."
              onSelect={(e) => selectionHandler(e)}
              onChange={(e) => onInputChangeHandler(e)}
              showClearButton
              darkMode={darkMode}
              height="56px"
              noResultsMessage="No results found"
            />
          </div>

          <div
            className={`w-full max-w-3xl p-8 rounded-xl shadow-lg ${
              darkMode ? "bg-zinc-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-xl font-semibold mb-6">
              Minimizable SearchBar
            </h2>
            <SearchBar
              dropdownOptions={testSuggestions}
              maxSuggestions={4}
              placeholder="Click the search icon to minimize..."
              onSelect={(e) => selectionHandler(e)}
              onChange={(e) => onInputChangeHandler(e)}
              showClearButton
              darkMode={darkMode}
              minimizable={true}
              width="350px"
              noResultsMessage="No results found"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
