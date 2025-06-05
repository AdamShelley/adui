const install = {
  code: `bun add motion clsx tailwind-merge`,
  language: "tsx",
  title: "Install dependencies",
};

const tailwindMerge = {
  code: `import { twMerge } from 'tailwind-merge';`,
  language: "tsx",
  title: "Add tailwind merge util",
};

const sourceCode = {
  language: "tsx",
  title: "Copy source code into your project",
  code: `code here`,
};

export const searchBarSnippets = [install, tailwindMerge, sourceCode];
