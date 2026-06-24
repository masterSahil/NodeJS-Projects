const fs = require('fs');
const path = require('path');

const formsDir = path.join(__dirname, 'src', 'components', 'forms');
const files = fs.readdirSync(formsDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    const fullPath = path.join(formsDir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

 
 
 
}
