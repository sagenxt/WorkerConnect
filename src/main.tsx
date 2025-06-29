import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerServiceWorker, requestNotificationPermission } from './utils/pwa';

// Register service worker for PWA functionality
registerServiceWorker();

// Request notification permission
requestNotificationPermission();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);