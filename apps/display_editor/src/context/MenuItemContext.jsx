import { createContext, useContext, useEffect, useState } from 'react';
import { menuItemService } from '../services/menuItemService';

const MenuItemContext = createContext();

export const useMenuItems = () => {
  const context = useContext(MenuItemContext);
  if (!context) {
    throw new Error('useMenuItems must be used within MenuItemProvider');
  }
  return context;
};

export const MenuItemProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async (forceRefresh = false) => {
    try {
      const fetchedMenuItems = await menuItemService.getAll({ forceRefresh });
      setMenuItems(fetchedMenuItems);
    } catch (error) {
      alert('Error fetching menu items', error);
      return [];
    }
  };

  useEffect(() => {
    const loadMenuItems = async () => {
      await fetchMenuItems();
    };
    loadMenuItems();
  }, []);

  const refreshMenuItems = () => fetchMenuItems(true);

  const clearCache = () => {
    menuItemService.clearCache();
    refreshMenuItems();
  };

  return (
    <MenuItemContext.Provider
      value={{
        menuItems,
        refreshMenuItems,
        clearCache,
      }}
    >
      {children}
    </MenuItemContext.Provider>
  );
};
