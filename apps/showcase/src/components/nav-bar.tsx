"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
import { SearchBar } from "./SearchBar/SearchBar";
import { useTheme } from "next-themes";

const navLinks = [{ href: "/components", label: "Components" }];

export function NavBar({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const { theme } = useTheme();

  return (
    <nav
      className={cn(
        "w-full border-b border-dotted border-gray-500 ",
        className
      )}
    >
      <div className="w-full flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-lg">
          A/UI
        </Link>
        <div className="hidden md:flex gap-4 items-center justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

          <ModeToggle />
          <SearchBar darkMode={theme === "dark"} noOpenAnimation />
        </div>

        <div className="md:hidden">
          t-me{" "}
          <button onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container flex flex-col gap-2 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
