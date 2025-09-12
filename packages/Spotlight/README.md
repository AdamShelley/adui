# Spotlight

A customizable spotlight component that highlights specific elements with blur and overlay effects.

## Usage

```tsx
import { SpotlightProvider, useSpotlightTarget } from "@adamui/spotlight";

function App() {
  return (
    <SpotlightProvider
      blurIntensity={1} // Blur intensity in pixels (default: 2)
      overlayOpacity={0.4} // Overlay darkness 0-1 (default: 0.8)
      spotlightPadding={30} // Extra padding around spotlight (default: 20)
      blurPadding={50} // Extra padding for blur mask (default: 40)
    >
      <YourContent />
    </SpotlightProvider>
  );
}

function YourContent() {
  const spotlight = useSpotlightTarget({
    highlightOnHover: true,
    addedComponent: <div>Custom tooltip content</div>,
  });

  return <div ref={spotlight.ref}>Hover me for spotlight effect!</div>;
}
```

## Props

### SpotlightProvider

| Prop               | Type     | Default | Description                                  |
| ------------------ | -------- | ------- | -------------------------------------------- |
| `blurIntensity`    | `number` | `2`     | Blur intensity in pixels for background      |
| `overlayOpacity`   | `number` | `0.8`   | Opacity of dark overlay (0-1)                |
| `spotlightPadding` | `number` | `20`    | Extra padding around the highlighted element |
| `blurPadding`      | `number` | `40`    | Extra padding for the blur mask effect       |

### useSpotlightTarget

| Option             | Type           | Default     | Description                              |
| ------------------ | -------------- | ----------- | ---------------------------------------- |
| `highlightOnHover` | `boolean`      | `false`     | Automatically highlight on hover         |
| `addedComponent`   | `ReactElement` | `undefined` | Custom component to show as tooltip      |
| `dontDisappear`    | `boolean`      | `false`     | Keep spotlight active after mouse leaves |
