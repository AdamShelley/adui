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
- 🌓 Dark mode support with system preference detection
- 📏 Standardized dimensions for consistent UI

## Installation

```bash
# npm
This will be copy and paste from ...
```

### Peer Dependencies

This package requires the following peer dependencies:

npm i motion clsx tailwind-merge

## Usage

```tsx
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
      width="500px"
      height="56px"
      darkMode={true}
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
| `width`                  | `string`                                                 | `"400px"`            | Width of the search bar                                 |
| `height`                 | `string`                                                 | `"48px"`             | Height of the search bar                                |
| `darkMode`               | `boolean`                                                | `undefined`          | Force dark mode (true/false) or auto-detect (undefined) |

## License

MIT © [Adam Shelley](https://github.com/yourusername)
