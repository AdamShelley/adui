"use client";

import React from "react";
import { useTheme } from "next-themes";

const NoiseBackground = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, systemTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`relative ${className} bg-white`}>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div
      className={`relative ${className} ${
        isDark ? "bg-neutral-950" : "bg-white"
      }`}
    >
      {/* Base background with gradient for dark mode */}
      {isDark && (
        <div
          className="absolute inset-0 w-full h-full
                bg-[radial-gradient(ellipse_90%_80%_at_50%_100%,rgba(120,119,198,0.15),rgba(255,255,255,0.05))]"
        />
      )}

      {/* Light mode noise texture */}
      {!isDark && (
        <div
          className="absolute inset-0 w-full h-full opacity-[8%]"
          style={{
            backgroundImage: `url("/noise-texture.png")`,
            backgroundRepeat: "repeat",
            backgroundSize: "100px",
            mixBlendMode: "multiply",
          }}
        />
      )}

      {/* Dark mode noise texture */}
      {isDark && (
        <div
          className="absolute inset-0 w-full h-full opacity-[15%]"
          style={{
            backgroundImage: `url("/noise-texture.png")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px",
            mixBlendMode: "overlay",
          }}
        />
      )}

      {/* Content container */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default NoiseBackground;
