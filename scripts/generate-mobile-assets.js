#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🎨 Generating mobile app assets...');

// Create directories if they don't exist
const publicDir = path.join(process.cwd(), 'public');
const downloadsDir = path.join(publicDir, 'downloads');
const iconsDir = path.join(publicDir, 'icons');
const distDir = path.join(process.cwd(), 'dist');
const distDownloadsDir = path.join(distDir, 'downloads');

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

if (!fs.existsSync(distDownloadsDir)) {
  fs.mkdirSync(distDownloadsDir, { recursive: true });
}

// Create a placeholder APK file
const createPlaceholderApk = () => {
  const apkPath = path.join(downloadsDir, 'WorkerConnect.apk');
  const distApkPath = path.join(distDownloadsDir, 'WorkerConnect.apk');
  
  // Create a simple text file with .apk extension
  try {
    // Create a dummy file
    const dummyContent = 'This is a placeholder APK file for demonstration purposes.';
    fs.writeFileSync(apkPath, dummyContent);
    
    // Ensure dist directory exists
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Copy to dist folder
    if (!fs.existsSync(distDownloadsDir)) {
      fs.mkdirSync(distDownloadsDir, { recursive: true });
    }
    
    fs.writeFileSync(distApkPath, dummyContent);
    console.log('✅ Created placeholder APK file');
  } catch (error) {
    console.error('❌ Failed to create placeholder APK:', error.message);
  }
};

// Create a placeholder IPA file
const createPlaceholderIpa = () => {
  const ipaPath = path.join(downloadsDir, 'WorkerConnect.ipa');
  const distIpaPath = path.join(distDownloadsDir, 'WorkerConnect.ipa');
  
  // Create a simple text file with .ipa extension
  try {
    // Create a dummy file
    const dummyContent = 'This is a placeholder IPA file for demonstration purposes.';
    fs.writeFileSync(ipaPath, dummyContent);
    
    // Ensure dist directory exists
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Copy to dist folder
    if (!fs.existsSync(distDownloadsDir)) {
      fs.mkdirSync(distDownloadsDir, { recursive: true });
    }
    
    fs.writeFileSync(distIpaPath, dummyContent);
    console.log('✅ Created placeholder IPA file');
  } catch (error) {
    console.error('❌ Failed to create placeholder IPA:', error.message);
  }
};

// Create SVG icons for different platforms
const createSvgIcons = () => {
  // Android icon
  const androidIconPath = path.join(iconsDir, 'android-icon.svg');
  const androidIconSvg = `
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="40" fill="#2563eb"/>
  <path d="M100 50C77.9086 50 60 67.9086 60 90V150H140V90C140 67.9086 122.091 50 100 50Z" fill="white"/>
  <path d="M85 70H115M70 110H130M85 130H115" stroke="#2563eb" stroke-width="8" stroke-linecap="round"/>
  <path d="M50 100L60 100M150 100L140 100" stroke="#2563eb" stroke-width="8" stroke-linecap="round"/>
</svg>
  `;
  fs.writeFileSync(androidIconPath, androidIconSvg);

  // iOS icon
  const iosIconPath = path.join(iconsDir, 'ios-icon.svg');
  const iosIconSvg = `
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="40" fill="#2563eb"/>
  <path d="M100 50C77.9086 50 60 67.9086 60 90V150H140V90C140 67.9086 122.091 50 100 50Z" fill="white"/>
  <path d="M85 70H115M70 110H130M85 130H115" stroke="#2563eb" stroke-width="8" stroke-linecap="round"/>
  <path d="M50 100L60 100M150 100L140 100" stroke="#2563eb" stroke-width="8" stroke-linecap="round"/>
</svg>
  `;
  fs.writeFileSync(iosIconPath, iosIconSvg);

  console.log('✅ Created SVG icons for mobile platforms');
};

// Create README file
const createReadme = () => {
  const readmePath = path.join(downloadsDir, 'README.txt');
  const readmeContent = `WorkerConnect Mobile App

This directory contains the mobile application packages for WorkerConnect:

1. WorkerConnect.apk - Android application package
2. WorkerConnect.ipa - iOS application package (requires developer signing)

Installation Instructions:

Android:
1. Download the APK file to your Android device
2. Enable installation from unknown sources in your device settings
3. Open the APK file and follow the installation prompts
4. Launch the app from your app drawer

iOS:
1. The IPA file requires developer signing or distribution through the App Store
2. For development testing, use Xcode and a developer account
3. For enterprise distribution, use your organization's MDM solution

For support, contact:
support@workerconnect.gov.in
1800-123-4567

© 2024 WorkerConnect. All rights reserved.
`;
  fs.writeFileSync(readmePath, readmeContent);
  
  // Copy to dist folder
  const distReadmePath = path.join(distDownloadsDir, 'README.txt');
  fs.writeFileSync(distReadmePath, readmeContent);
  
  console.log('✅ Created README file');
};

// Copy downloads index.html to dist
const copyDownloadsIndex = () => {
  const sourceIndexPath = path.join(downloadsDir, 'index.html');
  const distIndexPath = path.join(distDownloadsDir, 'index.html');
  
  if (fs.existsSync(sourceIndexPath)) {
    fs.copyFileSync(sourceIndexPath, distIndexPath);
    console.log('✅ Copied downloads index.html to dist');
  }
};

// Execute all asset generation functions
createPlaceholderApk();
createPlaceholderIpa();
createSvgIcons();
createReadme();
copyDownloadsIndex();

console.log('🎉 Mobile assets generation completed!');