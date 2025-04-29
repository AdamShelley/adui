import fs from 'fs';
import path from 'path';

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy our custom declaration file to dist/index.d.ts
fs.copyFileSync(
  path.resolve('src', 'types', 'searchbar.d.ts'),
  path.resolve('dist', 'index.d.ts')
);

console.log('✅ TypeScript declarations copied successfully!');