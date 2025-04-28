# Search Bar Component for React

A customizable, accessible and animated search bar component for React applications.

## Installation

### Using npm

```bash
npm install @adui/search-bar
```

### Using bun

```bash
bun add @adui/search-bar
```

## Basic Usage

```jsx
import SearchBar from "@adui/search-bar";
import "@adui/search-bar/dist/styles.css";

function App() {
  const options = [
    { id: 1, label: "Apple" },
    { id: 2, label: "Banana" },
    { id: 3, label: "Cherry" },
    // more options...
  ];

  const handleSelect = (option) => {
    console.log("Selected:", option);
  };

  return (
    <div className="app">
      <SearchBar
        dropdownOptions={options}
        placeholder="Search fruits..."
        onSelect={handleSelect}
        highlightMatches={true}
      />
    </div>
  );
}
```

## Props Reference

| Prop                     | Type                                                                            | Default              | Description                                      |
| ------------------------ | ------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------ |
| `dropdownOptions`        | `Array<{ id: number, label: string }>`                                          | `[]`                 | Array of options to display in the dropdown      |
| `maxSuggestions`         | `number`                                                                        | `5`                  | Maximum number of suggestions to display         |
| `placeholder`            | `string`                                                                        | `"Search..."`        | Placeholder text for the search input            |
| `onSelect`               | `(option: { id: number, label: string }) => void`                               | -                    | Callback when an option is selected              |
| `onChange`               | `(inputValue: string) => void`                                                  | -                    | Callback when the input value changes            |
| `disabled`               | `boolean`                                                                       | `false`              | Disables the search input                        |
| `minimizable`            | `boolean`                                                                       | `false`              | Allows the search bar to be minimized to an icon |
| `showClearButton`        | `boolean`                                                                       | `false`              | Shows a clear button when text is entered        |
| `clearButtonStyleClass`  | `string`                                                                        | -                    | Custom CSS class for the clear button            |
| `clearOnSelect`          | `boolean`                                                                       | `false`              | Clears the input after selection                 |
| `noResultsMessage`       | `string`                                                                        | `"No results found"` | Message to display when no results match         |
| `filterDebounceTime`     | `number`                                                                        | `100`                | Debounce time in ms for filtering suggestions    |
| `renderItem`             | `(item: { id: number, label: string }, isSelected: boolean) => React.ReactNode` | -                    | Custom renderer for dropdown items               |
| `highlightMatches`       | `boolean`                                                                       | `false`              | Highlights matching text in suggestions          |
| `highlightMatchesStyles` | `string`                                                                        | `"bg-yellow-200"`    | CSS class for highlighted text                   |
| `customLoader`           | `React.ReactNode`                                                               | -                    | Custom loader component                          |
