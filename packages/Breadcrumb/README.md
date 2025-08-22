# @adamui/breadcrumb

A customizable React breadcrumb navigation component with animations, accessibility, and flexible configuration options.

## Features

- Automatic URL-based navigation or custom breadcrumb items
- Multiple visual variants (default, pills, bordered) with flexible separators
- Collapsible design with overflow handling for long navigation paths
- Full accessibility support with ARIA attributes and keyboard navigation

## Installation

```bash
# npm
This will be copy and paste from ...
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm i motion clsx tailwind-merge lucide-react
```

## Usage

### Basic URL-based Breadcrumb

```tsx
import { Breadcrumb } from "@adamui/breadcrumb";

const MyComponent = () => {
  return <Breadcrumb mode="url" showHome={true} homeLabel="Home" />;
};
```

### Custom Breadcrumb Items

```tsx
import { Breadcrumb } from "@adamui/breadcrumb";
import { FolderIcon, FileIcon } from "lucide-react";

const CustomBreadcrumb = () => {
  const items = [
    {
      label: "Projects",
      href: "/projects",
      icon: <FolderIcon className="w-4 h-4" />,
    },
    {
      label: "My App",
      href: "/projects/my-app",
      icon: <FileIcon className="w-4 h-4" />,
    },
    {
      label: "Settings",
      href: "/projects/my-app/settings",
      isActive: true,
    },
  ];

  return (
    <Breadcrumb
      mode="custom"
      items={items}
      separator="chevron"
      onItemClick={(item, index) => {
        console.log(`Clicked on ${item.label} at index ${index}`);
      }}
    />
  );
};
```

### Advanced Configuration

```tsx
import { Breadcrumb } from "@adamui/breadcrumb";
import { ChevronRightIcon } from "lucide-react";

const AdvancedBreadcrumb = () => {
  return (
    <Breadcrumb
      mode="url"
      showHome={true}
      homeLabel="Dashboard"
      homeHref="/dashboard"
      variant="pills"
      separator="custom"
      customSeparator={<ChevronRightIcon className="w-3 h-3 text-blue-500" />}
      maxItems={4}
      collapsible={true}
      navClassName="mb-4"
      crumbClassNames="font-medium"
      onItemClick={(item, index) => {
        // Custom navigation logic
        console.log("Navigating to:", item.href);
      }}
    />
  );
};
```

### Different Variants

```tsx
// Default variant
<Breadcrumb mode="url" variant="default" />

// Pills variant
<Breadcrumb mode="url" variant="pills" />

// Bordered variant
<Breadcrumb mode="url" variant="bordered" />
```

### Different Separators

```tsx
// Chevron separator (default)
<Breadcrumb mode="url" separator="chevron" />

// Slash separator
<Breadcrumb mode="url" separator="slash" />

// Line separator
<Breadcrumb mode="url" separator="line" />

// Custom separator
<Breadcrumb
  mode="url"
  separator="custom"
  customSeparator={<span className="text-blue-500">→</span>}
/>
```

## Props

| Prop              | Type                                            | Default     | Description                                            |
| ----------------- | ----------------------------------------------- | ----------- | ------------------------------------------------------ |
| `mode`            | `"url" \| "custom"`                             | `"url"`     | Navigation mode: automatic URL parsing or custom items |
| `items`           | `BreadcrumbItem[]`                              | `[]`        | Custom breadcrumb items (required when mode="custom")  |
| `separator`       | `"chevron" \| "slash" \| "line" \| "custom"`    | `"chevron"` | Type of separator between breadcrumb items             |
| `customSeparator` | `React.ReactNode`                               | -           | Custom separator element (when separator="custom")     |
| `showHome`        | `boolean`                                       | `true`      | Whether to show the home button                        |
| `homeLabel`       | `string`                                        | `""`        | Label for the home button (empty shows only icon)      |
| `homeHref`        | `string`                                        | `"/"`       | URL for the home button                                |
| `variant`         | `"default" \| "pills" \| "bordered"`            | `"default"` | Visual style variant                                   |
| `navClassName`    | `string`                                        | `""`        | Custom CSS classes for the nav container               |
| `crumbClassNames` | `string`                                        | `""`        | Custom CSS classes for individual breadcrumb items     |
| `maxItems`        | `number`                                        | `5`         | Maximum number of visible items before collapsing      |
| `onItemClick`     | `(item: BreadcrumbItem, index: number) => void` | -           | Callback when a breadcrumb item is clicked             |
| `collapsible`     | `boolean`                                       | `false`     | Whether the breadcrumb can be collapsed                |
| `noAnimations`    | `boolean`                                       | `undefined` | Disable animations (respects prefers-reduced-motion)   |

## BreadcrumbItem Interface

```tsx
interface BreadcrumbItem {
  label: string; // Display text for the breadcrumb
  href?: string; // URL to navigate to
  icon?: React.ReactNode; // Optional icon element
  isActive?: boolean; // Whether this item is the current page
}
```

## Accessibility

The breadcrumb component follows accessibility best practices:

- Uses semantic `<nav>` element with proper `aria-label`
- Implements `aria-current="page"` for the current page
- Supports keyboard navigation
- Respects `prefers-reduced-motion` for animations
- Provides proper focus management
- Uses semantic markup for screen readers

## Styling

The component uses Tailwind CSS classes and supports:

- **Dark mode**: Automatically adapts to system preference
- **Custom themes**: Override colors via Tailwind classes
- **Responsive design**: Mobile-friendly with collapsible option
- **Flexible layouts**: Multiple variants and separator options

### CSS Variables

The component respects your Tailwind configuration and dark mode settings. Default colors can be customized through your theme configuration.

## Animation Control

Animations are powered by Framer Motion and include:

- Stagger animations for breadcrumb items
- Smooth transitions for hover states
- Collapse/expand animations
- Respect for `prefers-reduced-motion`

To disable all animations:

```tsx
<Breadcrumb mode="url" noAnimations={true} />
```
