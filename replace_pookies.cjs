const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

try {
  walkDir(path.join(__dirname, 'src'), (filePath) => {
    if (!filePath.match(/\.(tsx|ts|js|json|css|scss|md)$/)) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    if (/pookie/i.test(content)) {
      let newContent = content;
      newContent = newContent.replace(/Pookies/g, 'Pookees');
      newContent = newContent.replace(/pookies/g, 'pookees');
      newContent = newContent.replace(/POOKIES/g, 'POOKEES');
      newContent = newContent.replace(/Pookie/g, 'Pookee');
      newContent = newContent.replace(/pookie/g, 'pookee');
      newContent = newContent.replace(/POOKIE/g, 'POOKEE');
      
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log('Updated', filePath);
      }
    }
  });
} catch (e) {
  console.error('Error:', e.message);
}
