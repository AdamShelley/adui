# @adamui/searchbar

A customizable React search bar component with advanced features, animations, and accessibility.

## Features

- 🔍 Animated search interface with minimizable option
- 📋 Dropdown suggestions with keyboard navigation
- ⌨️ Keyboard accessible (arrow keys, enter, escape)
- 🎨 Customizable styling and appearance
- 💬 Highlight matched text in suggestions
- ⏱️ Debounced input for performance
- 🧩 Custom rendering of suggestion items
- ♿ Accessible with ARIA attributes

## Installation

```bash
# npm
npm install @adamui/searchbar

# yarn
yarn add @adamui/searchbar

# pnpm
pnpm add @adamui/searchbar

# bun
bun add @adamui/searchbar
```

### Importing Styles

Make sure to import the CSS file in your application:

```jsx
// Import the component's styles
import "@adamui/searchbar/dist/style.css";
```

### Peer Dependencies

This package requires the following peer dependencies:

- React 17+ or 18+ or 19+
- Motion 12+
- TailwindCSS 3+ or 4+ (optional, for styling)

## Usage

```tsx
import { SearchBar } from "@adamui/searchbar";
import "@adamui/searchbar/dist/style.css";

// Basic usage
const MyComponent = () => {
  const options = [
    { id: 1, label: "Apple" },
    { id: 2, label: "Banana" },
    { id: 3, label: "Cherry" },
    // ...more options
  ];

  return (
    <SearchBar
      dropdownOptions={options}
      placeholder="Search fruits..."
      onSelect={(option) => console.log("Selected:", option)}
      onChange={(value) => console.log("Input value:", value)}
    />
  );
};

// Advanced usage with customization
const AdvancedSearch = () => {
  const options = [
    /* your options */
  ];

  return (
    <SearchBar
      dropdownOptions={options}
      maxSuggestions={10}
      placeholder="Search..."
      onSelect={(option) => console.log("Selected:", option)}
      onChange={(value) => console.log("Input value:", value)}
      minimizable={true}
      showClearButton={true}
      clearOnSelect={false}
      highlightMatches={true}
      highlightMatchesStyles="bg-blue-200 font-medium"
      filterDebounceTime={300}
      noResultsMessage="No matching items found"
      renderItem={(item, isSelected) => (
        <div className={`p-2 ${isSelected ? "bg-blue-100" : ""}`}>
          <div className="font-medium">{item.label}</div>
          <div className="text-xs text-gray-500">Item ID: {item.id}</div>
        </div>
      )}
    />
  );
};
```

## Props

| Prop                     | Type                                                     | Default              | Description                                             |
| ------------------------ | -------------------------------------------------------- | -------------------- | ------------------------------------------------------- |
| `dropdownOptions`        | `Array<{ id: number; label: string }>`                   | `[]`                 | Options to display in the dropdown                      |
| `maxSuggestions`         | `number`                                                 | `5`                  | Maximum number of suggestions to show                   |
| `placeholder`            | `string`                                                 | `"Search..."`        | Input placeholder text                                  |
| `onSelect`               | `(option: Option) => void`                               | -                    | Callback when an option is selected                     |
| `onChange`               | `(value: string) => void`                                | -                    | Callback when input value changes                       |
| `disabled`               | `boolean`                                                | `false`              | Whether the search bar is disabled                      |
| `minimizable`            | `boolean`                                                | `false`              | Whether the search bar can be minimized to just an icon |
| `showClearButton`        | `boolean`                                                | `false`              | Whether to show a clear button                          |
| `clearButtonStyleClass`  | `string`                                                 | -                    | Custom class for the clear button                       |
| `clearOnSelect`          | `boolean`                                                | `false`              | Whether to clear input after selection                  |
| `noResultsMessage`       | `string`                                                 | `"No results found"` | Message shown when no results match                     |
| `filterDebounceTime`     | `number`                                                 | `100`                | Debounce time in ms for filtering                       |
| `renderItem`             | `(item: Option, isSelected: boolean) => React.ReactNode` | -                    | Custom render function for list items                   |
| `highlightMatches`       | `boolean`                                                | `false`              | Whether to highlight matching text                      |
| `highlightMatchesStyles` | `string`                                                 | `"bg-yellow-200"`    | Tailwind classes for highlighted text                   |
| `customLoader`           | `React.ReactNode`                                        | -                    | Custom loader element                                   |

## License

MIT © [Adam Shelley](https://github.com/yourusername)
