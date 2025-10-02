import { useSpotlight } from "./Spotlight";

// Realistic layout example with normal components
const RealisticLayoutExample = () => {
  const spotlightGroup = useSpotlight({
    highlightOnHover: true,
    items: {
      logo: {
        id: "logo",
        component: (
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              Logo
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Click here to return home
            </p>
          </div>
        ),
      },
      searchBar: {
        id: "searchBar",
        component: (
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              Search
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Search for products, categories, or content
            </p>
          </div>
        ),
      },
      cart: {
        id: "cart",
        component: (
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              Shopping Cart
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              View your cart items and checkout
            </p>
          </div>
        ),
      },
      profile: {
        id: "profile",
        component: (
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              Profile
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your account settings
            </p>
          </div>
        ),
      },
      sidebarItem: {
        id: "sidebarItem",
        component: (
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              Navigation Menu
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Browse through different sections
            </p>
          </div>
        ),
      },
    },
  });

  return (
    <div className="mt-8 w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Realistic Layout Example</h2>
      <p className="text-gray-400 text-sm mb-4">
        See how it works with typical UI components
      </p>

      {/* Header */}
      <header className="bg-gray-800 p-4 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            ref={spotlightGroup.getRef("logo")}
            className="text-xl font-bold cursor-pointer hover:text-blue-400 transition-colors"
          >
            MyApp
          </div>

          {/* Search Bar */}
          <div ref={spotlightGroup.getRef("searchBar")} className="flex-1 mx-8">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              ref={spotlightGroup.getRef("cart")}
              className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cart (3)
            </button>
            <button
              ref={spotlightGroup.getRef("profile")}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Profile
            </button>
          </div>
        </div>
      </header>

      {/* Content Area with Sidebar */}
      <div className="flex gap-4">
        {/* Sidebar */}
        <aside className="bg-gray-800 p-4 rounded-lg w-48">
          <nav>
            <ul className="space-y-2">
              <li
                ref={spotlightGroup.getRef("sidebarItem")}
                className="cursor-pointer hover:bg-gray-700 p-2 rounded transition-colors"
              >
                Dashboard
              </li>
              <li className="cursor-pointer hover:bg-gray-700 p-2 rounded transition-colors">
                Products
              </li>
              <li className="cursor-pointer hover:bg-gray-700 p-2 rounded transition-colors">
                Orders
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Main Content Area</h3>
          <p className="text-gray-400">
            Hover over the header elements or sidebar to see spotlights in
            action!
          </p>
        </main>
      </div>
    </div>
  );
};

// Simple single element example
const SingleElementExample = () => {
  const spotlight = useSpotlight({
    highlightOnHover: true,
    component: (
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white mb-2">
          Single Element Spotlight
        </h4>
        <p className="text-gray-600 dark:text-gray-300">
          This is the easiest way to add a spotlight to a single element!
        </p>
      </div>
    ),
  });

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Single Element Mode</h2>
      <button
        ref={spotlight.ref}
        className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Hover me!
      </button>
      <p className="text-gray-400 text-sm mt-2">
        Simple single element with just <code>ref</code>
      </p>
    </div>
  );
};

export function TestComponent() {
  return (
    <div className="dark:bg-gray-950 w-screen h-screen text-white flex items-center justify-start flex-col gap-10 p-10 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8">Spotlight Demo</h1>

      <SingleElementExample />

      <RealisticLayoutExample />

      <div className="mt-8 text-center">
        <p className="text-gray-300 mb-4">
          Sample content to demonstrate outside visibility
        </p>
        <div className="grid grid-cols-4 gap-4 text-sm">
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="bg-gray-800 p-3 rounded">
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
