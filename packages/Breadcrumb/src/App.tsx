import { AppleIcon, Home, Laptop, Store } from "lucide-react";
import { Breadcrumb, LineSeparator } from "./Breadcrumb";
import { BreadcrumbItem } from "./types/BreadcrumbTypes";

function App() {
  // Sample breadcrumb data for testing
  const sampleItems: BreadcrumbItem[] = [
    { label: "Home", href: "/", icon: <Home /> },
    { label: "Products", href: "/products", icon: <Store /> },
    {
      label: "Electronics",
      href: "/products/electronics",
      icon: <LineSeparator />,
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
    <html>
      <div className="w-screen h-screen flex flex-col p-4 dark dark:bg-gray-950">
        <header className="text-center mb-4">
          <h1 className="font-bold dark:text-white">
            Breadcrumb Component Development
          </h1>
        </header>

        <main className="mt-5">
          <Breadcrumb
            mode="url"
            // mode="custom"
            // items={sampleItems}
            onItemClick={handleBreadcrumbClick}
            showHome={true}
            homeLabel="Home"
            // navClassName="bg-gray-100 p-2 rounded shadow"
            // crumbClassNames="text-red-500 hover:text-red-700 transition-colors"
            // noAnimations={true}
            separator="chevron"
            maxItems={10}
            variant="default"
            collapsible={false}
          />
        </main>
      </div>
    </html>
  );
}

export default App;
