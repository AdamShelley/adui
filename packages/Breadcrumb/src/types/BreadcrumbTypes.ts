export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export interface BreadcrumbProps {
  mode: "url-based" | "custom";
  items: BreadcrumbItem[];
  separator?: "chevron" | "slash" | "line" | "custom";
  customSeparator?: React.ReactNode;
  showHome?: boolean;
  homeHref?: string;
  variant?: "default" | "pills" | "minimal" | "bordered";
  size?: "sm" | "md" | "lg";
  className?: string;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
  maxItems?: number;
  collapseFrom?: "start" | "middle";
}
