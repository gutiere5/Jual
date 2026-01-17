import { useRef } from "react";
import { GRID_SIZE } from "../constants/config";
import { createCanvasItem } from "../utils/itemFactory";

const calculateDropPosition = (position) => {
  let offsetX = 75;
  let offsetY = 75;
  const finalX = Math.round((position.x - offsetX) / GRID_SIZE) * GRID_SIZE;
  const finalY = Math.round((position.y - offsetY) / GRID_SIZE) * GRID_SIZE;
  return { x: finalX, y: finalY };
};

const useDragAndDrop = (setItems) => {
  const stageRef = useRef();

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();

    const stage = stageRef.current;
    if (!stage) return;

    stage.setPointersPositions(e);
    const mousePosition = stage.getPointerPosition();
    const position = calculateDropPosition(mousePosition);
    const newItem = createCanvasItem(position);

    setItems((previousItems) => [...previousItems, newItem]);
  };

  return { stageRef, handleDragOver, handleDrop };
};

export default useDragAndDrop;
