// readdir.js
const fs = require("fs");
const path = require("path");

// E'tiborga olinmaydigan papkalar
const IGNORE_DIRS = ["node_modules", "dist", "uploads",".git",".vscode"];

// Papkani rekursiv o‘qish funksiyasi (path bilan)
function readDirectory(dirPath, basePath = dirPath) {
  const structure = [];

  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    if (IGNORE_DIRS.includes(item)) continue;

    const fullPath = path.join(dirPath, item);
    const relativePath = "./" + path.relative(basePath, fullPath).replace(/\\/g, "/"); // Windows uchun `\` → `/`
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      structure.push(...readDirectory(fullPath, basePath)); // rekursiv yuradi
    } else {
      structure.push(relativePath); // faylning nisbiy to‘liq yo‘li
    }
  }

  return structure;
}

// Boshlang'ich papka
const targetPath = process.cwd();
const structure = readDirectory(targetPath);

// JSON faylga yozish
fs.writeFileSync("structure.json", JSON.stringify(structure, null, 2));

console.log("✅ Fayl strukturasi `structure.json` ga yozildi.");



