import SpotlightProvider from "./Spotlight";

export default function App() {
  return (
    <div className="dark:bg-gray-950 w-screen h-screen">
      <SpotlightProvider>
        <div className="text-red-500">This is some test content</div>
      </SpotlightProvider>
    </div>
  );
}
