#!/usr/bin/env node

import { mkdirSync, existsSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

/**
 * Build script for Spectrum Card component
 * 1. Runs Vite build to bundle all dependencies
 * 2. Copies bundled output from /build/spectrum-card/dist/ to /blocks/ directory
 * The /build/ directory is the source for development
 * The /blocks/ directory contains EDS-ready bundled files for deployment
 */

function ensureDirectoryExists(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

function runViteBuild(buildDir) {
  console.log('Running Vite build to bundle dependencies...');
  try {
    // Change to build directory and run npm install + build
    execSync('npm install', { cwd: buildDir, stdio: 'inherit' });
    execSync('npm run build', { cwd: buildDir, stdio: 'inherit' });
    console.log('✅ Vite build completed successfully');
  } catch (error) {
    console.error('❌ Vite build failed:', error.message);
    throw error;
  }
}

function validateBuildOutput(distDir) {
  const jsFile = join(distDir, 'spectrum-card.js');
  const cssFile = join(distDir, 'spectrum-card.css');
  
  if (!existsSync(jsFile)) {
    throw new Error(`Bundled JS file not found: ${jsFile}`);
  }
  
  if (!existsSync(cssFile)) {
    console.warn(`Warning: CSS file not found: ${cssFile}`);
  }
  
  console.log('✅ Build output validation passed');
}

function buildAndCopyToBlocks() {
  const buildDir = join(projectRoot, 'build', 'spectrum-card');
  const distDir = join(buildDir, 'dist');
  const blocksDir = join(projectRoot, 'blocks', 'spectrum-card');
  
  // Ensure build directory exists
  if (!existsSync(buildDir)) {
    throw new Error(`Build directory not found: ${buildDir}`);
  }
  
  // Run Vite build to create bundled files
  runViteBuild(buildDir);
  
  // Validate build output
  validateBuildOutput(distDir);
  
  // Ensure blocks directory exists
  ensureDirectoryExists(blocksDir);
  
  // Copy bundled JavaScript file from dist to blocks
  const jsSource = join(distDir, 'spectrum-card.js');
  const jsTarget = join(blocksDir, 'spectrum-card.js');
  
  if (existsSync(jsSource)) {
    copyFileSync(jsSource, jsTarget);
    console.log('✅ Copied bundled spectrum-card.js from dist to blocks directory');
  } else {
    throw new Error(`Bundled JS file not found: ${jsSource}`);
  }
  
  // Copy CSS file from dist to blocks
  const cssSource = join(distDir, 'spectrum-card.css');
  const cssTarget = join(blocksDir, 'spectrum-card.css');
  
  if (existsSync(cssSource)) {
    copyFileSync(cssSource, cssTarget);
    console.log('✅ Copied spectrum-card.css from dist to blocks directory');
  } else {
    console.warn('⚠️  CSS file not found in dist directory, skipping');
  }
}

function main() {
  console.log('🚀 Building Spectrum Card component with dependency bundling...');
  
  try {
    buildAndCopyToBlocks();
    
    console.log('\n🎉 Build complete! EDS-ready files created.');
    console.log('\n📁 Files created:');
    console.log('   blocks/spectrum-card/spectrum-card.js (bundled with all dependencies)');
    console.log('   blocks/spectrum-card/spectrum-card.css');
    console.log('\n🧪 Testing:');
    console.log('   • Open build/spectrum-card/server.html directly in browser');
    console.log('   • Should work without module resolution errors');
    console.log('\n🚀 Development workflow:');
    console.log('   1. cd build/spectrum-card');
    console.log('   2. npm run dev (for development with hot reload)');
    console.log('   3. npm run build:component (to rebuild and copy to blocks/)');
    console.log('\n📦 The blocks/ folder contains bundled, browser-ready EDS components.');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   • Ensure build/spectrum-card/ directory exists');
    console.log('   • Check that package.json and vite.config.js are present');
    console.log('   • Verify npm dependencies are installable');
    process.exit(1);
  }
}

main();
