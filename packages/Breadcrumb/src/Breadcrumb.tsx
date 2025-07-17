import React from "react";
import { BreadcrumbProps } from "./types/BreadcrumbTypes";
import "./Breadcrumb.css";
import { ChevronRight } from "lucide-react";

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
  return (
    <nav className={`breadcrumb ${className}`} aria-label="breadcrumb">
      <div className="flex gap-1">
        {items.map((item, index) => {
          return (
            <>
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
              <div
                key={index}
                className="flex items-center justify-center gap-2"
              >
                {item.icon ? (
                  <span className="text-slate-400">{item.icon}</span>
                ) : null}
                <span>{item.label}</span>
              </div>
            </>
          );
        })}
      </div>

      {/* <div>
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
      </div> */}
    </nav>
  );
};
