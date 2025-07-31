import React, { useEffect, useState, useCallback } from "react";
import { cn } from "../utils/cn";
import { BreadcrumbItem, BreadcrumbProps } from "./types/BreadcrumbTypes";
import { ChevronRight, Home } from "lucide-react";

import { motion } from "motion/react";

const LineSeparator = () => (
  <div className="flex items-center justify-center">
    <div className="h-1 w-4 bg-gray-800 rounded-xs "></div>
  </div>
);

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  mode = "url-based",
  items,
  separator = "chevron",
  customSeparator,
  showHome = true,
  homeLabel = "",
  homeHref = "/",
  navClassName = "",
  crumbClassNames = "",
  maxItems = 5,
  onItemClick,
  collapsible = false,
  noAnimations,
}) => {
  const [visibleItems, setVisibleItems] = React.useState<BreadcrumbItem[]>([]);
  const [hiddenItems, setHiddenItems] = React.useState<BreadcrumbItem[]>([]);
  const [showHiddenDropdown, setShowHiddenDropdown] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState("");
  const [collapsed, setCollapsed] = useState<boolean>(collapsible);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // Use explicit user preference if provided, otherwise respect system preference
  const shouldDisableAnimations =
    noAnimations !== undefined ? noAnimations : prefersReducedMotion;

  const parentVariants = {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const childVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  };

  const checkIfCurrentPath = useCallback(
    (href: string) => {
      // Normalize paths by removing trailing slashes and ensuring they start with /
      const normalizedCurrentPath =
        currentPath === "" ? "/" : currentPath.replace(/\/$/, "");
      const normalizedHref = href.replace(/\/$/, "") || "/";

      // Special case for home button
      if (normalizedHref === homeHref || normalizedHref === "/") {
        return (
          normalizedCurrentPath === "/" || normalizedCurrentPath === homeHref
        );
      }

      // For other paths, check if they match exactly
      return normalizedCurrentPath === normalizedHref;
    },
    [currentPath, homeHref]
  );

  const generateCrumbsFromUrl = useCallback(() => {
    if (mode === "url-based") {
      const pathParts = currentPath.split("/").filter(Boolean);
      const newItems: BreadcrumbItem[] = pathParts.map((part, index) => {
        const href = `/${pathParts.slice(0, index + 1).join("/")}`;
        return {
          label: part.charAt(0).toUpperCase() + part.slice(1),
          href,
          icon: null,
        };
      });

      if (!showHome) {
        newItems.unshift({ label: "Home", href: homeHref, icon: null });
      }

      // Limit the number of items based on maxItems
      if (newItems.length > maxItems) {
        const startIndex = newItems.length - maxItems;
        const newItemsToShow = newItems.slice(startIndex);
        setVisibleItems(newItemsToShow);

        setHiddenItems(newItems.slice(0, startIndex));
      } else {
        setVisibleItems(newItems);
      }
    } else {
      setVisibleItems(items);
    }
  }, [mode, currentPath, showHome, maxItems, homeHref, items]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }

    if (mode === "url-based") {
      generateCrumbsFromUrl();
    }
  }, [mode, generateCrumbsFromUrl]);

  return (
    <nav
      className={cn("w-fit", navClassName)}
      aria-label="Page navigation breadcrumb"
    >
      <motion.div
        className="flex gap-1 relative"
        initial="initial"
        animate="animate"
        variants={shouldDisableAnimations ? undefined : parentVariants}
      >
        {collapsible ? (
          <button
            className="text-gray-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand breadcrumb" : "Collapse breadcrumb"}
          >
            {!collapsed ? (
              <ChevronRight className="inline-block ml-1" />
            ) : (
              <ChevronRight className="inline-block ml-1 rotate-90" />
            )}
          </button>
        ) : null}

        {showHome ? (
          <motion.div className="flex items-center">
            <motion.a
              className="text-gray-500 hover:text-gray-900 transition-colors duration-200 overflow-auto whitespace-nowrap flex items-center justify-center"
              href={homeHref}
              onClick={() => {
                if (onItemClick) {
                  onItemClick({ label: "Home", href: homeHref }, 0);
                }
              }}
            >
              <Home className=" size-4" />
              {homeLabel ? <span className="ml-1">{homeLabel}</span> : null}
            </motion.a>
          </motion.div>
        ) : null}

        {!collapsed && hiddenItems.length > 0 && (
          <motion.div
            className="flex items-center gap-1"
            variants={shouldDisableAnimations ? undefined : childVariants}
          >
            <span
              className="text-gray-400 font-bold cursor-pointer hover:text-blue-800 transition-colors duration-200"
              onClick={() => setShowHiddenDropdown(!showHiddenDropdown)}
              aria-expanded={showHiddenDropdown}
            >
              ...
            </span>

            {showHiddenDropdown ? (
              <motion.div
                variants={shouldDisableAnimations ? undefined : parentVariants}
                className=" absolute top-6 left-0 bg-white rounded-sm z-10 mt-1"
              >
                {hiddenItems.map((item, index) => (
                  <motion.div
                    variants={
                      shouldDisableAnimations ? undefined : childVariants
                    }
                    className="flex flex-row items-center"
                    key={index}
                  >
                    <div>
                      <div className="flex items-center justify-center h-full text-gray-400 size-4">
                        {separator === "chevron" && <ChevronRight />}
                        {separator === "slash" && <span>/</span>}
                        {separator === "line" && <LineSeparator />}
                        {separator === "custom" && customSeparator}
                      </div>
                    </div>
                    <div className="flex flex-col align-center justify-start gap-2 w-full h-full text-base">
                      {item.href && !checkIfCurrentPath(item.href) ? (
                        <motion.a
                          className="text-gray-500 hover:text-gray-900 transition-colors duration-200 overflow-auto whitespace-nowrap"
                          href={item.href}
                          whileHover={
                            shouldDisableAnimations
                              ? undefined
                              : {
                                  transition: { duration: 0.1 },
                                }
                          }
                          onClick={() => {
                            if (onItemClick) {
                              onItemClick(item, index);
                            }
                          }}
                        >
                          {item.label}
                        </motion.a>
                      ) : (
                        <span
                          className={cn(
                            "overflow-auto whitespace-nowrap",
                            checkIfCurrentPath(item.href || "")
                              ? "text-blue-600 font-bold"
                              : ""
                          )}
                          onClick={() => {
                            if (onItemClick) {
                              onItemClick(item, index);
                            }
                          }}
                          aria-current={
                            checkIfCurrentPath(item.href || "")
                              ? "page"
                              : undefined
                          }
                        >
                          {item.label}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : null}
          </motion.div>
        )}
        {!collapsed &&
          visibleItems.map((item, index) => {
            // If showhome is false
            if (index === 0 && !showHome) {
              return null;
            }

            return (
              <motion.div
                key={index}
                className={cn("flex items-center gap-1")}
                variants={shouldDisableAnimations ? undefined : childVariants}
              >
                <div>
                  {index !== 0 && (
                    <div className="flex items-center justify-center h-full text-gray-400 size-4">
                      {separator === "chevron" && <ChevronRight />}
                      {separator === "slash" && <span>/</span>}
                      {separator === "line" && <LineSeparator />}
                      {separator === "custom" && customSeparator}
                    </div>
                  )}
                </div>
                <motion.div
                  key={index}
                  className="flex items-center justify-center gap-1"
                >
                  {/* LOGO */}
                  {item.icon ? (
                    <span className="text-slate-400">{item.icon}</span>
                  ) : null}

                  {/* LINK */}
                  {item.href && !checkIfCurrentPath(item.href) ? (
                    <motion.a
                      className={cn(
                        "text-gray-500 hover:text-gray-900 transition-colors duration-200 overflow-auto whitespace-nowrap",
                        crumbClassNames
                      )}
                      href={item.href}
                      whileHover={
                        shouldDisableAnimations
                          ? undefined
                          : {
                              transition: { duration: 0.1 },
                            }
                      }
                      onClick={() => {
                        if (onItemClick) {
                          onItemClick(item, index);
                        }
                      }}
                    >
                      {item.label}
                    </motion.a>
                  ) : (
                    <span
                      className={cn(
                        "overflow-auto whitespace-nowrap",
                        checkIfCurrentPath(item.href || "")
                          ? "text-blue-600 font-bold"
                          : "",
                        crumbClassNames
                      )}
                      onClick={() => {
                        if (onItemClick) {
                          onItemClick(item, index);
                        }
                      }}
                      aria-current={
                        checkIfCurrentPath(item.href || "") ? "page" : undefined
                      }
                    >
                      {item.label}
                    </span>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
      </motion.div>
    </nav>
  );
};
