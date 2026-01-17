import { MENU_ITEM_DEFAULTS } from "../components/canvas/items/MenuItemDefaults";

export const createCanvasItem = (position) => {
  const baseItem = {
    instanceId: crypto.randomUUID(),
    x: position.x,
    y: position.y,
    scaleX: 1,
    scaleY: 1,
    ...MENU_ITEM_DEFAULTS,
  };

  return baseItem;
};
