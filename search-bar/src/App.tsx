import SearchBar from "./Search-bar";
import "./App.css";
import NoiseBackground from "./noise";

function App() {
  return (
    <NoiseBackground className="min-h-screen">
      <main className=" w-screen h-screen">
        <div className="app-container">
          <h1>Search Bar</h1>
          <SearchBar />
        </div>
      </main>
    </NoiseBackground>
  );
}

export default App;
