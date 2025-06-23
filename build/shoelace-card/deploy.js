#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  buildDir: __dirname,
  rootDir: path.resolve(__dirname, '../..'),
  targetBlocksDir: path.resolve(__dirname, '../../blocks/shoelace-card'),
  filesToDeploy: [
    { source: 'shoelace-card.js', target: 'shoelace-card.js' },
    { source: 'shoelace-card-stub.css', target: 'shoelace-card.css' },
    { source: 'USER-README.md', target: 'README.md' }
  ],
  preserveFiles: [
    'test.html' // Don't overwrite existing test files
  ]
};

// Utility functions
const log = {
  info: (msg) => console.log(`\x1b[36m[DEPLOY]\x1b[0m ${msg}`),
  success: (msg) => console.log(`\x1b[32m[DEPLOY]\x1b[0m ${msg}`),
  warn: (msg) => console.log(`\x1b[33m[DEPLOY]\x1b[0m ${msg}`),
  error: (msg) => console.error(`\x1b[31m[DEPLOY]\x1b[0m ${msg}`)
};

// Check if file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Ensure directory exists
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    return true;
  } catch (error) {
    log.error(`Failed to create directory ${dirPath}: ${error.message}`);
    return false;
  }
}

// Get file stats for comparison
async function getFileStats(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return {
      size: stats.size,
      modified: stats.mtime.toISOString(),
      exists: true
    };
  } catch {
    return { exists: false };
  }
}

// Copy file with progress
async function copyFile(source, target) {
  try {
    const data = await fs.readFile(source);
    await fs.writeFile(target, data);
    return true;
  } catch (error) {
    log.error(`Failed to copy ${source} to ${target}: ${error.message}`);
    return false;
  }
}

// Handle file deployment (always overwrite except preserved files)
async function deployFile(sourceFile, targetFile, fileConfig) {
  const sourcePath = path.join(CONFIG.buildDir, sourceFile);
  const targetPath = path.join(CONFIG.targetBlocksDir, targetFile);
  
  const sourceStats = await getFileStats(sourcePath);
  const targetStats = await getFileStats(targetPath);
  
  if (!sourceStats.exists) {
    log.warn(`Source file not found: ${sourceFile}`);
    return false;
  }
  
  if (!targetStats.exists) {
    log.info(`Deploying new file: ${targetFile}`);
    return await copyFile(sourcePath, targetPath);
  }
  
  // File exists, check if we should preserve it
  if (CONFIG.preserveFiles.includes(targetFile)) {
    log.info(`Preserving existing file: ${targetFile}`);
    return true;
  }
  
  // Always overwrite existing files (except preserved ones)
  log.info(`Overwriting existing file: ${targetFile}`);
  log.info(`  Source: ${sourceStats.size} bytes, modified: ${sourceStats.modified}`);
  log.info(`  Target: ${targetStats.size} bytes, modified: ${targetStats.modified}`);
  
  return await copyFile(sourcePath, targetPath);
}

// Validate source files
async function validateSourceFiles() {
  log.info('Validating source files...');
  
  const jsFile = path.join(CONFIG.buildDir, 'shoelace-card.js');
  const jsExists = await fileExists(jsFile);
  
  if (!jsExists) {
    log.error('Source JavaScript file not found: shoelace-card.js');
    return false;
  }
  
  const cssFile = path.join(CONFIG.buildDir, 'shoelace-card-stub.css');
  const cssExists = await fileExists(cssFile);
  
  if (!cssExists) {
    log.error('CSS stub file not found in build directory');
    return false;
  }
  
  const readmeFile = path.join(CONFIG.buildDir, 'USER-README.md');
  const readmeExists = await fileExists(readmeFile);
  
  if (!readmeExists) {
    log.error('User README file not found in build directory');
    return false;
  }
  
  log.success('Source file validation passed');
  return true;
}



// Create deployment summary
function createDeploymentSummary(results) {
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  
  log.info('\n' + '='.repeat(50));
  log.info('DEPLOYMENT SUMMARY');
  log.info('='.repeat(50));
  log.success(`Successfully deployed: ${successful}/${total} files`);
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    log.info(`${status} ${result.target}`);
  });
  
  if (successful === total) {
    log.success('\n🎉 All files deployed successfully!');
    log.info('The shoelace-card block is now ready for EDS testing.');
    log.info('\nNext steps:');
    log.info('1. Test the block in your EDS environment');
    log.info('2. Update any content that uses the shoelace-card block');
    log.info('3. Verify the component works with your query-index.json data');
  } else {
    log.warn('\n⚠️  Some files were not deployed. Please review the errors above.');
  }
}

// Main deployment function
async function deploy() {
  try {
    log.info('Starting Shoelace Card deployment...');
    log.info(`Build directory: ${CONFIG.buildDir}`);
    log.info(`Target directory: ${CONFIG.targetBlocksDir}`);
    
    // Validate source files
    if (!(await validateSourceFiles())) {
      process.exit(1);
    }
    
    // Ensure target directory exists
    if (!(await ensureDir(CONFIG.targetBlocksDir))) {
      process.exit(1);
    }
    
    // Deploy files
    const results = [];
    
    for (const fileConfig of CONFIG.filesToDeploy) {
      log.info(`\nProcessing: ${fileConfig.source} → ${fileConfig.target}`);
      
      const success = await deployFile(fileConfig.source, fileConfig.target, fileConfig);
      
      results.push({
        source: fileConfig.source,
        target: fileConfig.target,
        success
      });
    }
    
    // Create deployment summary
    createDeploymentSummary(results);
    
  } catch (error) {
    log.error(`Deployment failed: ${error.message}`);
    process.exit(1);
  }
}

// Run deployment
deploy().catch(error => {
  log.error(`Unexpected error: ${error.message}`);
  process.exit(1);
});
