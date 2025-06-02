"use client";

import Link from "next/link";

const components = ["SearchBar"];

const SideBar = () => {
  return (
    <div className="w-[18rem] h-full p-5 border-r border-dotted border-gray-500">
      <h3 className="font-bold mb-4">Components</h3>
      <ul className="">
        {/* <li>Install</li> */}
        {components.map((post) => (
          <li
            key={post}
            className="text-gray-300 hover:text-gray-400 transition-colors py-1"
          >
            <Link href={`/ui/${encodeURIComponent(post)}`}>{post}</Link>
          </li>
        ))}
      </ul>

      <p className="text-gray-500">More to come...</p>
    </div>
  );
};

export default SideBar;
