"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../utils/cn";

import { AnimatePresence, motion } from "framer-motion";

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
  blockInteractions?: boolean; // whether to block interactions with elements outside spotlight, default true
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
  blockInteractions = true,
}: SpotlightProviderProps) {
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);
  const [activeComponent, setActiveComponent] =
    useState<React.ReactElement | null>(null);
  const [isPersistent, setIsPersistent] = useState(false);
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

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

      // Ensure the highlighted element is above the blocking overlay
      element.style.position = element.style.position || "relative";
      element.style.zIndex = "51";
    },
    [isActive, isPersistent]
  );

  const clearSpotlight = useCallback(() => {
    // Reset z-index on the previously active element
    if (activeElement) {
      activeElement.style.zIndex = "";
      activeElement.style.transform = "";
      if (
        activeElement.style.position === "relative" &&
        !activeElement.style.cssText.includes("position")
      ) {
        activeElement.style.position = "";
      }
    }
    setActiveElement(null);
    setElementRect(null);
    setActiveComponent(null);
    setIsPersistent(false);
    setIsActive(false);
  }, [activeElement]);

  const clearSpotlightFromElement = useCallback(
    (element: HTMLElement) => {
      // Only clear if this element is the currently active one
      if (activeElement === element) {
        clearSpotlight();
      }
    },
    [activeElement, clearSpotlight]
  );

  // useEffect(() => {
  //   const updateMousePosition = (e: MouseEvent) => {
  //     setMousePosition([e.clientX, e.clientY]);
  //   };

  //   window.addEventListener("mousemove", (e) => updateMousePosition(e));

  //   return () => {
  //     window.removeEventListener("mousemove", updateMousePosition);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (activeElement && elementRect && isPersistent) {
  //     const spotlightCenterX = elementRect.left + elementRect.width / 2;
  //     const spotlightCenterY = elementRect.top + elementRect.height / 2;

  //     // Calculate spotlight radius
  //     const spotlightRadius =
  //       Math.max(elementRect.width, elementRect.height) / 2 + spotlightPadding;

  //     // Calculate mouse distance from spotlight center
  //     const mouseDistanceX = mousePosition[0] - spotlightCenterX;
  //     const mouseDistanceY = mousePosition[1] - spotlightCenterY;
  //     const mouseDistanceFromCenter = Math.sqrt(
  //       mouseDistanceX * mouseDistanceX + mouseDistanceY * mouseDistanceY
  //     );

  //     // Only apply parallax if mouse is within spotlight
  //     if (mouseDistanceFromCenter <= spotlightRadius) {
  //       // Calculate how close to edge (0 = center, 1 = edge)
  //       const edgeProximity = mouseDistanceFromCenter / spotlightRadius;

  //       // Reduce effect near edges (creates smooth falloff)
  //       const falloffFactor = Math.pow(1 - edgeProximity, 2);

  //       // Apply parallax with falloff
  //       const baseOffset = 0.15;
  //       const effectiveOffset = baseOffset * falloffFactor;

  //       const mouseOffsetX = mouseDistanceX * effectiveOffset;
  //       const mouseOffsetY = mouseDistanceY * effectiveOffset;

  //       activeElement.style.setProperty(
  //         "transform",
  //         `translateX(${mouseOffsetX}px) translateY(${mouseOffsetY}px)`,
  //         "important"
  //       );
  //       activeElement.style.transition = "transform 0.08s ease-out";
  //     } else {
  //       // Reset when mouse leaves spotlight area
  //       activeElement.style.setProperty(
  //         "transform",
  //         "translateX(0px) translateY(0px)",
  //         "important"
  //       );
  //     }
  //   }
  // }, [mousePosition, elementRect, isPersistent, activeElement]);

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
          {/* Blocking overlay - prevents interaction with all elements except spotlit one */}
          {blockInteractions && (
            <>
              {/* Full blocking layer */}
              <div
                className="fixed inset-0 z-[49]"
                style={{
                  pointerEvents: "auto",
                  backgroundColor: "transparent",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Optionally clear spotlight when clicking outside
                  if (!isPersistent) {
                    clearSpotlight();
                  }
                }}
              />
              {/* Spotlight hole - allows interaction with highlighted element */}
              <div
                className="fixed z-[50]"
                style={{
                  left: elementRect.left - spotlightPadding,
                  top: elementRect.top - spotlightPadding,
                  width: elementRect.width + spotlightPadding * 2,
                  height: elementRect.height + spotlightPadding * 2,
                  pointerEvents: "none",
                }}
              />
            </>
          )}

          {/* Dark overlay - controls how visible content outside spotlight is */}
          <div
            onClick={(e) => e.stopPropagation()}
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
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "pointer-events-none fixed inset-0 z-50",
              blurClassName
            )}
            style={{
              backdropFilter: `blur(${blurIntensity}px)`,
              mask: `radial-gradient(circle ${
                (Math.max(elementRect.width, elementRect.height) + 80) / 2
              }px at ${
                elementRect.left + elementRect.width / 2 + window.scrollX
              }px ${
                elementRect.top + elementRect.height / 2 + window.scrollY
              }px, transparent 0%, transparent 100%, black 100%)`,
            }}
          />

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 5 } }}
              className={cn(
                "absolute border-2 border-[#ccc] rounded-full pointer-events-none z-[55]",
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
          </AnimatePresence>

          {/* Custom component tooltip */}
          {activeComponent && (
            <div
              className={cn("absolute z-[60] pointer-events-auto", className)}
              style={{
                left: elementRect.left + elementRect.width / 2 + window.scrollX,
                top: elementRect.bottom + window.scrollY + 150,
                transform: "translateX(-50%)",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
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
        }, 100);
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
