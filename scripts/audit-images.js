const fs = require('fs');
const path = require('path');

function getFiles(dir, exts) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        results = results.concat(getFiles(fullPath, exts));
      }
    } else if (exts.some(ext => file.endsWith(ext))) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getFiles('src', ['.tsx', '.ts', '.jsx', '.js']);

const imageUsage = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Match image strings like /images/... or relative or assets
    const lineRegex = /['"`]([a-zA-Z0-9_\-\.\/]+\.(?:jpg|jpeg|png|webp|svg|gif|avif))['"`]/gi;
    let match;
    while ((match = lineRegex.exec(line)) !== null) {
      let imgPath = match[1];
      // Filter out non-images or code expressions that end in extensions mistakenly
      if (!imgPath.includes('/') && !imgPath.includes('\\')) continue;
      
      const cleanPath = imgPath.replace(/\\/g, '/');
      if (!imageUsage[cleanPath]) {
        imageUsage[cleanPath] = [];
      }
      imageUsage[cleanPath].push({
        file: path.relative('.', f).replace(/\\/g, '/'),
        line: idx + 1,
        content: line.trim()
      });
    }
  });
});

console.log('=== ALL IMAGES AND USAGE COUNTS ===\n');
const entries = Object.entries(imageUsage);
entries.sort((a, b) => b[1].length - a[1].length);

const repeated = entries.filter(([img, uses]) => uses.length >= 2);
const single = entries.filter(([img, uses]) => uses.length === 1);

console.log(`Total unique image paths referenced in src: ${entries.length}`);
console.log(`Images used 2 or more times: ${repeated.length}`);
console.log(`Images used only once: ${single.length}\n`);

console.log('--------------------------------------------------');
console.log('REPEATED IMAGES (COUNT >= 2):');
console.log('--------------------------------------------------');
repeated.forEach(([img, uses]) => {
  console.log(`\n[${uses.length}x] ${img}`);
  uses.forEach(u => {
    console.log(`    ${u.file}:${u.line} -> ${u.content.slice(0, 90)}`);
  });
});
