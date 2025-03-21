import SearchBar from "./Search-bar";
import "./App.css";
import NoiseBackground from "./noise";

const testSuggestions = [
  { id: 1, label: "Suggestion 1" },
  { id: 2, label: "Suggestion 2" },
  { id: 3, label: "Suggestion 3" },
  // fruits
  { id: 4, label: "Apple" },
  { id: 5, label: "Banana" },
  { id: 6, label: "Orange" },
  { id: 7, label: "Pineapple" },
  { id: 8, label: "Strawberry" },
];

function App() {
  const selectionHandler = (selectedOption: { id: number; label: string }) => {
    console.log("Selected option:", selectedOption);
  };

  const onInputChangeHandler = (inputValue: string) => {
    console.log("Input value changed:", inputValue);
  };

  return (
    <NoiseBackground className="min-h-screen ">
      <main className=" w-screen h-screen">
        <div className="app-container h-full flex flex-col items-center gap-5">
          <h1 className="text-md font-bold text-center text-white mt-10">
            Search Bar
          </h1>
          <SearchBar
            dropdownOptions={testSuggestions}
            maxSuggestions={4}
            placeholder="This is a placeholder"
            onSelect={(e) => selectionHandler(e)}
            onChange={(e) => onInputChangeHandler(e)}
          />
        </div>
      </main>
    </NoiseBackground>
  );
}

export default App;
