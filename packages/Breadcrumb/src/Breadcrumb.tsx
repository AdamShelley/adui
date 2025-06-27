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
    <div className={`breadcrumb ${className}`}>
      <div>
        Home
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              className={`breadcrumb-item ${item.isActive ? "active" : ""}`}
              onClick={() => onItemClick && onItemClick(item, index)}
            >
              {item.icon && (
                <span className="breadcrumb-icon">{item.icon}</span>
              )}
              {item.href ? (
                <a href={item.href} className="breadcrumb-link">
                  {item.label}
                </a>
              ) : (
                <span className="breadcrumb-label">{item.label}</span>
              )}
              {index < items.length - 1 && (
                <span className={`breadcrumb-separator ${separator}`}>
                  {customSeparator || ">"}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
