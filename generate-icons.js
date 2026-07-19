import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'fs';
import path from 'path';

const SRC_SVG = 'public/assets/logo.svg';

const filesToDelete = [
  'public/favicon.ico',
  'public/favicon.svg',
  'public/apple-touch-icon.png',
  'public/favicon-16x16.png',
  'public/favicon-32x32.png',
  'public/android-chrome-48x48.png',
  'public/android-chrome-64x64.png',
  'public/android-chrome-96x96.png',
  'public/android-chrome-128x128.png',
  'public/android-chrome-192x192.png',
  'public/android-chrome-256x256.png',
  'public/android-chrome-384x384.png',
  'public/android-chrome-512x512.png',
  'public/android-chrome-1024x1024.png',
  'public/logo.png',
  'public/logo.svg',
  'public/assets/logo.png'
];

const pngSizes = {
  '48': 'public/android-chrome-48x48.png',
  '64': 'public/android-chrome-64x64.png',
  '96': 'public/android-chrome-96x96.png',
  '128': 'public/android-chrome-128x128.png',
  '180': 'public/apple-touch-icon.png',
  '192': 'public/android-chrome-192x192.png',
  '256': 'public/android-chrome-256x256.png',
  '384': 'public/android-chrome-384x384.png',
  '512': 'public/android-chrome-512x512.png',
  '1024': 'public/android-chrome-1024x1024.png',
  '512_logo': 'public/logo.png',
  '512_assets_logo': 'public/assets/logo.png'
};

async function generate() {
  console.log('--- ICON PACK GENERATION START ---');
  
  if (!fs.existsSync(SRC_SVG)) {
    throw new Error(`Source SVG not found at: ${SRC_SVG}`);
  }

  // 1. Delete existing icons to prevent cached or broken data
  console.log('Deleting existing icons...');
  for (const file of filesToDelete) {
    if (fs.existsSync(file)) {
      try {
        fs.unlinkSync(file);
        console.log(`Deleted: ${file}`);
      } catch (err) {
        console.error(`Error deleting ${file}:`, err.message);
      }
    }
  }

  // 2. Generate PNGs from the vector SVG
  console.log('Generating PNG sizes...');
  for (const [sizeStr, filePath] of Object.entries(pngSizes)) {
    const size = parseInt(sizeStr.split('_')[0], 10);
    const parentDir = path.dirname(filePath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    
    await sharp(SRC_SVG)
      .resize(size, size)
      .toFile(filePath);
    
    const stats = fs.statSync(filePath);
    console.log(`Generated: ${filePath} (${(stats.size / 1024).toFixed(2)} KB)`);
  }

  // 3. Create SVG references
  console.log('Copying SVG references...');
  fs.copyFileSync(SRC_SVG, 'public/logo.svg');
  console.log('Generated: public/logo.svg');

  // 4. Generate multi-resolution ICO file using temporary resized PNGs
  console.log('Compiling favicon.ico...');
  const temp16 = 'public/temp-favicon-16.png';
  const temp32 = 'public/temp-favicon-32.png';
  
  await sharp(SRC_SVG).resize(16, 16).toFile(temp16);
  await sharp(SRC_SVG).resize(32, 32).toFile(temp32);

  const icoBuffer = await pngToIco([
    temp16,
    temp32,
    'public/android-chrome-48x48.png'
  ]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  
  // Clean up temporary PNGs
  fs.unlinkSync(temp16);
  fs.unlinkSync(temp32);
  
  const icoStats = fs.statSync('public/favicon.ico');
  console.log(`Generated: public/favicon.ico (${(icoStats.size / 1024).toFixed(2)} KB)`);

  // 5. Verification check
  console.log('\n--- VERIFICATION CHECKS ---');
  let failures = 0;
  
  const verifiedFiles = [
    'public/favicon.ico',
    'public/apple-touch-icon.png',
    'public/android-chrome-48x48.png',
    'public/android-chrome-64x64.png',
    'public/android-chrome-96x96.png',
    'public/android-chrome-128x128.png',
    'public/android-chrome-192x192.png',
    'public/android-chrome-256x256.png',
    'public/android-chrome-384x384.png',
    'public/android-chrome-512x512.png',
    'public/android-chrome-1024x1024.png',
    'public/logo.png',
    'public/logo.svg',
    'public/assets/logo.png'
  ];
  
  for (const file of verifiedFiles) {
    if (!fs.existsSync(file)) {
      console.error(`❌ Missing file: ${file}`);
      failures++;
      continue;
    }
    const stats = fs.statSync(file);
    if (stats.size === 0) {
      console.error(`❌ Empty file (0 bytes): ${file}`);
      failures++;
    } else if (stats.size < 1024 && !file.includes('16x16') && !file.includes('svg')) {
      console.warn(`⚠️ Small file size: ${file} is ${(stats.size / 1024).toFixed(2)} KB`);
    } else {
      console.log(`✅ Verified: ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    }
  }

  if (failures > 0) {
    throw new Error(`Verification failed with ${failures} errors.`);
  }

  console.log('--- ICON PACK GENERATED SUCCESSFULLY ---');
}

generate().catch(err => {
  console.error('Fatal error during generation:', err);
  process.exit(1);
});
