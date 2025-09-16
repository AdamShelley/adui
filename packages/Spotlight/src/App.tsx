import { useState } from "react";
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
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          onClick={() => alert("Hi!")}
        >
          Click me!
        </button>
      </div>
    ),
  });

  return (
    <div className="dark:bg-gray-950 w-screen h-screen text-white flex items-center justify-center flex-col gap-10">
      <h1 className="text-3xl font-bold mb-8">Spotlight Demo</h1>

      <div className="grid grid-cols-2 gap-8">
        <div className="text-center">
          <p
            ref={spotlight.ref}
            className="cursor-pointer bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Standard Spotlight
          </p>
          <small className="text-gray-400 mt-2 block">
            Hover for basic tooltip
          </small>
        </div>

        <div className="text-center">
          <p
            ref={spotlightWithButton.ref}
            className="cursor-pointer bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Interactive Spotlight
          </p>
          <small className="text-gray-400 mt-2 block">
            Hover for interactive tooltip
          </small>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-300 mb-4">
          Sample content to demonstrate outside visibility
        </p>
        <div className="grid grid-cols-4 gap-4 text-sm">
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="bg-gray-800 p-3 rounded">
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpotlightDemo() {
  const [outsideOpacity, setOutsideOpacity] = useState(0.3);
  const [blurIntensity, setBlurIntensity] = useState(2);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <SpotlightProvider
        outsideOpacity={outsideOpacity}
        blurIntensity={blurIntensity}
        spotlightPadding={40}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Simple Controls Panel */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Spotlight Controls</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Outside Visibility: {Math.round(outsideOpacity * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={outsideOpacity}
                  onChange={(e) => setOutsideOpacity(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-400 mt-1">
                  How visible content outside the spotlight should be
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Blur Intensity: {blurIntensity}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={blurIntensity}
                  onChange={(e) => setBlurIntensity(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-400 mt-1">
                  How much to blur content outside the spotlight
                </p>
              </div>
            </div>
          </div>

          {/* Demo Content */}
          <div className="lg:col-span-3">
            <TestComponent />
          </div>
        </div>
      </SpotlightProvider>
    </div>
  );
}

export default function App() {
  const [demoMode, setDemoMode] = useState<"simple" | "advanced">("simple");

  if (demoMode === "advanced") {
    return <SpotlightDemo />;
  }

  return (
    <div className="dark:bg-gray-950 w-screen h-screen">
      <SpotlightProvider
        outsideOpacity={0.95}
        blurIntensity={2}
        spotlightPadding={0}
      >
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setDemoMode("advanced")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Advanced Demo
          </button>
        </div>
        <TestComponent />
      </SpotlightProvider>
    </div>
  );
}
