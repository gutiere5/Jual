import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router/dom';
import ItemInventoryContainer from './routes/items/ItemInventory';
import ErrorPage from './routes/errorPage/ErrorPage';
import App from './App';
import ItemDetails, { itemLoader, itemEditAction } from './routes/items/ItemDetails';
import Personnel from './routes/personnel/Personnel';
import Settings from './routes/settingsPage/Settings';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './api/query-client';

const ExternalAppLink = ({ url }: { url: string }) => {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return null;
};

const router = createBrowserRouter([
  {
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: ItemInventoryContainer,
      },
      { path: 'personnel', Component: Personnel },
      { path: 'settings', Component: Settings },
      {
        path: 'items/:itemId',
        Component: ItemDetails,
        loader: itemLoader,
        action: itemEditAction,
      },
      {
        path: 'canvas',
        element: <ExternalAppLink url={import.meta.env.VITE_CANVAS_EDITOR_URL as string} />,
      },
      {
        path: 'display',
        element: <ExternalAppLink url={import.meta.env.VITE_CANVAS_DISPLAY_URL as string} />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
