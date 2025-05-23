import { SearchBar } from "@/components/SearchBar/SearchBar";

export default function SearchBarShowcase() {
  const suggestions = [
    { id: 1, label: "Apple" },
    { id: 2, label: "Banana" },
    { id: 3, label: "Cherry" },
    { id: 4, label: "Date" },
    { id: 5, label: "Elderberry" },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Search Bar</h1>
      <SearchBar dropdownOptions={suggestions} />
    </div>
  );
}
