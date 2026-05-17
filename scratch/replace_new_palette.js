const fs = require('fs');
const path = require('path');

const colorMap = {
  // Najciemniejsze (foreground, teksty, mocne tła) -> pine-teal
  '#333d29': '#344e41',
  '33, 61, 41': '52, 78, 65',
  
  // Ciemne zielenio-brązy -> hunter-green
  '#414833': '#3a5a40',
  '#582f0e': '#3a5a40',
  
  // Środkowe tony (akcenty, linki) -> fern
  '#656d4a': '#588157',
  '#7f4f24': '#588157',
  
  // Jaśniejsze akcenty -> dry-sage
  '#936639': '#a3b18a',
  '#a68a64': '#a3b18a',
  '#a4ac86': '#a3b18a',
  '#c2c5aa': '#a3b18a',
  '#e8e6d4': '#a3b18a',
  
  // Tła i szarości -> dust-grey
  '#d8d3bd': '#dad7cd',
  '#b6ad90': '#dad7cd',
  '#efece0': '#dad7cd',
  '#f6f3e9': '#dad7cd',
  '#fbf9f1': '#dad7cd'
};

const directories = ['app', 'components', 'lib'];
const extensions = ['.ts', '.tsx', '.css'];

function traverseDir(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      traverseDir(fullPath);
    } else if (entry.isFile() && extensions.includes(path.extname(entry.name))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      for (const [oldColor, newColor] of Object.entries(colorMap)) {
        // Create regex to match case-insensitive
        const regex = new RegExp(oldColor, 'gi');
        if (regex.test(content)) {
          content = content.replace(regex, newColor);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

directories.forEach(dir => {
  const fullPath = path.join('/Users/piotrjuskowiak/Downloads/website-style-improvement', dir);
  if (fs.existsSync(fullPath)) {
    traverseDir(fullPath);
  }
});
console.log('Color replacement complete.');
