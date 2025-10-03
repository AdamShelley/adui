# Using the Disabled Prop

The `disabled` prop allows you to globally disable all spotlight functionality. This is useful when you want to provide users with a setting to turn off all spotlights throughout your application.

## Usage Example

```tsx
import { SpotlightProvider } from './Spotlight';
import { useState } from 'react';

function App() {
  // This could be stored in user preferences, localStorage, etc.
  const [spotlightsDisabled, setSpotlightsDisabled] = useState(false);

  return (
    <SpotlightProvider disabled={spotlightsDisabled}>
      <div>
        <button onClick={() => setSpotlightsDisabled(!spotlightsDisabled)}>
          {spotlightsDisabled ? 'Enable Spotlights' : 'Disable Spotlights'}
        </button>
        
        {/* Your app content here */}
        {/* All spotlight interactions will be disabled when spotlightsDisabled is true */}
      </div>
    </SpotlightProvider>
  );
}
```

## With User Settings

```tsx
import { SpotlightProvider } from './Spotlight';
import { useUserSettings } from './hooks/useUserSettings';

function App() {
  const { settings, updateSettings } = useUserSettings();

  return (
    <SpotlightProvider disabled={settings.disableSpotlights}>
      <Settings>
        <Toggle
          label="Disable Spotlights"
          checked={settings.disableSpotlights}
          onChange={(checked) => 
            updateSettings({ disableSpotlights: checked })
          }
        />
      </Settings>
      
      {/* Your app content */}
    </SpotlightProvider>
  );
}
```

## Behavior

When `disabled={true}`:
- All spotlight highlight requests will be ignored
- No spotlight overlays will render
- The spotlight context will still be available but inactive
- Hover effects and other spotlight triggers will have no effect

When `disabled={false}` (default):
- Spotlights work normally
- All spotlight features are enabled
