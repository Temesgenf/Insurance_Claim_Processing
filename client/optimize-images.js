import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(__dirname, 'src', 'assets');
const outputDir = path.join(__dirname, 'src', 'assets', 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(assetsDir);
  
  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    const ext = path.extname(file).toLowerCase();
    
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const outputPath = path.join(outputDir, file.replace(ext, '.webp'));
      
      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .resize(1920, 1080, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .toFile(outputPath);
        
        console.log(`Optimized: ${file} -> ${path.basename(outputPath)}`);
      } catch (error) {
        console.error(`Error optimizing ${file}:`, error);
      }
    }
  }
}

optimizeImages().then(() => {
  console.log('Image optimization complete!');
}).catch(console.error);
