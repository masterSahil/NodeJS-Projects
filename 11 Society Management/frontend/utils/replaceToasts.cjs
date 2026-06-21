const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Replace common patterns
            content = content.replace(/alert\(error\.message\);/g, 'toast.error(error.message);');
            content = content.replace(/alert\((['"`].+?['"`])\);/g, (match, p1) => {
                if (p1.toLowerCase().includes('success') || p1.toLowerCase().includes('generated')) {
                    return `toast.success(${p1});`;
                }
                return `toast.error(${p1});`;
            });

            if (content !== original) {
                // Add import if not present
                if (!content.includes('react-hot-toast')) {
                    const importStatement = "import toast from 'react-hot-toast';\n";
                    
                    const lines = content.split('\n');
                    let importIndex = 0;
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].startsWith('import ')) {
                            importIndex = i + 1;
                        } else if (lines[i].trim() !== '' && !lines[i].startsWith('//')) {
                            break;
                        }
                    }
                    lines.splice(importIndex, 0, importStatement);
                    content = lines.join('\n');
                }
                fs.writeFileSync(fullPath, content);
                console.log('Updated: ' + fullPath);
            }
        }
    }
}

processDir(srcDir);
console.log('Done');
