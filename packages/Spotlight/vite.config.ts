import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  if (command === "build") {
    return {
      plugins: [react(), tailwindcss()],
      build: {
        outDir: "dist",
        lib: {
          entry: "src/index.ts",
          name: "Spotlight",
          fileName: "spotlight",
          formats: ["es", "cjs"],
        },
      },
    };
  }
  return {
    plugins: [react(), tailwindcss()],
    server: {
      open: true,
    },
  };
});
