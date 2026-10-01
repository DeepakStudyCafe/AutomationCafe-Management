const fs = require('fs');
const path = require('path');

const files = [
  'src/components/automationcafe/Hero.tsx',
  'src/components/automationcafe/Header.tsx',
  'src/components/automationcafe/Features.tsx',
  'src/components/automationcafe/CategoryStrip.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/-red-/g, '-blue-');
    content = content.replace(/text-red/g, 'text-blue');
    content = content.replace(/bg-red/g, 'bg-blue');
    content = content.replace(/border-red/g, 'border-blue');
    content = content.replace(/shadow-red/g, 'shadow-blue');
    fs.writeFileSync(filePath, content);
    console.log(`Replaced colors in ${file}`);
  }
});
