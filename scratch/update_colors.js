const fs = require('fs');
const path = require('path');

const ROOT_DIR = '/Users/piotrjuskowiak/Downloads/website-style-improvement';

const mappings = [
  { oldColor: '#0f172a', newColor: '#333d29' },
  { oldColor: '#cbd5e1', newColor: '#d8d3bd' },
  { oldColor: '#f1f5f9', newColor: '#efece0' },
  { oldColor: '#e4e7e1', newColor: '#e8e6d4' },
  { oldColor: '#1d4ed8', newColor: '#414833' },
  { oldColor: '#a8771a', newColor: '#7f4f24' },
  { oldColor: '#7a5611', newColor: '#582f0e' }
];

function processFile(filePath) {
  const absolutePath = path.resolve(filePath);
  const relativePath = path.relative(ROOT_DIR, absolutePath);
  
  const content = fs.readFileSync(absolutePath, 'utf8');
  let newContent = content;

  // Determine which mappings to apply
  let activeMappings = [];
  if (relativePath === 'components/site-footer.tsx') {
    // Only #0f172a -> #333d29 and #cbd5e1 -> #d8d3bd
    activeMappings = [
      { oldColor: '#0f172a', newColor: '#333d29' },
      { oldColor: '#cbd5e1', newColor: '#d8d3bd' }
    ];
  } else {
    activeMappings = mappings;
  }

  for (const mapping of activeMappings) {
    const regex = new RegExp(mapping.oldColor, 'gi');
    newContent = newContent.replace(regex, mapping.newColor);
  }

  if (newContent !== content) {
    fs.writeFileSync(absolutePath, newContent, 'utf8');
    console.log(`Updated: ${relativePath}`);
  }
}

function traverseDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverseDir(fullPath);
    } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
      processFile(fullPath);
    }
  }
}

console.log("Starting color replacement...");
traverseDir(path.join(ROOT_DIR, 'components'));
traverseDir(path.join(ROOT_DIR, 'app'));
console.log("Color replacement completed!");
