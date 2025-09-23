import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../utils/cn";

import { motion } from "framer-motion";

const SpotlightContext = createContext({
  highlightElement: (
    _element: HTMLElement,
    _component?: React.ReactElement,
    _isPersistent?: boolean
  ) => {},
  clearSpotlight: () => {},
  clearSpotlightFromElement: (_element: HTMLElement) => {},
  isActive: false,
});

export { SpotlightContext };

// Provider

export interface SpotlightProviderProps {
  children: React.ReactNode;
  blurIntensity?: number; // in pixels, default 2px
  outsideOpacity?: number; // 0-1, how visible content outside spotlight should be, default 0.3
  spotlightPadding?: number; // extra padding around spotlight area, default 20px
  className?: string; // additional styles for the provider
  overlayClassName?: string; // styles for the overlay
  blurClassName?: string; // styles for the blur layer
  borderClassName?: string; // styles for the spotlight border
  tooltipClassName?: string; // styles for the tooltip container
  spotlightShape?: SpotlightShape;
}

type SpotlightShape = "circle" | "square";

export function SpotlightProvider({
  children,
  blurIntensity = 2,
  outsideOpacity = 0.3,
  spotlightPadding = 20,
  className,
  overlayClassName,
  blurClassName,
  borderClassName,
  tooltipClassName,
  spotlightShape = "circle",
}: SpotlightProviderProps) {
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);
  const [activeComponent, setActiveComponent] =
    useState<React.ReactElement | null>(null);
  const [isPersistent, setIsPersistent] = useState(false);

  const highlightElement = useCallback(
    (
      element: HTMLElement,
      component?: React.ReactElement,
      persistent?: boolean
    ) => {
      // Don't allow new spotlights to override a persistent one
      if (isActive && isPersistent && !persistent) {
        return;
      }

      const rect = element.getBoundingClientRect();
      setElementRect(rect);
      setActiveElement(element);
      setActiveComponent(component || null);
      setIsPersistent(persistent || false);
      setIsActive(true);
    },
    [isActive, isPersistent]
  );

  const clearSpotlight = useCallback(() => {
    setActiveElement(null);
    setElementRect(null);
    setActiveComponent(null);
    setIsPersistent(false);
    setIsActive(false);
  }, []);

  const clearSpotlightFromElement = useCallback(
    (element: HTMLElement) => {
      // Only clear if this element is the currently active one
      if (activeElement === element) {
        clearSpotlight();
      }
    },
    [activeElement, clearSpotlight]
  );

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
      value={{
        highlightElement,
        clearSpotlight,
        clearSpotlightFromElement,
        isActive,
      }}
    >
      {children}
      {/* Spotlight overlay */}
      {isActive && elementRect && (
        <>
          {/* Dark overlay - controls how visible content outside spotlight is */}
          <div
            className={cn(
              "pointer-events-none fixed inset-0 z-50",
              overlayClassName
            )}
            style={{
              background: `radial-gradient(circle ${
                Math.max(elementRect.width, elementRect.height) / 2 +
                spotlightPadding
              }px at ${
                elementRect.left + elementRect.width / 2 + window.scrollX
              }px ${
                elementRect.top + elementRect.height / 2 + window.scrollY
              }px, transparent 30%, transparent 40%, rgba(0, 0, 0, ${
                1 - outsideOpacity
              }) 70%)`,
            }}
          />

          {/* Blur layer - only outside spotlight */}
          <div
            className={cn(
              "pointer-events-none fixed inset-0 z-50",
              blurClassName
            )}
            style={{
              backdropFilter: `blur(${blurIntensity}px)`,
              mask: `radial-gradient(circle ${
                Math.max(elementRect.width, elementRect.height) / 2 +
                spotlightPadding +
                80
              }px at ${
                elementRect.left + elementRect.width / 2 + window.scrollX
              }px ${
                elementRect.top + elementRect.height / 2 + window.scrollY
              }px, transparent 0%, transparent 40%, black 70%)`,
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            className={cn(
              "absolute border-4 border-white/50 rounded-full pointer-events-none z-[55]",
              borderClassName
            )}
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
              className={cn("absolute z-[60] pointer-events-auto", className)}
              style={{
                left: elementRect.left + elementRect.width / 2 + window.scrollX,
                top: elementRect.bottom + window.scrollY + 150,
                transform: "translateX(-50%)",
              }}
            >
              <div
                className={cn(
                  "bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm",
                  tooltipClassName
                )}
              >
                {activeComponent}
              </div>
            </div>
          )}
        </>
      )}
    </SpotlightContext.Provider>
  );
}

// Hook

interface UseSpotlightTargetConfig {
  highlightOnHover?: boolean;
  addedComponent?: React.ReactElement;
  dontDisappear?: boolean;
}

export function useSpotlightTarget(config: UseSpotlightTargetConfig = {}) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const { highlightElement, clearSpotlightFromElement } =
    useContext(SpotlightContext);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const highlight = useCallback(() => {
    if (element) {
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      highlightElement(element, config.addedComponent, config.dontDisappear);
    }
  }, [highlightElement, element, config.addedComponent, config.dontDisappear]);

  const stopHighlight = useCallback(() => {
    if (element) {
      // Clear any pending timeout first
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // For persistent spotlights (dontDisappear: true), clear immediately
      // For non-persistent, add a small delay to prevent rapid on/off cycling
      if (config.dontDisappear) {
        clearSpotlightFromElement(element);
      } else {
        timeoutRef.current = setTimeout(() => {
          clearSpotlightFromElement(element);
        }, 100); // 100ms delay
      }
    }
  }, [clearSpotlightFromElement, config.dontDisappear, element]);

  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (element && config.highlightOnHover) {
      element.addEventListener("mouseenter", highlight);

      if (!config.dontDisappear) {
        element.addEventListener("mouseleave", stopHighlight);
      }

      return () => {
        element.removeEventListener("mouseenter", highlight);
        element.removeEventListener("mouseleave", stopHighlight);
        // Clear timeout on cleanup
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [
    element,
    highlight,
    stopHighlight,
    config.highlightOnHover,
    config.dontDisappear,
  ]);

  return {
    ref,
    highlight,
    stopHighlight,
    requestSpotlight: highlight,
  };
}
