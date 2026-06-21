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

    // We will match <input ... > and <textarea ... > and <select ... >
    // Because JSX attributes can span multiple lines, we need a robust regex.
    // This regex matches an opening tag name and its attributes up to the > or />
    const tagRegex = /<(input|textarea|select)([^>]*?)>/g;

    content = content.replace(tagRegex, (match, tag, attributes) => {
        // If it already has a placeholder, skip
        if (attributes.includes('placeholder=')) {
            return match;
        }
        
        // Don't add placeholder to select, checkbox, radio, date, time
        if (tag === 'select') return match;
        if (attributes.includes('type="checkbox"') || attributes.includes('type="radio"')) return match;
        if (attributes.includes('type="date"') || attributes.includes('type="time"')) return match;
        
        // Extract name attribute to formulate placeholder
        const nameMatch = attributes.match(/name=(['"])(.*?)\1/);
        if (nameMatch && nameMatch[2]) {
            const name = nameMatch[2];
            // Options array mapping like name={`options.${index}.text`} shouldn't be touched blindly or given "Enter options.0.text..."
            if (name.includes('.')) {
                 return `<${tag}${attributes} placeholder="Enter value..." >`;
            }
            const readableName = camelToTitleCase(name).trim();
            const placeholderStr = ` placeholder="Enter ${readableName.toLowerCase()}..."`;
            
            // Insert placeholder before the closing bracket
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
