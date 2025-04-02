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
  { id: 9, label: "Watermelon" },
  { id: 10, label: "Grapes" },
  { id: 11, label: "Mango" },
  { id: 12, label: "Peach" },
  { id: 13, label: "Blueberry" },
  { id: 14, label: "Raspberry" },
  { id: 15, label: "Blackberry" },
  { id: 16, label: "Kiwi" },
  { id: 17, label: "Papaya" },
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
          <div className="w-1/2">
            <SearchBar
              dropdownOptions={testSuggestions}
              maxSuggestions={4}
              placeholder="This is a placeholder"
              onSelect={(e) => selectionHandler(e)}
              onChange={(e) => onInputChangeHandler(e)}
              showClearButton
              noResultsMessage="This is a test message"
              highlightMatches
              highlightMatchesStyles="bg-blue-200 text-black"
              // renderItem={(item) => (
              //   <div className="flex items-center gap-2">
              //     <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              //     <span>{item.label}</span>
              //   </div>
              // )}
            />
          </div>
        </div>
      </main>
    </NoiseBackground>
  );
}

export default App;
