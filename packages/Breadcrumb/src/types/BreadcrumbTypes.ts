export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export interface BreadcrumbProps {
  mode: "url-based" | "custom";
  items?: BreadcrumbItem[];
  separator?: "chevron" | "slash" | "line" | "custom";
  customSeparator?: React.ReactNode;
  showHome?: boolean;
  homeLabel?: string;
  homeHref?: string;
  variant?: "default" | "pills" | "minimal" | "bordered";
  navClassName?: string;
  crumbClassNames?: string;
  maxItems?: number;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
  collapsible?: boolean;
  noAnimations?: boolean;
}
