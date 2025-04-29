import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const isLibraryBuild = process.env.LIB_BUILD === "true";

  if (isLibraryBuild) {
    // Library build configuration
    return {
      plugins: [
        react(),
        // Disabling automatic declaration generation since we're using a custom declaration file
      ],
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          name: "SearchBar",
          fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
          // Make sure all these packages are treated as external
          external: [
            "react",
            "react-dom",
            "react/jsx-runtime",
            "motion",
            "motion/react",
            "motion/react-client",
          ],
          output: {
            // Provide globals for UMD build
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "react/jsx-runtime": "jsxRuntime",
              motion: "motion",
              "motion/react": "motionReact",
              "motion/react-client": "motionReactClient",
            },
            // Make sure to preserve modules for better tree-shaking
            preserveModules: false,
          },
        },
        sourcemap: true,
        cssCodeSplit: false, // Keep CSS in one file
        // Ensure that component doesn't include its own React copy
        commonjsOptions: {
          include: [],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          esmExternals: true,
        },
      },
    };
  }

  // Default development/app build configuration
  return {
    plugins: [react()],
  };
});
