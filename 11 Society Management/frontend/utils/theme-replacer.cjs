const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');
const formsPath = path.join(__dirname, 'src', 'components', 'forms');

const replacements = {
    'bg-white': 'bg-cyber-card',
    'text-stone-900': 'text-white',
    'text-stone-800': 'text-white',
    'text-stone-700': 'text-white',
    'text-stone-600': 'text-cyber-muted',
    'text-stone-500': 'text-cyber-muted',
    'text-stone-400': 'text-cyber-muted/70',
    'border-stone-300': 'border-white/20',
    'border-stone-200': 'border-white/10',
    'border-stone-100': 'border-white/5',
    'bg-stone-50': 'bg-white/5',
    'bg-stone-100': 'bg-white/10',
    'hover:bg-stone-50': 'hover:bg-white/5',
    'hover:bg-stone-100': 'hover:bg-white/10',
    'bg-teal-600': 'bg-cyber-primary',
    'hover:bg-teal-700': 'hover:bg-cyber-primary-hover',
    'focus:ring-teal-600': 'focus:ring-cyber-primary',
    'focus:border-teal-600': 'focus:border-transparent',
    'text-teal-600': 'text-cyber-accent',
    'text-teal-700': 'text-cyber-accent',
    'hover:text-teal-700': 'hover:text-cyan-300',
    'hover:text-teal-800': 'hover:text-cyan-300',
    'bg-teal-50': 'bg-cyber-accent/10',
    'hover:bg-teal-100': 'hover:bg-cyber-accent/20',
    'text-emerald-600': 'text-[#10b981]',
    'text-emerald-700': 'text-[#10b981]',
    'bg-emerald-50': 'bg-[#10b981]/10',
    'hover:bg-emerald-100': 'hover:bg-[#10b981]/20',
    'text-rose-600': 'text-[#f43f5e]',
    'text-rose-700': 'text-[#f43f5e]',
    'bg-rose-50': 'bg-[#f43f5e]/10',
    'hover:bg-rose-100': 'hover:bg-[#f43f5e]/20',
    'text-amber-600': 'text-[#f59e0b]',
    'text-amber-700': 'text-[#f59e0b]',
    'bg-amber-50': 'bg-[#f59e0b]/10',
    'hover:bg-amber-100': 'hover:bg-[#f59e0b]/20',
    'bg-blue-50': 'bg-cyber-secondary/10',
    'text-blue-600': 'text-cyber-secondary',
    'text-blue-700': 'text-cyber-secondary',
};

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
            
            for (const [oldClass, newClass] of Object.entries(replacements)) {
 
                const regex = new RegExp(`(?<=['"\\s\`])(${oldClass})(?=['"\\s\`])`, 'g');
                if (regex.test(content)) {
                    content = content.replace(regex, newClass);
                    modified = true;
                }
            }
            
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDirectory(directoryPath);
processDirectory(formsPath);
console.log('Theme replacement complete.');
