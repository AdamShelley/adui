import "./App.css";
import { SearchBar } from "./CopyableSearchBar";

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

  return (
    <main>
      <div>
        <p className="font-bold mb-5">Search Bar Demo</p>
        <SearchBar dropdownOptions={suggestions} />
      </div>
    </main>
  );
}

export default App;
