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

      <h4>Preview</h4>
      <SearchBar dropdownOptions={suggestions} darkMode={theme === "dark"} />
      <h4>Installation</h4>
      <h4>Props</h4>
      <h4>Examples</h4>
    </div>
  );
}
