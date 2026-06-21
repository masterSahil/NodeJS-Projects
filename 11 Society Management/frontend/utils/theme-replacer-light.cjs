const fs = require('fs');
const path = require('path');

const targets = [
    path.join(__dirname, 'src', 'pages'),
    path.join(__dirname, 'src', 'components'),
    path.join(__dirname, 'src', 'layouts'),
];

const replacements = [
    { regex: /(?<=['"\s`])text-white(?=['"\s`])/g, replace: 'text-cyber-text' },
    { regex: /(?<=['"\s`])border-white\/5(?=['"\s`])/g, replace: 'border-border' },
    { regex: /(?<=['"\s`])border-white\/10(?=['"\s`])/g, replace: 'border-border' },
    { regex: /(?<=['"\s`])border-white\/20(?=['"\s`])/g, replace: 'border-border' },
    { regex: /(?<=['"\s`])bg-white\/5(?=['"\s`])/g, replace: 'bg-cyber-text/5' },
    { regex: /(?<=['"\s`])bg-white\/10(?=['"\s`])/g, replace: 'bg-cyber-text/10' },
    { regex: /(?<=['"\s`])hover:bg-white\/5(?=['"\s`])/g, replace: 'hover:bg-cyber-text/5' },
    { regex: /(?<=['"\s`])hover:bg-white\/10(?=['"\s`])/g, replace: 'hover:bg-cyber-text/10' },
    { regex: /(?<=['"\s`])hover:border-white\/10(?=['"\s`])/g, replace: 'hover:border-border' },
    { regex: /(?<=['"\s`])hover:border-white\/20(?=['"\s`])/g, replace: 'hover:border-border' },
];

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            for (const { regex, replace } of replacements) {
                if (regex.test(content)) {
                    content = content.replace(regex, replace);
                    modified = true;
                }
            }
            
            // Revert text-cyber-text back to text-white if it's inside a button or bg-cyber-primary
            // This is a bit manual, but we can do a simple global replace for common button patterns
            if (modified) {
                // Example: bg-cyber-primary text-cyber-text -> bg-cyber-primary text-white
                content = content.replace(/bg-cyber-primary([a-zA-Z0-9\s-]*?)text-cyber-text/g, 'bg-cyber-primary$1text-white');
                content = content.replace(/text-cyber-text([a-zA-Z0-9\s-]*?)bg-cyber-primary/g, 'text-white$1bg-cyber-primary');
                
                // Same for emerald, rose, amber, teal
                const colors = ['#10b981', '#f43f5e', '#f59e0b', 'cyber-accent', 'cyber-secondary'];
                for (const c of colors) {
                    const bgClass = `bg-\\[${c}\\]`;
                    const bgClassPlain = `bg-${c}`;
                    const re1 = new RegExp(`(${bgClass}|${bgClassPlain})([a-zA-Z0-9\\s-]*?)text-cyber-text`, 'g');
                    const re2 = new RegExp(`text-cyber-text([a-zA-Z0-9\\s-]*?)(${bgClass}|${bgClassPlain})`, 'g');
                    content = content.replace(re1, `$1$2text-white`);
                    content = content.replace(re2, `text-white$1$2`);
                }

                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

for (const target of targets) {
    processDirectory(target);
}
console.log('Light theme class replacement complete.');
