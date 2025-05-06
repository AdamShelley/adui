import "./App.css";
import { SearchBar } from "./CopyableSearchBar";
import { useState } from "react";

function App() {
  const suggestions = [
    { id: 1, label: "Suggestion 1" },
    { id: 2, label: "Suggestion 2" },
    { id: 3, label: "Suggestion 3" },
    { id: 4, label: "Apple" },
    { id: 5, label: "Banana" },
    { id: 6, label: "Orange" },
    { id: 7, label: "Pineapple" },
  ];

  const fruitEmojis = [
    { id: 1, label: "🍎 Apple" },
    { id: 2, label: "🍌 Banana" },
    { id: 3, label: "🍊 Orange" },
    { id: 4, label: "🍍 Pineapple" },
    { id: 5, label: "🍓 Strawberry" },
    { id: 6, label: "🥭 Mango" },
    { id: 7, label: "🫐 Blueberry" },
    { id: 8, label: "🍇 Grapes" },
    { id: 9, label: "🍉 Watermelon" },
    { id: 10, label: "🥝 Kiwi" },
  ];

  const [selectedFruit, setSelectedFruit] = useState<string | null>(null);

  const customRenderItem = (
    item: { id: number; label: string },
    isSelected: boolean
  ) => (
    <div
      className={`p-2 rounded-md transition-colors ${
        isSelected ? "bg-blue-100 text-blue-700" : "hover:bg-gray-50"
      }`}
    >
      <div className="font-medium">{item.label}</div>
      <div className="text-xs text-gray-500">Item ID: {item.id}</div>
    </div>
  );

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Search Bar Component Showcase
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Search Bar */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Basic Search Bar</h2>
          <p className="text-sm text-gray-600 mb-4">
            Default configuration with suggestions
          </p>
          <SearchBar dropdownOptions={suggestions} />
        </div>

        {/* Dark Mode Search Bar */}
        <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3 text-white">
            Dark Mode Search Bar
          </h2>
          <p className="text-sm text-gray-400 mb-4">Dark mode enabled</p>
          <SearchBar dropdownOptions={suggestions} darkMode={true} />
        </div>

        {/* Minimizable Search Bar */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Minimizable Search Bar</h2>
          <p className="text-sm text-gray-600 mb-4">
            Click the search icon to expand/collapse
          </p>
          <SearchBar dropdownOptions={suggestions} minimizable={true} />
        </div>

        {/* Search Bar with Clear Button */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">
            Search Bar with Clear Button
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Shows a button to clear input
          </p>
          <SearchBar
            dropdownOptions={suggestions}
            showClearButton={true}
            placeholder="Type to search..."
          />
        </div>

        {/* Search Bar with Highlighted Matches */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">
            Search Bar with Highlighted Matches
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Highlights matching text in suggestions
          </p>
          <SearchBar
            dropdownOptions={fruitEmojis}
            highlightMatches={true}
            placeholder="Search for a fruit..."
          />
        </div>

        {/* Search Bar with Custom Render Item */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Custom Item Rendering</h2>
          <p className="text-sm text-gray-600 mb-4">
            Custom styled suggestion items
          </p>
          <SearchBar
            dropdownOptions={fruitEmojis}
            renderItem={customRenderItem}
            placeholder="Custom rendered items..."
          />
        </div>

        {/* Search Bar with Custom Width & Height */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Custom Size Search Bar</h2>
          <p className="text-sm text-gray-600 mb-4">
            Width: 300px, Height: 60px
          </p>
          <SearchBar
            dropdownOptions={suggestions}
            width="300px"
            height="60px"
            placeholder="Custom sized search bar..."
          />
        </div>

        {/* Search Bar with onSelect Callback */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">
            Selection Callback Example
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Shows selected item below
          </p>
          <SearchBar
            dropdownOptions={fruitEmojis}
            placeholder="Select a fruit..."
            onSelect={(option) => setSelectedFruit(option.label)}
          />
          {selectedFruit && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
              Selected: {selectedFruit}
            </div>
          )}
        </div>

        {/* Search Bar with Custom Placeholder and Limited Results */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Limited Results Search</h2>
          <p className="text-sm text-gray-600 mb-4">
            Maximum 3 suggestions shown
          </p>
          <SearchBar
            dropdownOptions={fruitEmojis}
            maxSuggestions={3}
            noResultsMessage="No fruits found"
            placeholder="Max 3 results will show..."
          />
        </div>

        {/* Search Bar with Clear On Select */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Clear On Select</h2>
          <p className="text-sm text-gray-600 mb-4">
            Input clears after selection
          </p>
          <SearchBar
            dropdownOptions={fruitEmojis}
            clearOnSelect={true}
            placeholder="Clears after selection..."
          />
        </div>
      </div>
    </main>
  );
}

export default App;
