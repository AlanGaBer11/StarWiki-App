import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Elementos PWA de Ionic
import { defineCustomElements } from '@ionic/pwa-elements/loader';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Llama al loader de los elementos PWA (por ejemplo: cámara, archivos, etc.)
defineCustomElements(window);
