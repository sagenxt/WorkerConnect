import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Capacitor } from '@capacitor/core';
import App from './App.tsx';
import './index.css';
import { registerServiceWorker, requestNotificationPermission } from './utils/pwa';
import { initializeCapacitorPlugins } from './utils/capacitor-plugins';

// Only register service worker for PWA functionality in web context
if (!Capacitor.isNativePlatform()) {
  registerServiceWorker();
} else {
  // Initialize Capacitor plugins for native platforms
  initializeCapacitorPlugins();
}

// Request notification permission
requestNotificationPermission();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);