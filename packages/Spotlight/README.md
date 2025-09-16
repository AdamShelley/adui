# Spotlight Component

A React component that creates a spotlight effect to highlight specific elements on your page, with customizable visibility for content outside the spotlight.

## Installation

```bash
npm install @adamui/spotlight
```

## Basic Usage

```tsx
import { SpotlightProvider, useSpotlightTarget } from "@adamui/spotlight";

function MyComponent() {
  const spotlight = useSpotlightTarget({
    highlightOnHover: true,
    addedComponent: (
      <div>
        <h3>Tooltip Title</h3>
        <p>This appears when you hover over the element.</p>
      </div>
    ),
  });

  return (
    <SpotlightProvider>
      <div ref={spotlight.ref}>Hover me for a spotlight effect!</div>
    </SpotlightProvider>
  );
}
```

## Controlling Outside Visibility

The key feature is the `outsideOpacity` prop that controls how visible content outside the spotlight should be:

```tsx
<SpotlightProvider
  outsideOpacity={0.1} // 10% visibility (very dark outside)
  blurIntensity={4} // Optional: add blur effect
  spotlightPadding={30} // Optional: adjust spotlight size
>
  {/* Your content */}
</SpotlightProvider>
```

### outsideOpacity Examples:

- `0` - Complete blackout outside spotlight
- `0.2` - 20% visibility (dramatic effect)
- `0.5` - 50% visibility (moderate dimming)
- `0.8` - 80% visibility (subtle effect)
- `1` - No dimming (spotlight border only)

## Props

### SpotlightProvider

| Prop               | Type     | Default | Description                                            |
| ------------------ | -------- | ------- | ------------------------------------------------------ |
| `outsideOpacity`   | `number` | `0.3`   | How visible content outside spotlight should be (0-1)  |
| `blurIntensity`    | `number` | `2`     | Blur intensity in pixels for content outside spotlight |
| `spotlightPadding` | `number` | `20`    | Extra padding around the highlighted element           |
| `overlayOpacity`   | `number` | `0.8`   | Base overlay opacity (used internally)                 |

### useSpotlightTarget

| Prop               | Type           | Default | Description                      |
| ------------------ | -------------- | ------- | -------------------------------- |
| `highlightOnHover` | `boolean`      | `false` | Auto-highlight when hovering     |
| `addedComponent`   | `ReactElement` | -       | Custom tooltip to show           |
| `dontDisappear`    | `boolean`      | `false` | Keep spotlight when mouse leaves |

## Complete Example

```tsx
import { SpotlightProvider, useSpotlightTarget } from "@adamui/spotlight";

function App() {
  const spotlight = useSpotlightTarget({
    highlightOnHover: true,
    addedComponent: (
      <div>
        <h3>Welcome!</h3>
        <p>This element is highlighted with customizable outside visibility.</p>
      </div>
    ),
  });

  return (
    <SpotlightProvider
      outsideOpacity={0.2} // 20% visibility outside spotlight
      blurIntensity={6} // 6px blur effect
      spotlightPadding={40} // Extra space around element
    >
      <div className="p-20">
        <h1>My App</h1>
        <p ref={spotlight.ref} className="cursor-pointer">
          Hover me to see the spotlight effect!
        </p>
        <p>This content will be dimmed when spotlight is active.</p>
      </div>
    </SpotlightProvider>
  );
}
```

## License

MIT
