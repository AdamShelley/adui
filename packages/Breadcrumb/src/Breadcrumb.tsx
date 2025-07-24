"use client";

import React, { useEffect, useState, useCallback } from "react";
import { BreadcrumbItem, BreadcrumbProps } from "./types/BreadcrumbTypes";
import { ChevronRight } from "lucide-react";

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
  homeHref = "/",
  variant = "default",
  size = "md",
  className = "",
  onItemClick,
  maxItems = 5,
  collapseFrom = "middle",
}) => {
  const [visibleItems, setVisibleItems] = React.useState<BreadcrumbItem[]>([]);
  const [hiddenItems, setHiddenItems] = React.useState<BreadcrumbItem[]>([]);
  const [showHiddenDropdown, setShowHiddenDropdown] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState("");

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
      if (showHome) {
        newItems.unshift({ label: "Home", href: homeHref, icon: null });
      }

      // Limit the number of items based on maxItems
      if (newItems.length > maxItems) {
        // New items to be spliced by showing the last `maxItems` items
        const startIndex = newItems.length - maxItems;
        const newItemsToShow = newItems.slice(startIndex);
        setVisibleItems(newItemsToShow);
        // Save the previous items as hidden Items
        setHiddenItems(newItems.slice(0, startIndex));
      } else {
        setVisibleItems(newItems);
      }
    } else {
      setVisibleItems(items);
    }
  }, [mode, currentPath, showHome, maxItems, homeHref, items]);

  const showDropdown = () => {};

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }

    if (mode === "url-based") {
      generateCrumbsFromUrl();
    }
  }, [mode, generateCrumbsFromUrl]);

  return (
    <nav className={`${className}`} aria-label="breadcrumb">
      <motion.div
        className="flex gap-1 relative"
        initial="initial"
        animate="animate"
        variants={parentVariants}
      >
        {hiddenItems.length > 0 && (
          <motion.div
            className="flex items-center gap-1"
            variants={childVariants}
          >
            <span
              className="text-gray-400 font-bold cursor-pointer hover:text-blue-800 transition-colors duration-200"
              onClick={() => setShowHiddenDropdown(!showHiddenDropdown)}
            >
              ...
            </span>

            {showHiddenDropdown ? (
              <div className=" absolute top-6 border border-gray-100 bg-white shadow-xs rounded-lg px-4 py-2 z-10 ">
                {hiddenItems.map((item, index) => (
                  <div className="flex flex-col align-center justify-start gap-2 w-full h-full font-medium text-base">
                    {item.href ? (
                      <motion.a
                        className="hover:text-blue-800  transition-colors duration-200 overflow-auto whitespace-nowrap"
                        href={item.href}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.1 },
                        }}
                      >
                        {item.label}
                      </motion.a>
                    ) : (
                      <span className="overflow-auto whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        )}
        {visibleItems.map((item, index) => {
          // If showhome is false
          if (index === 0 && !showHome) {
            return null;
          }

          return (
            <motion.div
              key={index}
              className="flex items-center gap-1"
              variants={childVariants}
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
                {item.href ? (
                  <motion.a
                    className="hover:text-blue-800  transition-colors duration-200 overflow-auto whitespace-nowrap"
                    href={item.href}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.1 },
                    }}
                  >
                    {item.label}
                  </motion.a>
                ) : (
                  <span className="overflow-auto whitespace-nowrap">
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
