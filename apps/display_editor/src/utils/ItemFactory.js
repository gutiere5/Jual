import { ITEM_TYPE_DEFAULTS } from '../components/canvas/item_defaults';

export const createCanvasItem = (itemData, position) => {
  const typeDefaults = ITEM_TYPE_DEFAULTS[itemData.type] || {};
  const baseItem = {
    instanceId: crypto.randomUUID(),
    x: position.x,
    y: position.y,
    scaleX: 1,
    scaleY: 1,
    ...typeDefaults,
    ...itemData,
  };

  return baseItem;
};
