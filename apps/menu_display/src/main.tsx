import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/error-page';
import MainMenu from './routes/main-menu';
import canvasDisplay from './routes/canvas-display';
import MainMenuLoader from './loaders/main-menu-loader';

const router = createBrowserRouter([
  {
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: MainMenu, loader: MainMenuLoader },
      { path: 'canvas', Component: canvasDisplay },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
