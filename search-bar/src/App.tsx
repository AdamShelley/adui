import SearchBar from "./Search-bar";
import "./App.css";
import NoiseBackground from "./noise";

const testSuggestions = [
  { id: 1, label: "Suggestion 1" },
  { id: 2, label: "Suggestion 2" },
  { id: 3, label: "Suggestion 3" },
];

function App() {
  return (
    <NoiseBackground className="min-h-screen">
      <main className=" w-screen h-screen">
        <div className="app-container">
          <h1>Search Bar</h1>
          <SearchBar dropdownOptions={testSuggestions} />
        </div>
      </main>
    </NoiseBackground>
  );
}

export default App;
