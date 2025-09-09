import { SpotlightProvider, useSpotlightTarget } from "./Spotlight";

function TestComponent() {
  const spotlight = useSpotlightTarget({ highlightOnHover: true });

  return (
    <div className="dark:bg-gray-950 w-screen h-screen text-white flex items-center justify-center flex-col gap-10">
      <p>Test 1 </p>
      <ul className="flex gap-10">
        <li ref={spotlight.ref as React.RefObject<HTMLLIElement>}>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div className="dark:bg-gray-950 w-screen h-screen">
      <SpotlightProvider>
        <TestComponent />
      </SpotlightProvider>
    </div>
  );
}
