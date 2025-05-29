"use client";

import Link from "next/link";

const components = ["SearchBar"];

const SideBar = () => {
  return (
    <div className="w-[18rem] h-full p-4 border-r border-dotted border-gray-500">
      <h3 className="font-bold mb-4">Components</h3>
      <ul className="mb-4">
        {/* <li>Install</li> */}
        {components.map((post) => (
          <li key={post} className="hover:*:underline">
            <Link href={`/ui/${encodeURIComponent(post)}`}>{post}</Link>
          </li>
        ))}
      </ul>

      <p className="text-gray-500">More will be added as I make them...</p>
    </div>
  );
};

export default SideBar;
