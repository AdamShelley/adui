import { SpotlightProvider } from "./Spotlight";
import { TestComponent } from "./Demo";

export default function App() {
  return (
    <div className="dark:bg-gray-950 w-screen h-screen">
      <SpotlightProvider
        outsideOpacity={1}
        blurIntensity={10}
        spotlightPadding={50}
        spotlightShape="circle"
        blockInteractions={true}
      >
        <TestComponent />
      </SpotlightProvider>
    </div>
  );
}
