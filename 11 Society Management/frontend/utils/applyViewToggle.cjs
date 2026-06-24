const fs = require('fs');
const path = require('path');

const pagesDir = path.join(process.cwd(), 'src', 'pages');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('List.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

 
            if (!content.includes('ViewToggle')) {
                const importMatch = content.match(/import DataTable from .*?;/);
                if (importMatch) {
                    content = content.replace(importMatch[0], `${importMatch[0]}\nimport ViewToggle from "../../components/shared/ViewToggle";`);
                }
            }

 
            if (!content.includes('const [viewMode, setViewMode] = useState')) {
 
                const stateMatch = content.match(/const \[isLoading, setIsLoading\] = useState\(true\);/);
                if (stateMatch) {
                    content = content.replace(stateMatch[0], `${stateMatch[0]}\n    const [viewMode, setViewMode] = useState('table');`);
                } else {
 
                    const pageMatch = content.match(/usePagination\(.*?\);/);
                    if (pageMatch) {
                        content = content.replace(pageMatch[0], `${pageMatch[0]}\n    const [viewMode, setViewMode] = useState('table');`);
                    }
                }
            }

 
            if (!content.includes('<ViewToggle')) {
 
 
                const filterMatch = content.match(/(<FilterDropdown[\s\S]*?\/>\s*)(<\/div>)/);
                if (filterMatch) {
                    content = content.replace(/(<FilterDropdown[\s\S]*?\/>\s*)(<\/div>)/, `$1<ViewToggle viewMode={viewMode} setViewMode={setViewMode} />\n                    $2`);
                } else {
 
                    const headerMatch = content.match(/(<PageHeader[\s\S]*?\/>)/);
                    if (headerMatch && !content.includes('FilterDropdown')) {
                         content = content.replace(/(<PageHeader[\s\S]*?\/>)/, `$1\n                <div className="flex mb-6 justify-end">\n                    <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />\n                </div>`);
                    }
                }
            }

 
            if (content.includes('<DataTable') && !content.includes('viewMode={viewMode}')) {
                content = content.replace(/<DataTable/g, '<DataTable viewMode={viewMode}');
            }

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated: ' + fullPath);
            }
        }
    }
}

processDir(pagesDir);
console.log('Done');
