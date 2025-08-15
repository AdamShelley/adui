import React, { useEffect, useState, useCallback } from "react";
import { cn } from "../utils/cn";
import { BreadcrumbItem, BreadcrumbProps } from "./types/BreadcrumbTypes";
import { ChevronRight, Home } from "lucide-react";

import { motion } from "motion/react";

export const LineSeparator = () => (
  <div className="flex items-center justify-center">
    <div className="h-[1px] w-3 bg-gray-800 rounded-xs dark:bg-white"></div>
  </div>
);

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  mode = "url",
  items,
  separator = "chevron",
  customSeparator,
  showHome = true,
  homeLabel = "",
  homeHref = "/",
  variant = "default",
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
        ease: "easeOut",
        duration: 0.2,
      },
    },
  };

  const childVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { ease: "easeOut", duration: 0.2 },
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
    if (mode === "url") {
      const pathParts = currentPath.split("/").filter(Boolean);
      const newItems: BreadcrumbItem[] = pathParts.map((part, index) => {
        const href = `/${pathParts.slice(0, index + 1).join("/")}`;
        return {
          label: part.charAt(0).toUpperCase() + part.slice(1),
          href,
          icon: null,
        };
      });

      // Limit the number of items based on maxItems
      if (newItems.length > maxItems) {
        const startIndex = newItems.length - maxItems;
        const newItemsToShow = newItems.slice(startIndex);
        setVisibleItems(newItemsToShow);

        const hiddenItemsReversed = newItems.slice(0, startIndex).reverse();

        setHiddenItems(hiddenItemsReversed);
      } else {
        setVisibleItems(newItems);
      }
    } else if (mode === "custom" && items?.length) {
      setVisibleItems(items);
    }
  }, [mode, currentPath, maxItems, items]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }

    if (mode === "url") {
      generateCrumbsFromUrl();
    } else if (mode === "custom" && items?.length) {
      setVisibleItems(items);
    }
  }, [mode, generateCrumbsFromUrl, items]);

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
        {collapsible &&
        visibleItems.length >= 1 &&
        !checkIfCurrentPath(homeHref) ? (
          <motion.button
            className="text-gray-500 hover:text-blue-800 transition-colors duration-200 cursor-pointer flex items-center justify-center dark:text-white/70 hover:dark:text-slate-400"
            onClick={() => {
              setCollapsed(!collapsed);
              setShowHiddenDropdown(false);
            }}
            aria-label={collapsed ? "Expand breadcrumb" : "Collapse breadcrumb"}
            whileTap={noAnimations ? undefined : { scale: 0.95 }}
          >
            <motion.div
              animate={
                noAnimations ? undefined : { rotate: collapsed ? 90 : 0 }
              }
              transition={
                noAnimations ? undefined : { duration: 0.1, ease: "easeOut" }
              }
              className={`inline-block ml-1 ${
                noAnimations && collapsed ? "rotate-90" : ""
              }`}
            >
              <ChevronRight />
            </motion.div>
          </motion.button>
        ) : null}

        {showHome ? (
          <motion.div className="flex items-center">
            <motion.a
              className={cn(
                "text-gray-500 hover:text-gray-900 transition-colors duration-200 overflow-auto whitespace-nowrap flex items-center justify-center dark:text-white/80 hover:dark:text-white/80",
                variant === "pills" &&
                  "rounded-full border dark:border-gray-600 px-3 py-1",
                variant === "bordered" &&
                  "rounded-sm border dark:border-gray-600 px-3 py-1"
              )}
              href={homeHref}
              onClick={() => {
                if (onItemClick) {
                  onItemClick({ label: "Home", href: homeHref }, 0);
                }
              }}
            >
              <Home className=" size-4 dark:text-white/60 hover:dark:text-white/50" />
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
              className="text-gray-400 font-bold cursor-pointer hover:text-blue-800 transition-colors duration-200 dark:text-white/70 hover:dark:text-slate-400"
              onClick={() => setShowHiddenDropdown(!showHiddenDropdown)}
              aria-expanded={showHiddenDropdown}
            >
              ...
            </span>

            {showHiddenDropdown ? (
              <motion.div
                variants={shouldDisableAnimations ? undefined : parentVariants}
                className={cn(
                  "absolute top-6 left-0 bg-white rounded-sm z-10 mt-1 dark:bg-transparent",
                  variant !== "default" && "mt-6",
                  variant === "bordered" &&
                    "rounded-sm border dark:border-gray-600 px-3 py-1 mt-5"
                )}
              >
                {hiddenItems.map((item, index) => (
                  <motion.div
                    variants={
                      shouldDisableAnimations ? undefined : childVariants
                    }
                    className="flex flex-row items-center"
                    key={index}
                  >
                    {variant === "default" ? (
                      <div>
                        <div className="flex items-center justify-center h-full text-gray-400 size-4">
                          {separator === "chevron" && <ChevronRight />}
                          {separator === "slash" && <span>/</span>}
                          {separator === "line" && <LineSeparator />}
                          {separator === "custom" && customSeparator}
                        </div>
                      </div>
                    ) : null}
                    <div className="flex flex-col align-center justify-start gap-2 w-full h-full text-base">
                      {item.href && !checkIfCurrentPath(item.href) ? (
                        <motion.a
                          className={cn(
                            "text-gray-500 hover:text-gray-900 transition-colors duration-200 overflow-auto whitespace-nowrap dark:text-white/90 hover:dark:text-white/80",
                            variant === "pills" &&
                              "rounded-full border dark:border-gray-600 px-3 py-1 mt-2"
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
                              ? "text-blue-600 font-semibold"
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
            return (
              <motion.div
                key={index}
                className={cn("flex items-center gap-1")}
                variants={shouldDisableAnimations ? undefined : childVariants}
              >
                <div>
                  {index !== 0 && (
                    <div className="flex items-center justify-center h-full text-gray-400 size-4 dark:text-white/70">
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
                    <span className="text-slate-400 dark:text-white/80">
                      {item.icon}
                    </span>
                  ) : null}

                  {/* LINK */}
                  {item.href && !checkIfCurrentPath(item.href) ? (
                    <motion.a
                      className={cn(
                        "text-gray-500 hover:text-gray-900 transition-colors duration-200 overflow-auto whitespace-nowrap dark:text-white/90 hover:dark:text-white/80",
                        variant === "pills" &&
                          "rounded-full border dark:border-gray-600 px-3 py-1",
                        variant === "bordered" &&
                          "rounded-sm border dark:border-gray-600 px-3 py-1",
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
                          ? "text-blue-600 font-semibold dark:text-blue-400"
                          : "",
                        variant === "pills" &&
                          "rounded-full border dark:border-gray-600 px-3 py-1",
                        variant === "bordered" &&
                          "rounded-sm border dark:border-gray-600 px-3 py-1",
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
