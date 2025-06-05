"use client";

import { CodeCopier } from "@/components/code-copier";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { useTheme } from "next-themes";

import { searchBarSnippets } from "@/components/snippets/searchbar-snippet";

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
        {searchBarSnippets.map((snippet) => (
          <CodeCopier snippet={snippet} key={snippet.title} />
        ))}
      </div>

      <h4 className="font-medium text-muted-foreground">Props</h4>
      <h4 className="font-medium text-muted-foreground">Examples</h4>
    </div>
  );
}
