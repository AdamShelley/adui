"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative z-10 border border-slate-400 bg-slate-300 flex items-center justify-center self-center w-10 h-10 ml-8 rounded-full"
        aria-label="Loading theme toggle"
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative z-10 border border-slate-400 bg-slate-500 text-slate-950 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 flex items-center justify-center self-center w-10 h-10 ml-1 flex-shrink-0 transition-colors duration-300 ease-in-out rounded-full hover:opacity-90 active:scale-95 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </button>
  );
}
