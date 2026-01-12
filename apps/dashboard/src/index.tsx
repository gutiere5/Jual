import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router/dom';
import ItemInventoryContainer, {
  inventoryItemsAction,
  inventoryItemsLoader,
} from './routes/items/ItemInventory.tsx';
import ErrorPage from './routes/ErrorPage.tsx';
import App from './App.tsx';
import ItemDetails, { itemLoader, itemEditAction } from './routes/items/ItemDetails.tsx';
import Personnel from './routes/personnel/Personnel.tsx';
import Settings from './routes/settingsPage/Settings.tsx';

const router = createBrowserRouter([
  {
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: ItemInventoryContainer,
        loader: inventoryItemsLoader,
        action: inventoryItemsAction,
      },
      { path: 'personnel', Component: Personnel },
      { path: 'settings', Component: Settings },
      {
        path: 'items/:itemId',
        Component: ItemDetails,
        loader: itemLoader,
        action: itemEditAction,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
