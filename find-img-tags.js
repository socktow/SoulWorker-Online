const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, 'src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith('.js') || filepath.endsWith('.jsx') || filepath.endsWith('.tsx')) {
      callback(filepath);
    }
  });
}

function findImgTagsInFile(filepath) {
  const lines = fs.readFileSync(filepath, 'utf-8').split('\n');
  lines.forEach((line, i) => {
    if (line.includes('<img')) {
      console.log(`${filepath}:${i + 1}: ${line.trim()}`);
    }
  });
}

walk(COMPONENTS_DIR, findImgTagsInFile);
