import path from 'path';
import { exportPapersAsJSON, exportPapersAsCSV } from '@/lib/export';

async function main() {
  try {
    // Define output paths
    const outputDir = path.join(process.cwd(), 'output');
    const jsonPath = path.join(outputDir, 'papers.json');
    const csvPath = path.join(outputDir, 'papers.csv');
    
    // Export papers in both formats
    await exportPapersAsJSON(jsonPath);
    await exportPapersAsCSV(csvPath);
    
    console.log('Export completed successfully!');
  } catch (error) {
    console.error('Error exporting papers:', error);
    process.exit(1);
  }
}

// Run the main function
main(); 