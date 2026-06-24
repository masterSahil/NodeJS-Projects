const fs = require('fs');
const path = require('path');

const formsDir = path.join(__dirname, 'src', 'components', 'forms');
const files = fs.readdirSync(formsDir).filter(f => f.endsWith('.jsx'));

function camelToTitleCase(str) {
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

for (const file of files) {
    const fullPath = path.join(formsDir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

 
 
 
    const tagRegex = /<(input|textarea|select)([^>]*?)>/g;

    content = content.replace(tagRegex, (match, tag, attributes) => {
 
        if (attributes.includes('placeholder=')) {
            return match;
        }
        
 
        if (tag === 'select') return match;
        if (attributes.includes('type="checkbox"') || attributes.includes('type="radio"')) return match;
        if (attributes.includes('type="date"') || attributes.includes('type="time"')) return match;
        
 
        const nameMatch = attributes.match(/name=(['"])(.*?)\1/);
        if (nameMatch && nameMatch[2]) {
            const name = nameMatch[2];
 
            if (name.includes('.')) {
                 return `<${tag}${attributes} placeholder="Enter value..." >`;
            }
            const readableName = camelToTitleCase(name).trim();
            const placeholderStr = ` placeholder="Enter ${readableName.toLowerCase()}..."`;
            
 
            if (match.endsWith('/>')) {
                return `<${tag}${attributes}${placeholderStr} />`;
            } else {
                return `<${tag}${attributes}${placeholderStr}>`;
            }
        }
        return match;
    });

    if (content !== fs.readFileSync(fullPath, 'utf8')) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated placeholders in ${file}`);
    }
}
