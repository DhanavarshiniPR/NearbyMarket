import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './App.css';

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

console.log('Starting app initialization...');
console.log('Root element:', document.getElementById('root'));

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('App rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);
  
  document.getElementById('root').innerHTML = `
    <div style="
      padding: 20px;
      text-align: center;
      font-family: Arial, sans-serif;
      background-color: #f3f4f6;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div>
        <h1>Something went wrong</h1>
        <p>Please try refreshing the page</p>
        <button onclick="window.location.reload()" style="
          padding: 10px 20px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 20px;
        ">
          Reload Page
        </button>
      </div>
    </div>
  `;
}
