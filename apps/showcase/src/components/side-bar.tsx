"use client";

import Link from "next/link";

const components = ["search-bar"];

const SideBar = () => {
  return (
    <div className="w-[15rem] border-r h-full p-2">
      <div>Components</div>
      <ul>
        <li>Install</li>

        {components.map((post) => (
          <li key={post}>
            <Link href={`/ui/${encodeURIComponent(post)}`}>{post}</Link>
          </li>
        ))}
      </ul>

      <p className="text-gray-500">More will be added as I make them...</p>
    </div>
  );
};

export default SideBar;
