import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const photosDir = path.join(__dirname, '..', 'public', 'photos');
const kioskPath = path.join(photosDir, 'ChatGPT Image May 12, 2026, 07_22_45 PM.webp');
const iceCupPath = path.join(photosDir, 'ChatGPT Image May 12, 2026, 01_31_49 PM.webp');

const kioskOut = path.join(photosDir, 'kiosk_out.webp');
const iceCupOut = path.join(photosDir, 'icecup_out.webp');

async function run() {
  const targetWidth = 1527;
  const targetHeight = 1030;

  // Restore kiosk image to 1527x1030 (stretch it back to original)
  await sharp(kioskPath)
    .resize(targetWidth, targetHeight, { fit: 'fill' })
    .webp({ quality: 90 })
    .toFile(kioskOut);
    
  console.log(`Resized Kiosk to ${targetWidth}x${targetHeight}`);

  // Expand ice cup image to 1527x1030 (crop to keep aspect ratio)
  await sharp(iceCupPath)
    .resize(targetWidth, targetHeight, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(iceCupOut);

  console.log(`Resized Ice Cup to ${targetWidth}x${targetHeight}`);
}

run().catch(console.error);
