"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function NavBar({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <nav
      className={cn(
        "w-full border-b dark:bg-background/95 dark:backdrop-blur dark:supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="w-full flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-lg">
          adamui
        </Link>
        <div className="hidden md:flex gap-6 align-center justify-center">
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
        </div>

        <div className="md:hidden">
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
