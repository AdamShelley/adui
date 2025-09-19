import { SpotlightProvider } from "./Spotlight";
import { TestComponent } from "./Demo";

export default function App() {
  return (
    <div className="dark:bg-gray-950 w-screen h-screen">
      <SpotlightProvider
        outsideOpacity={0.5}
        blurIntensity={5}
        spotlightPadding={50}
        spotlightShape="circle"
        zoom={1.5}
        wiggleIntensity={3}
      >
        <TestComponent />
      </SpotlightProvider>
    </div>
  );
}
