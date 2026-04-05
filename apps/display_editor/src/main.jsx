import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CanvasEditorProvider } from './context/CanvasEditorContext.jsx';
import { MenuItemProvider } from './context/MenuItemContext';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './api/query-client.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CanvasEditorProvider>
        <MenuItemProvider>
          <App />
        </MenuItemProvider>
      </CanvasEditorProvider>
    </QueryClientProvider>
  </StrictMode>,
);
