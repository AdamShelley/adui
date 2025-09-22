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
      >
        <TestComponent />
      </SpotlightProvider>
    </div>
  );
}
