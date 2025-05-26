"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div>
      {/* <button
        className="relative h-8 w-8 rounded-full bg-transparent p-0 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        onClick={() => setTheme("system")}
      >
        <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </button> */}
      <div className="mt-2 flex space-x-2">
        <button
          className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
          onClick={() => setTheme("light")}
        >
          Light
        </button>
        <button
          className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
          onClick={() => setTheme("dark")}
        >
          Dark
        </button>
      </div>
    </div>
  );

  //   return (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button variant="outline" size="icon">
  //           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  //           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  //           <span className="sr-only">Toggle theme</span>
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent align="end">
  //         <DropdownMenuItem onClick={() => setTheme("light")}>
  //           Light
  //         </DropdownMenuItem>
  //         <DropdownMenuItem onClick={() => setTheme("dark")}>
  //           Dark
  //         </DropdownMenuItem>
  //         <DropdownMenuItem onClick={() => setTheme("system")}>
  //           System
  //         </DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   );
}
