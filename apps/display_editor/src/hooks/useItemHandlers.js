import { GRID_SIZE } from '../constants/config';

export const useItemHandlers = ({ item, onChange }) => {
  const updateItem = (updates) => {
    onChange({
      ...item,
      ...updates,
    });
  };

  const getItemHandlers = () => ({
    draggable: true,

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
  });
  return { getItemHandlers };
};
