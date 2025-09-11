import { SpotlightProvider, useSpotlightTarget } from "./Spotlight";

function TestComponent() {
  const spotlight = useSpotlightTarget({
    highlightOnHover: true,
    addedComponent: (
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
          Welcome to Spotlight!
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          This is a custom tooltip that appears when you hover over this
          element.
        </p>
      </div>
    ),
  });

  const spotlightWithButton = useSpotlightTarget({
    highlightOnHover: true,
    dontDisappear: true,
    addedComponent: (
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          Interactive Tooltip
        </h4>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          You can even add interactive elements!
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
          Click me!
        </button>
      </div>
    ),
  });

  return (
    <div className="dark:bg-gray-950 w-screen h-screen text-white flex items-center justify-center flex-col gap-10">
      <p ref={spotlight.ref}>Hover me for a tooltip!</p>
      <ul className="flex gap-10">
        <li
          ref={spotlightWithButton.ref}
          className="cursor-pointer bg-gray-800 px-4 py-2 rounded"
        >
          Hover for interactive tooltip
        </li>
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

// todo:
// Add ability to add text under it
// Different styles / shapes
// Opacity/ no opacity
// Multiple refs passed in for same affect e.g. in the list above without new hooks every time?
