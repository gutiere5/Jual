import { GRID_SIZE } from "../constants/config";

export const useItemHandlers = ({
  item,
  onChange,
  onSelect,
  isEditing,
  ref,
}) => {
  const updateItem = (updates) => {
    onChange({
      ...item,
      ...updates,
    });
  };

  const getItemHandlers = () => ({
    ref: ref,
    draggable: true,
    onClick: (e) => {
      if (!isEditing) onSelect(item.instanceId, e.evt.shiftKey);
    },
    onTap: () => {
      if (!isEditing) onSelect(item.instanceId, false);
    },
    onDragBound: (pos) => ({
      x: Math.round(pos.x / GRID_SIZE) * GRID_SIZE,
      y: Math.round(pos.y / GRID_SIZE) * GRID_SIZE,
    }),
    onDragEnd: (e) => {
      updateItem({
        x: e.target.x(),
        y: e.target.y(),
      });
    },
    onTransformEnd: () => {
      const node = ref.current;
      if (!node) return;
      updateItem({
        x: node.x(),
        y: node.y(),
        scaleX: node.scaleX(),
        scaleY: node.scaleY(),
        rotation: node.rotation(),
      });
    },
  });
  return { getItemHandlers };
};
