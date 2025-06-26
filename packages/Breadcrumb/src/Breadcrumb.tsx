import React from "react";
import { BreadcrumbProps } from "./types/BreadcrumbTypes";
import "./Breadcrumb.css";

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
  return (
    <nav className={`breadcrumb ${className}`}>
      <div>Items: {JSON.stringify(items)}</div>
    </nav>
  );
};
