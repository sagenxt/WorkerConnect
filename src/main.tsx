import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Simple initialization without complex logging
const initApp = () => {
  try {
    console.log('Starting WorkerConnect app...');
    
    // Render the app
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    
    console.log('App rendered successfully');
  } catch (err) {
    console.error('Critical error initializing app:', err);
    
    // Show error in the DOM
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          text-align: center;
          padding: 20px;
        ">
          <h1 style="font-size: 24px; margin-bottom: 20px;">WorkerConnect</h1>
          <p style="margin-bottom: 20px;">Sorry, the app failed to load.</p>
          <button onclick="window.location.reload()" style="
            background: white;
            color: #2563eb;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
          ">Retry</button>
        </div>
      `;
    }
  }
};

// Start the app
initApp();