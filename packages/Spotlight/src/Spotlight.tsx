import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const SpotlightContext = createContext({
  highlightElement: (
    _element: HTMLElement,
    _component?: React.ReactElement
  ) => {},
  clearSpotlight: () => {},
  isActive: false,
});

interface SpotlightProviderProps {
  children: React.ReactNode;
}

export function SpotlightProvider({ children }: SpotlightProviderProps) {
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);
  const [activeComponent, setActiveComponent] =
    useState<React.ReactElement | null>(null);

  const highlightElement = useCallback(
    (element: HTMLElement, component?: React.ReactElement) => {
      const rect = element.getBoundingClientRect();
      setElementRect(rect);
      setActiveElement(element);
      setActiveComponent(component || null);
      setIsActive(true);
    },
    []
  );

  const clearSpotlight = useCallback(() => {
    setActiveElement(null);
    setElementRect(null);
    setActiveComponent(null);
    setIsActive(false);
  }, []);

  useEffect(() => {
    if (activeElement && isActive) {
      // Update position on scroll/resize
      const updatePosition = () => {
        const rect = activeElement.getBoundingClientRect();
        setElementRect(rect);
      };

      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [activeElement, isActive]);

  return (
    <SpotlightContext.Provider
      value={{ highlightElement, clearSpotlight, isActive }}
    >
      {children}
      {/* Spotlight overlay */}
      {isActive && elementRect && (
        <>
          {/* Dark overlay with blur - only outside spotlight */}
          <div
            className="pointer-events-none fixed inset-0 z-50"
            style={{
              background: `radial-gradient(circle ${
                Math.max(elementRect.width, elementRect.height) / 2 + 40
              }px at ${
                elementRect.left + elementRect.width / 2 + window.scrollX
              }px ${
                elementRect.top + elementRect.height / 2 + window.scrollY
              }px, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.8) 70%)`,
            }}
          />
          {/* Blur layer - only outside spotlight */}
          <div
            className="pointer-events-none fixed inset-0 z-50"
            style={{
              backdropFilter: "blur(2px)",
              mask: `radial-gradient(circle ${
                Math.max(elementRect.width, elementRect.height) / 2 + 40
              }px at ${
                elementRect.left + elementRect.width / 2 + window.scrollX
              }px ${
                elementRect.top + elementRect.height / 2 + window.scrollY
              }px, transparent 0%, transparent 40%, black 70%)`,
            }}
          />

          <div
            className="absolute border-4 border-white/50 rounded-full animate-pulse pointer-events-none z-50"
            style={{
              left: elementRect.left + elementRect.width / 2 + window.scrollX,
              top: elementRect.top + elementRect.height / 2 + window.scrollY,
              width: Math.max(elementRect.width, elementRect.height) + 80,
              height: Math.max(elementRect.width, elementRect.height) + 80,
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Custom component tooltip */}
          {activeComponent && (
            <div
              className="absolute z-[60] pointer-events-auto"
              style={{
                left: elementRect.left + elementRect.width / 2 + window.scrollX,
                top: elementRect.bottom + window.scrollY + 20, // 20px below the element
                transform: "translateX(-50%)", // Center horizontally
              }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm">
                {activeComponent}
              </div>
            </div>
          )}
        </>
      )}
    </SpotlightContext.Provider>
  );
}

interface UseSpotlightTargetConfig {
  highlightOnHover?: boolean;
  addedComponent?: React.ReactElement;
}

export function useSpotlightTarget(config: UseSpotlightTargetConfig = {}) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const { highlightElement, clearSpotlight } = useContext(SpotlightContext);

  const highlight = useCallback(() => {
    if (element) {
      highlightElement(element, config.addedComponent);
    }
  }, [highlightElement, element, config.addedComponent]);

  const stopHighlight = useCallback(() => {
    clearSpotlight();
  }, [clearSpotlight]);

  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (element && config.highlightOnHover) {
      element.addEventListener("mouseenter", highlight);
      element.addEventListener("mouseleave", stopHighlight);

      return () => {
        element.removeEventListener("mouseenter", highlight);
        element.removeEventListener("mouseleave", stopHighlight);
      };
    }
  }, [element, highlight, stopHighlight, config.highlightOnHover]);

  return {
    ref,
    highlight,
    stopHighlight,
    requestSpotlight: highlight,
  };
}
