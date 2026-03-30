import { GRID_SIZE } from '../constants/config';
import { createCanvasItem } from '../utils/ItemFactory';

const calculateDropPosition = (position) => {
  let offsetX = 50;
  let offsetY = 15;
  const finalX = Math.round((position.x - offsetX) / GRID_SIZE) * GRID_SIZE;
  const finalY = Math.round((position.y - offsetY) / GRID_SIZE) * GRID_SIZE;
  return { x: finalX, y: finalY };
};

const useDragAndDrop = (onItemAdd, stageRef) => {
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();

    const itemDataString = e.dataTransfer.getData('application/json');
    if (!itemDataString) return;
    const itemData = JSON.parse(itemDataString);

    const stage = stageRef.current;
    if (!stage) return;

    stage.setPointersPositions(e);

    const screenPosition = stage.getPointerPosition();
    const stageScale = stage.scale();
    const stagePosition = stage.position();

    const mousePosition = {
      x: (screenPosition.x - stagePosition.x) / stageScale.x,
      y: (screenPosition.y - stagePosition.y) / stageScale.y,
    };

    const position = calculateDropPosition(mousePosition);
    const newItem = createCanvasItem(itemData, position);

    onItemAdd(newItem);
  };

  return { handleDragOver, handleDrop };
};

export default useDragAndDrop;
