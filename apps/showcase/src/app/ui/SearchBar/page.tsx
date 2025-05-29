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
    <div style={{ padding: "2rem" }}>
      <h1>Search Bar</h1>
      <SearchBar dropdownOptions={suggestions} darkMode={theme === "dark"} />
    </div>
  );
}
