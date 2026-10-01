const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/user/Desktop/AutomationCafe Management/Automation_Cafe_Main_Site/Automation_Cafe_Main_Site/Views/Home';
const destDir = 'c:/Users/user/Desktop/AutomationCafe Management/StudyCafeTools_NextJS/frontend/src/app';

const pagesToMigrate = [
  { file: 'About.cshtml', route: 'about' },
  { file: 'Disclaimer.cshtml', route: 'disclaimer' },
  { file: 'Ethics.cshtml', route: 'ethics' },
  { file: 'HowToUse.cshtml', route: 'how-to-use' },
  { file: 'Privacy.cshtml', route: 'privacy' },
  { file: 'Refund.cshtml', route: 'refund' },
  { file: 'Services.cshtml', route: 'services' },
  { file: 'Terms.cshtml', route: 'terms' }
];

function sanitizeHtmlForJsx(html) {
  return html
    .replace(/@{\s*[\s\S]*?\s*}/g, '') // Remove Razor blocks
    .replace(/@model.*/g, '') // Remove model declaration
    .replace(/@ViewData\[.*?\]/g, '""')
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/<br>/g, '<br />')
    .replace(/<hr>/g, '<hr />')
    .replace(/<img(.*?)>/g, (match, p1) => {
        if(p1.endsWith('/')) return match;
        return `<img${p1} />`;
    })
    .replace(/<input(.*?)>/g, (match, p1) => {
        if(p1.endsWith('/')) return match;
        return `<input${p1} />`;
    })
    .replace(/@RenderBody\(\)/g, '')
    .replace(/@/g, '') // Remove leftover @ symbols
    .replace(/style="([^"]*)"/g, '') // Strip inline styles temporarily for safety
    .trim();
}

for (const page of pagesToMigrate) {
  const srcPath = path.join(srcDir, page.file);
  if (!fs.existsSync(srcPath)) {
    console.log(`Skipping ${page.file} - not found`);
    continue;
  }
  
  let content = fs.readFileSync(srcPath, 'utf8');
  content = sanitizeHtmlForJsx(content);
  
  // Wrap in React component
  const componentName = page.route.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Page';
  
  const tsxContent = `'use client';

export default function ${componentName}() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 prose prose-slate max-w-none">
      ${content}
    </div>
  );
}
`;

  const pageDir = path.join(destDir, page.route);
  if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });
  
  fs.writeFileSync(path.join(pageDir, 'page.tsx'), tsxContent);
  console.log(`Migrated ${page.file} -> ${page.route}/page.tsx`);
}
