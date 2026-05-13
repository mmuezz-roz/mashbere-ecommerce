import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const photosDir = path.join(__dirname, '..', 'public', 'photos');
const sourcePath = path.join(photosDir, 'ChatGPT Image May 12, 2026, 01_31_49 PM.webp');
const targetPath = path.join(photosDir, 'ChatGPT Image May 12, 2026, 07_22_45 PM.webp');
const outputPath = path.join(photosDir, '07_22_45_PM_resized.webp');

async function run() {
  // Get dimensions of source image (the one we want to match)
  const sourceMeta = await sharp(sourcePath).metadata();
  console.log(`Source (01_31_49 PM): ${sourceMeta.width} x ${sourceMeta.height}`);

  const targetMeta = await sharp(targetPath).metadata();
  console.log(`Target before (07_22_45 PM): ${targetMeta.width} x ${targetMeta.height}`);

  // Resize 07_22_45 PM to match dimensions of 01_31_49 PM (fit: fill to exact size)
  await sharp(targetPath)
    .resize(sourceMeta.width, sourceMeta.height, { fit: 'fill' })
    .webp({ quality: 90 })
    .toFile(outputPath);

  const verifyMeta = await sharp(outputPath).metadata();
  console.log(`Output: ${verifyMeta.width} x ${verifyMeta.height}`);
  console.log('Saved to:', outputPath);
}

run().catch(console.error);
