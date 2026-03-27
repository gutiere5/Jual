import { useCanvasEditor } from '../context/CanvasEditorContext';

export const useItemHandlers = ({ item, onChange }) => {
  const { canvasSettings } = useCanvasEditor();
  const {snapToGrid, gridSize} = canvasSettings;

  const updateItem = (updates) => {
    onChange({
      ...item,
      ...updates,
    });
  };

  const maybeSnap = (value) => {
    if (!snapToGrid) return value;
    return Math.round(value / gridSize) * gridSize;
  }

  const getItemHandlers = () => ({
    draggable: true,

    dragBoundFunc: (pos) => ({
      x: maybeSnap(pos.x),
      y: maybeSnap(pos.y),
    }),
    onDragEnd: (e) => {
      const x = maybeSnap(e.target.x());
      const y = maybeSnap(e.target.y());

      e.target.position({ x, y });
      updateItem({ x,y});
    },
  });
  return { getItemHandlers };
};


// rectangle.position({
//       x: Math.round(rectangle.x() / blockSnapSize) * blockSnapSize,
//       y: Math.round(rectangle.y() / blockSnapSize) * blockSnapSize
//     });
//     stage.ba