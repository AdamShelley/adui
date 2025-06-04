"use client";

import { SearchBar } from "@/components/SearchBar/SearchBar";
import { useTheme } from "next-themes";

export default function SearchBarShowcase() {
  const suggestions = [
    { id: 1, label: "Apple" },
    { id: 2, label: "Banana" },
    { id: 3, label: "Cherry" },
    { id: 4, label: "Date" },
    { id: 5, label: "Elderberry" },
  ];

  const { theme } = useTheme();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Search Bar</h1>
      <p>A searchbar that can be configured in various ways.</p>
      <h4 className="font-medium text-muted-foreground">Preview</h4>
      <SearchBar dropdownOptions={suggestions} darkMode={theme === "dark"} />
      <div>
        <h4 className="font-medium text-muted-foreground">Installation</h4>
        <h5>Install dependencies</h5>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <code className="text-sm">bun add motion clsx tailwind-merge</code>
        </pre>
        <h5>Add tailwind merge util</h5>
        <h5>Copy source code into your project</h5>
      </div>

      <h4 className="font-medium text-muted-foreground">Props</h4>
      <h4 className="font-medium text-muted-foreground">Examples</h4>
    </div>
  );
}
