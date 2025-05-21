import fs from 'fs';
import path from 'path';
import { Item } from './types';
import { getPapersSortedByIlyaList } from './data';

// Ensure the directory exists
function ensureDirectoryExists(filePath: string): void {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

// Export papers as JSON
export async function exportPapersAsJSON(outputPath: string): Promise<void> {
  const papers = await getPapersSortedByIlyaList();
  const jsonContent = JSON.stringify(papers, null, 2);
  
  ensureDirectoryExists(outputPath);
  fs.writeFileSync(outputPath, jsonContent);
  console.log(`JSON exported to ${outputPath}`);
}

// Export papers as CSV
export async function exportPapersAsCSV(outputPath: string): Promise<void> {
  const papers = await getPapersSortedByIlyaList();
  
  // Create CSV header
  const headers = ['order', 'date', 'title', 'authors', 'link'];
  let csvContent = headers.join(',') + '\n';
  
  // Add each paper as a row
  papers.forEach(paper => {
    // Escape fields that might contain commas
    const escapedTitle = `"${paper.title.replace(/"/g, '""')}"`;
    const escapedAuthors = `"${paper.authors ? paper.authors.replace(/"/g, '""') : ''}"`;
    
    const row = [
      paper.order,
      paper.date,
      escapedTitle,
      escapedAuthors,
      paper.link
    ].join(',');
    
    csvContent += row + '\n';
  });
  
  ensureDirectoryExists(outputPath);
  fs.writeFileSync(outputPath, csvContent);
  console.log(`CSV exported to ${outputPath}`);
} 