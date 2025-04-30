import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const isLibraryBuild = process.env.LIB_BUILD === "true";

  if (isLibraryBuild) {
    return {
      plugins: [
        react(), 
        tailwindcss(),
        dts({
          include: ['src/index.ts', 'src/SearchBar.tsx', 'src/types/**/*.ts'],
          exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx', 'src/main.tsx', 'src/App.tsx'],
          insertTypesEntry: true,
          rollupTypes: true,
          copyDtsFiles: true
        })
      ],
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          name: "SearchBar",
          fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
          external: [
            "react",
            "react-dom",
            "react/jsx-runtime",
            "motion",
            "motion/react",
            "motion/react-client",
          ],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "react/jsx-runtime": "jsxRuntime",
              motion: "motion",
              "motion/react": "motionReact",
              "motion/react-client": "motionReactClient",
            },
            preserveModules: false,
            exports: "named", // Add this line to fix the warning
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === "style.css") return "searchbar.css";
              return assetInfo.name || "assets/[name]-[hash][extname]";
            },
          },
        },
        sourcemap: true,
        cssCodeSplit: true,
        commonjsOptions: {
          include: [],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          esmExternals: true,
        },
      },
    };
  }

  return {
    plugins: [react(), tailwindcss()],
  };
});
