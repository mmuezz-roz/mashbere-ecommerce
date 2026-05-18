import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PHOTOS_DIR = path.resolve('public/photos');
const SRC_DIR = path.resolve('src');

// 1. Convert photos to WebP
async function compressImages() {
  console.log('--- Starting WebP Image Compression ---');
  if (!fs.existsSync(PHOTOS_DIR)) {
    console.error(`Photos directory not found at ${PHOTOS_DIR}`);
    return;
  }

  const files = fs.readdirSync(PHOTOS_DIR);
  const conversionMap = new Map(); // original base filename -> webp base filename

  let totalOriginalSize = 0;
  let totalWebpSize = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const originalPath = path.join(PHOTOS_DIR, file);
      const baseName = path.basename(file, ext);
      const webpFileName = `${baseName}.webp`;
      const webpPath = path.join(PHOTOS_DIR, webpFileName);

      const origStats = fs.statSync(originalPath);
      totalOriginalSize += origStats.size;

      console.log(`Compressing ${file} (${(origStats.size / 1024 / 1024).toFixed(2)} MB)...`);

      try {
        await sharp(originalPath)
          .webp({ quality: 80, effort: 6 })
          .toFile(webpPath);

        const webpStats = fs.statSync(webpPath);
        totalWebpSize += webpStats.size;

        const savings = ((1 - webpStats.size / origStats.size) * 100).toFixed(1);
        console.log(`-> Saved as ${webpFileName} (${(webpStats.size / 1024).toFixed(1)} KB) - Saved ${savings}%`);

        conversionMap.set(file, webpFileName);
      } catch (err) {
        console.error(`Failed to compress ${file}:`, err);
      }
    } else if (ext === '.webp') {
      const webpPath = path.join(PHOTOS_DIR, file);
      const webpStats = fs.statSync(webpPath);
      totalOriginalSize += webpStats.size;
      totalWebpSize += webpStats.size;
    }
  }

  console.log('\n--- Compression Summary ---');
  console.log(`Original Assets Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP Assets Size: ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
  const totalSavings = ((1 - totalWebpSize / totalOriginalSize) * 100).toFixed(1);
  console.log(`Total Storage Savings: ${totalSavings}%\n`);

  return conversionMap;
}

// 2. Rewrite source code references
function updateCodebaseReferences(conversionMap) {
  console.log('--- Scanning Codebase for Image Path Rewrites ---');
  if (conversionMap.size === 0) {
    console.log('No new files were compressed, skipping codebase rewrites.');
    return;
  }

  // Helper to recursively walk a directory
  function walkDir(dir, callback) {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        walkDir(filePath, callback);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.ts' || ext === '.tsx' || ext === '.js' || ext === '.jsx' || ext === '.css') {
          callback(filePath);
        }
      }
    });
  }

  let rewrittenFilesCount = 0;
  let totalReplacementsCount = 0;

  walkDir(SRC_DIR, (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanged = false;

    // Replace occurrences in the file
    conversionMap.forEach((webpName, originalName) => {
      // Find all exact occurrences of the originalName and replace it with webpName
      if (content.includes(originalName)) {
        console.log(`   Replacing "${originalName}" with "${webpName}" in ${path.relative(SRC_DIR, filePath)}`);
        content = content.replaceAll(originalName, webpName);
        hasChanged = true;
        totalReplacementsCount++;
      }
    });

    if (hasChanged) {
      fs.writeFileSync(filePath, content, 'utf8');
      rewrittenFilesCount++;
    }
  });

  console.log('\n--- Codebase Update Summary ---');
  console.log(`Updated files: ${rewrittenFilesCount}`);
  console.log(`Total paths updated: ${totalReplacementsCount}\n`);
}

async function run() {
  const conversionMap = await compressImages();
  if (conversionMap && conversionMap.size > 0) {
    updateCodebaseReferences(conversionMap);
  }
  console.log('Done!');
}

run();
