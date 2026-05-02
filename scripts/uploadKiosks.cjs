const cloudinary = require('cloudinary').v2;
const path = require('path');

cloudinary.config({ 
  cloud_name: 'dblwznybw', 
  api_key: '925413687477348', 
  api_secret: '9mlg6t0Kk0LcD-50LuF8BC9AnE0' 
});

const images = [
  'kiosk 3 2026-04-06 at 10.08.14 PM.jpeg',
  'kiosk 2 2026-04-06 at 10.08.13 PM.jpeg',
  'kiosk 2026-04-06 at 10.08.13 PM.jpeg'
];

async function uploadImages() {
  const results = [];
  for (let i = 0; i < images.length; i++) {
    const filename = images[i];
    const filePath = path.join(__dirname, '..', 'public', 'photos', filename);
    
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'mashbere/equipment',
      });
      console.log(`Uploaded ${filename} -> ${result.secure_url}`);
      results.push({
        name: `Kiosk ${i + 1}`,
        url: result.secure_url
      });
    } catch (err) {
      console.error(`Error uploading ${filename}:`, err.message);
    }
  }
  console.log('--- JSON ---');
  console.log(JSON.stringify(results, null, 2));
}

uploadImages();
