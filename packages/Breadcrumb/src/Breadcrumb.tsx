import React from "react";
import { BreadcrumbProps } from "./types/BreadcrumbTypes";
import { ChevronRight } from "lucide-react";

import { motion } from "motion/react";

const LineSeparator = () => (
  <div className="flex items-center justify-center">
    <div className="h-1 w-10 bg-slate-400 rounded-sm "></div>
  </div>
);

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = "chevron",
  customSeparator,
  showHome = true,
  homeHref = "/",
  variant = "default",
  size = "md",
  className = "",
  onItemClick,
  maxItems,
  collapseFrom = "middle",
}) => {
  const initialTransition =
    collapseFrom === "start"
      ? { transform: "translateX(-100px)" }
      : { transform: "translateX(100px)" };

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

  return (
    <nav className={`breadcrumb ${className}`} aria-label="breadcrumb">
      <motion.div
        className="flex gap-1"
        initial="initial"
        animate="animate"
        variants={parentVariants}
      >
        {items.map((item, index) => {
          return (
            <motion.div
              key={index}
              className="flex items-center gap-2"
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
                className="flex items-center justify-center gap-2"
              >
                {/* LOGO */}
                {item.icon ? (
                  <span className="text-slate-400">{item.icon}</span>
                ) : null}

                {/* LINK */}
                {item.href ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <span>{item.label}</span>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </nav>
  );
};
