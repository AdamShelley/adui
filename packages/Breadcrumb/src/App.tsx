import { Home } from "lucide-react";
import "./App.css";
import { Breadcrumb } from "./Breadcrumb";
import { BreadcrumbItem } from "./types/BreadcrumbTypes";

function App() {
  // Sample breadcrumb data for testing
  const sampleItems: BreadcrumbItem[] = [
    { label: "Home", href: "/", icon: <Home /> },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" },
    { label: "Laptops", href: "/products/electronics/laptops" },
    { label: "MacBook Pro" },
  ];

  const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
    console.log("Clicked breadcrumb:", item, "at index:", index);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Breadcrumb Component Development</h1>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <h2>Your Breadcrumb Component</h2>
          <div className="demo-container">
            <Breadcrumb
              items={sampleItems}
              onItemClick={handleBreadcrumbClick}
            />
          </div>
        </section>

        <section className="props-section">
          <h3>Available Props to Work With:</h3>
          <ul>
            <li>
              <code>items</code> - Array of breadcrumb items
            </li>
            <li>
              <code>separator</code> - 'chevron' | 'slash' | 'arrow' | 'custom'
            </li>
            <li>
              <code>variant</code> - 'default' | 'pills' | 'minimal' |
              'bordered'
            </li>
            <li>
              <code>size</code> - 'sm' | 'md' | 'lg'
            </li>
            <li>
              <code>showHome</code> - boolean
            </li>
            <li>
              <code>maxItems</code> - number (for collapsing)
            </li>
            <li>
              <code>onItemClick</code> - callback function
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
