"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex space-x-2 items-center justify-center ">
      {theme === "dark" && (
        <button
          className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <Sun className="h-4 w-4" />
        </button>
      )}
      {theme === "light" && (
        <button
          className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
