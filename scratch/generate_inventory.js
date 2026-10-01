const fs = require('fs');
const path = require('path');

const viewsDir = 'c:\\Users\\user\\Desktop\\AutomationCafe Management\\Automation_Cafe_Main_Site\\Automation_Cafe_Main_Site\\Views';
const outputInventory = 'c:\\Users\\user\\Desktop\\AutomationCafe Management\\StudyCafeTools_NextJS\\docs\\AUTOMATIONCAFE_WEBSITE_CONTENT_INVENTORY.md';
const outputMatrix = 'c:\\Users\\user\\Desktop\\AutomationCafe Management\\StudyCafeTools_NextJS\\docs\\AUTOMATIONCAFE_CONTENT_PARITY_MATRIX.md';

function scanDirectory(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            scanDirectory(filePath, fileList);
        } else if (filePath.endsWith('.cshtml')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const files = scanDirectory(viewsDir);

let inventoryMd = `# AutomationCafe Website Content Inventory\n\n`;
let matrixMd = `# AutomationCafe Content Parity Matrix\n\n| Original Page | New Route | Sections Parity | Content Parity | Assets Parity | Functional Parity | Status |\n|---|---|---|---|---|---|---|\n`;

for (const file of files) {
    const relativePath = path.relative(viewsDir, file);
    const content = fs.readFileSync(file, 'utf-8');
    
    // Extract title (usually ViewBag.Title)
    const titleMatch = content.match(/ViewBag\.Title\s*=\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : path.basename(file, '.cshtml');
    
    // Guess original URL
    let url = '/' + relativePath.replace(/\\/g, '/').replace('.cshtml', '');
    if (url.endsWith('Index')) {
        url = url.replace('/Index', '/');
    }
    if (url.startsWith('/Home/')) {
        url = url.replace('/Home/', '/');
    }
    if (url === '/Home' || url === '/Shared/_Layout') continue; // Skip layout
    
    // Naive section extraction by h1/h2/h3 or section tags
    const sections = [];
    const sectionRegex = /<section[^>]*>([\s\S]*?)<\/section>|<h[1-3][^>]*>(.*?)<\/h[1-3]>/g;
    let match;
    while ((match = sectionRegex.exec(content)) !== null) {
        if (match[2]) {
            sections.push(match[2].replace(/<[^>]*>?/gm, '').trim());
        } else {
            sections.push("Section tag");
        }
    }
    
    // Naive image extraction
    const images = [];
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    while ((match = imgRegex.exec(content)) !== null) {
        images.push(match[1]);
    }

    // Naive button/link extraction
    const buttons = [];
    const btnRegex = /<a[^>]+href="([^">]+)"[^>]*>([\s\S]*?)<\/a>|<button[^>]*>([\s\S]*?)<\/button>/g;
    while ((match = btnRegex.exec(content)) !== null) {
        let text = ((match[2] || '') + (match[3] || '')).replace(/<[^>]*>?/gm, '').trim();
        let href = match[1] || 'button action';
        if (text) buttons.push(`[${text}] -> ${href}`);
    }

    inventoryMd += `## Page: ${title}\n\n`;
    inventoryMd += `| Field | Details |\n|---|---|\n`;
    inventoryMd += `| **Original URL** | \`${url}\` |\n`;
    inventoryMd += `| **Page name** | ${title} (${relativePath}) |\n`;
    inventoryMd += `| **Sections** | ${sections.slice(0, 5).join(', ') || 'None'} |\n`;
    inventoryMd += `| **Content source** | Hardcoded HTML / Razor Model |\n`;
    inventoryMd += `| **Images/videos** | ${images.slice(0, 5).join(', ') || 'None'} |\n`;
    inventoryMd += `| **Buttons/Links** | ${buttons.slice(0, 5).join('<br>') || 'None'} |\n`;
    inventoryMd += `| **SEO** | Title: ${title} |\n`;
    inventoryMd += `| **New route** | \`${url.toLowerCase()}\` |\n`;
    inventoryMd += `| **Verification** | Pending |\n\n`;
    
    matrixMd += `| ${title} | \`${url.toLowerCase()}\` | ❌ | ❌ | ❌ | ❌ | ⏳ Pending |\n`;
}

fs.mkdirSync(path.dirname(outputInventory), { recursive: true });
fs.writeFileSync(outputInventory, inventoryMd);
fs.writeFileSync(outputMatrix, matrixMd);
console.log('Generated docs successfully.');
