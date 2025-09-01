import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  if (command === "build") {
    return {
      plugins: [react()],
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
    plugins: [react()],
    server: {
      open: true,
    },
  };
});
