const cloudinary = require('cloudinary').v2;
const path = require('path');

cloudinary.config({ 
  cloud_name: 'dblwznybw', 
  api_key: '925413687477348', 
  api_secret: '9mlg6t0Kk0LcD-50LuF8BC9AnE0' 
});

const images = [
  '01 copy.jpg', '02 copy.jpg', '03 copy.jpg', '04 copy.jpg',
  '05 copy.jpg', '06 copy.jpg', '07 copy.jpg', '08 copy.jpg',
  '09 copy.jpg', '10 copy.jpg', '11 copy.jpg'
];

async function uploadImages() {
  const results = [];
  for (let i = 0; i < images.length; i++) {
    const filename = images[i];
    const filePath = path.join(__dirname, '..', 'public', 'photos', filename);
    
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'mashbere/pookies',
      });
      console.log(`Uploaded ${filename} -> ${result.secure_url}`);
      results.push({
        name: `Mini Popsicle ${i + 1}`,
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
