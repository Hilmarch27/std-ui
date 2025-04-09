import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { sync as globSync } from "glob";

// ESM equivalent untuk __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Konfigurasi
const BLOCKS_DIR = path.resolve(__dirname, "src/blocks");
const OUTPUT_FILE = path.resolve(
  __dirname,
  "src/lib/generated-component-map.ts"
);

// Mengambil semua folder blok
const blockItems = globSync(`${BLOCKS_DIR}/*`);

// Header file
let fileContent = `// File ini dibuat secara otomatis oleh script. Jangan edit langsung.
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export const componentMap: Record<string, ComponentType> = {
`;

// Membuat mapping untuk setiap komponen
blockItems.forEach((item) => {
  const stat = fs.statSync(item);
  if (stat.isDirectory()) {
    const folderName = path.basename(item);
    const mainComponentPath = path.join(item, `${folderName}.tsx`);
    if (fs.existsSync(mainComponentPath)) {
      const importPath = `@/blocks/${folderName}/${folderName}`;
      fileContent += `  "${importPath}": dynamic(() => import("${importPath}")),\n`;
    }
  } else if (stat.isFile() && item.endsWith(".tsx")) {
    const fileName = path.basename(item, ".tsx");
    const importPath = `@/blocks/${fileName}`;
    fileContent += `  "${importPath}": dynamic(() => import("${importPath}")),\n`;
  }
});

// Penutup file
fileContent += `};\n`;

// Menulis file output
fs.writeFileSync(OUTPUT_FILE, fileContent);
console.log(`Component map generated at ${OUTPUT_FILE}`);
