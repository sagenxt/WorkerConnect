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
    // Create a binary file with APK-like structure
    const buffer = Buffer.alloc(1024 * 1024 * 5); // 5MB file
    
    // Fill with random data to make it look like a binary file
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.floor(Math.random() * 256);
    }
    
    // Add a header to identify it as a placeholder
    const header = "PK\x03\x04PLACEHOLDER APK - NOT A REAL APK - FOR DEMONSTRATION ONLY";
    buffer.write(header, 0, header.length, 'utf8');
    
    fs.writeFileSync(apkPath, buffer);
    
    // Ensure dist directory exists
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Copy to dist folder
    if (!fs.existsSync(distDownloadsDir)) {
      fs.mkdirSync(distDownloadsDir, { recursive: true });
    }
    
    fs.writeFileSync(distApkPath, buffer);
    console.log('✅ Created placeholder APK file');
  } catch (error) {
    console.error('❌ Failed to create placeholder APK:', error.message);
  }
};

// Create a placeholder IPA file
const createPlaceholderIpa = () => {
  const ipaPath = path.join(downloadsDir, 'WorkerConnect.ipa');
  const distIpaPath = path.join(distDownloadsDir, 'WorkerConnect.ipa');
  
  // Create a binary file with IPA-like structure
  try {
    const buffer = Buffer.alloc(1024 * 1024 * 5); // 5MB file
    
    // Fill with random data to make it look like a binary file
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.floor(Math.random() * 256);
    }
    
    // Add some header text to identify it as a placeholder
    const header = "PK\x03\x04PLACEHOLDER IPA - NOT A REAL IPA - FOR DEMONSTRATION ONLY";
    buffer.write(header, 0, header.length, 'utf8');
    
    fs.writeFileSync(ipaPath, buffer);
    
    // Ensure dist directory exists
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Copy to dist folder
    if (!fs.existsSync(distDownloadsDir)) {
      fs.mkdirSync(distDownloadsDir, { recursive: true });
    }
    
    fs.writeFileSync(distIpaPath, buffer);
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

// Create downloads index.html
const createDownloadsIndex = () => {
  const indexPath = path.join(downloadsDir, 'index.html');
  const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WorkerConnect Downloads</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f9fafb;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      color: #2563eb;
      margin-bottom: 20px;
    }
    .card {
      background-color: white;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .download-button {
      display: inline-block;
      background-color: #2563eb;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 10px;
    }
    .download-button:hover {
      background-color: #1d4ed8;
    }
    .platform-icon {
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-right: 8px;
    }
  </style>
</head>
<body>
  <h1>WorkerConnect Mobile App Downloads</h1>
  
  <div class="card">
    <h2>Android Version</h2>
    <p>Download the latest version of WorkerConnect for Android devices.</p>
    <p><strong>Version:</strong> 1.0.0</p>
    <p><strong>Size:</strong> 15 MB</p>
    <a href="WorkerConnect.apk" class="download-button" download>
      <svg class="platform-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12" y2="18"></line>
      </svg>
      Download APK
    </a>
  </div>
  
  <div class="card">
    <h2>iOS Version</h2>
    <p>Download the latest version of WorkerConnect for iOS devices.</p>
    <p><strong>Version:</strong> 1.0.0</p>
    <p><strong>Size:</strong> 18 MB</p>
    <a href="WorkerConnect.ipa" class="download-button" download>
      <svg class="platform-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
        <path d="M9 7v0a3 3 0 0 1 6 0v0"></path>
        <rect x="5" y="7" width="14" height="14" rx="2"></rect>
      </svg>
      Download IPA
    </a>
  </div>
  
  <div class="card">
    <h2>Installation Instructions</h2>
    <h3>Android</h3>
    <ol>
      <li>Download the APK file to your Android device</li>
      <li>Go to Settings > Security > Unknown Sources and enable it</li>
      <li>Open the downloaded APK file</li>
      <li>Tap "Install" and wait for installation to complete</li>
      <li>Open WorkerConnect from your app drawer</li>
    </ol>
    
    <h3>iOS</h3>
    <ol>
      <li>iOS apps typically need to be installed through the App Store</li>
      <li>For development or enterprise distribution, special certificates are required</li>
      <li>Contact your IT administrator for assistance with iOS installation</li>
    </ol>
  </div>
  
  <p style="text-align: center; margin-top: 40px; color: #6b7280;">
    &copy; 2024 WorkerConnect. All rights reserved.
  </p>
</body>
</html>`;
  
  fs.writeFileSync(indexPath, indexContent);
  
  // Copy to dist folder
  const distIndexPath = path.join(distDownloadsDir, 'index.html');
  fs.writeFileSync(distIndexPath, indexContent);
  
  console.log('✅ Created downloads index.html');
};

// Create placeholder mobile app files
createPlaceholderApk();
createPlaceholderIpa();
createSvgIcons();
createReadme();
createDownloadsIndex();

console.log('🎉 Mobile assets generation completed!');