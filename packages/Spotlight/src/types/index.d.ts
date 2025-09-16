// Types for Spotlight component

export interface SpotlightTargetConfig {
  /** Highlight element on hover */
  highlightOnHover?: boolean;
  /** Component to show in tooltip */
  addedComponent?: React.ReactElement;
  /** Keep spotlight active on mouse leave */
  dontDisappear?: boolean;
}

export interface SpotlightContextValue {
  highlightElement: (
    element: HTMLElement,
    component?: React.ReactElement
  ) => void;
  clearSpotlight: () => void;
  isActive: boolean;
}

export interface SpotlightTargetReturn {
  ref: (node: HTMLElement | null) => void;
  highlight: () => void;
  stopHighlight: () => void;
  requestSpotlight: () => void;
}
