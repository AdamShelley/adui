"use client";

import React, { useEffect, useState, useCallback } from "react";
import { BreadcrumbItem, BreadcrumbProps } from "./types/BreadcrumbTypes";
import { ChevronRight } from "lucide-react";

import { motion } from "motion/react";

const LineSeparator = () => (
  <div className="flex items-center justify-center">
    <div className="h-1 w-10 bg-slate-400 rounded-sm "></div>
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
      setVisibleItems(newItems);
    } else {
      setVisibleItems(items);
    }
  }, [mode, items, currentPath, homeHref, showHome]);

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
        className="flex gap-1"
        initial="initial"
        animate="animate"
        variants={parentVariants}
      >
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
                  <div className="flex items-center justify-center h-full">
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
