// Simple script to update sitemap lastmod dates
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Update sitemap.xml with current date
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sitemapPath = join(__dirname, '../public/sitemap.xml');
const currentDate = getCurrentDate();

try {
  const data = await readFile(sitemapPath, 'utf8');
  
  // Update all lastmod dates
  const updatedSitemap = data.replace(
    /<lastmod>.*?<\/lastmod>/g,
    `<lastmod>${currentDate}</lastmod>`
  );

  await writeFile(sitemapPath, updatedSitemap, 'utf8');
  console.log(`Sitemap updated with current date: ${currentDate}`);
} catch (err) {
  console.error('Error updating sitemap:', err);
}