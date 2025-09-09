import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const SpotlightContext = createContext({
  highlightElement: (element: HTMLElement) => {},
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

  const highlightElement = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    setElementRect(rect);
    setActiveElement(element);
    setIsActive(true);
  }, []);

  const clearSpotlight = useCallback(() => {
    setActiveElement(null);
    setElementRect(null);
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
        <div
          className="pointer-events-none fixed z-50"
          style={{
            left: elementRect.left + window.scrollX,
            top: elementRect.top + window.scrollY,
            width: elementRect.width,
            height: elementRect.height,
          }}
        >
          {/* Circle overlay */}
          <div
            className="absolute border-4 border-white rounded-full animate-pulse"
            style={{
              left: "50%",
              top: "50%",
              width: Math.max(elementRect.width, elementRect.height) + 20,
              height: Math.max(elementRect.width, elementRect.height) + 20,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }}
          />
        </div>
      )}
    </SpotlightContext.Provider>
  );
}

interface UseSpotlightTargetConfig {
  highlightOnHover?: boolean;
}

export function useSpotlightTarget(config: UseSpotlightTargetConfig = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const { highlightElement, clearSpotlight } = useContext(SpotlightContext);

  const highlight = useCallback(() => {
    if (elementRef.current) {
      highlightElement(elementRef.current);
    }
  }, [highlightElement]);

  const stopHighlight = useCallback(() => {
    clearSpotlight();
  }, [clearSpotlight]);

  useEffect(() => {
    const element = elementRef.current;
    if (element && config.highlightOnHover) {
      element.addEventListener("mouseenter", highlight);
      element.addEventListener("mouseleave", stopHighlight);

      return () => {
        element.removeEventListener("mouseenter", highlight);
        element.removeEventListener("mouseleave", stopHighlight);
      };
    }
  }, [highlight, stopHighlight, config.highlightOnHover]);

  return {
    ref: elementRef,
    highlight,
    stopHighlight,
    requestSpotlight: highlight,
  };
}
