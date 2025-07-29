import { AppleIcon, Home, Laptop, Store } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { BreadcrumbItem } from "./types/BreadcrumbTypes";

function App() {
  // Sample breadcrumb data for testing
  const sampleItems: BreadcrumbItem[] = [
    { label: "Home", href: "/", icon: <Home /> },
    { label: "Products", href: "/products", icon: <Store /> },
    {
      label: "Electronics",
      href: "/products/electronics",
    },
    {
      label: "Laptops",
      href: "/products/electronics/laptops",
      icon: <Laptop />,
    },
    { label: "MacBook Pro", icon: <AppleIcon /> },
  ];

  const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
    console.log("Clicked breadcrumb:", item, "at index:", index);
  };

  return (
    <div className="w-screen h-screen flex flex-col p-4">
      <header className="text-center mb-4">
        <h1 className="font-bold">Breadcrumb Component Development</h1>
      </header>

      <main className="mt-5">
        <Breadcrumb
          mode="url-based"
          items={sampleItems}
          onItemClick={handleBreadcrumbClick}
          showHome={true}
          // noAnimations={true}
          collapsible={true}
        />
      </main>
    </div>
  );
}

export default App;
