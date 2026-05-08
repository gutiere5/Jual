import { createContext } from 'react';
import { GRID_SIZE } from '../constants/config';
import { useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CanvasEditorContext = createContext();

export const CanvasEditorProvider = ({ children }) => {
  const [canvasItems, setCanvasItems] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [copiedItem, setCopiedItem] = useState(null);
  const [canvasSettings, setCanvasSettings] = useState({
    width: 1280,
    height: 720,
    backgroundColor: '#ffffff',
    backgroundImage: null,
    showGrid: true,
    snapToGrid: true,
    gridSize: GRID_SIZE,
  });

  const selectedItem = canvasItems.find((item) => item.instanceId === selectedItemIds[0]) || null;

  const selectItem = (itemId) => {
    setSelectedItemIds(Array.isArray(itemId) ? itemId : [itemId]);
  };

  const clearSelection = () => {
    setSelectedItemIds([]);
  };

  const addItem = (newItem) => {
    setCanvasItems((prev) => [...prev, newItem]);
  };

  const updateItem = (updatedItem) => {
    setCanvasItems((prev) =>
      prev.map((item) => (item.instanceId === updatedItem.instanceId ? updatedItem : item)),
    );
  };

  const deleteItem = () => {
    setCanvasItems((prev) => prev.filter((item) => !selectedItemIds.includes(item.instanceId)));
    setSelectedItemIds([]);
  };

  const loadProject = (loadedData) => {
    setCanvasItems(loadedData.items || []);
    setSelectedItemIds([]);
    setCanvasSettings(loadedData.canvasSettings || canvasSettings);
  };

  const updateCanvasSettings = (newSettings) => {
    setCanvasSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const toggleGrid = () => {
    setCanvasSettings((prev) => ({ ...prev, showGrid: !prev.showGrid }));
  };

  const toggleSnapToGrid = () => {
    setCanvasSettings((prev) => ({ ...prev, snapToGrid: !prev.snapToGrid }));
  };

  const copySelectedItem = () => {
    if (!selectedItem || !selectedItem.instanceId) return;

    const newItem = {
      ...selectedItem,
    };

    setCopiedItem(newItem);
  };

  const pasteItem = (e) => {
    if (!copiedItem) return;

    if (e.metaKey || e.ctrlKey) {
      const newItem = {
        ...copiedItem,
        instanceId: crypto.randomUUID(),
        x: copiedItem.x + 30,
        y: copiedItem.y + 30,
      };
      addItem(newItem);
    }
  };

  const bringSelectedToFront = () => {
    setCanvasItems((prev) => {
      const selected = prev.filter((item) => selectedItemIds.includes(item.instanceId));
      const notSelected = prev.filter((item) => !selectedItemIds.includes(item.instanceId));
      return [...notSelected, ...selected];
    });
  };

  const bringSelectedToBack = () => {
    setCanvasItems((prev) => {
      const selected = prev.filter((item) => selectedItemIds.includes(item.instanceId));
      const notSelected = prev.filter((item) => !selectedItemIds.includes(item.instanceId));
      return [...selected, ...notSelected];
    });
  };

  return (
    <CanvasEditorContext.Provider
      value={{
        canvasSettings,
        updateCanvasSettings,
        toggleGrid,
        toggleSnapToGrid,
        canvasItems,
        addItem,
        updateItem,
        deleteItem,
        selectedItemIds,
        selectedItem,
        selectItem,
        clearSelection,
        loadProject,
        pasteItem,
        copySelectedItem,
        bringSelectedToFront,
        bringSelectedToBack,
      }}
    >
      {children}
    </CanvasEditorContext.Provider>
  );
};
