import { useState } from "react";

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const ZOOM_FACTOR = 1.05;

const clamp = (v) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v));

export const useCanvasZoom = (stageRef) => {
  const [zoom, setZoom] = useState(1);

  const applyZoom = (newZoom) => {
    const stage = stageRef.current;
    newZoom = clamp(newZoom);
    setZoom(newZoom);
    stage.scale({ x: newZoom, y: newZoom });
    stage.batchDraw();
  };

  const resetZoom = () => {
    const stage = stageRef.current;
    applyZoom(1);
    stage.position({ x: 0, y: 0 });
    stage.batchDraw();
  };

  const handleWheel = (e) => {
    if (!(e.evt.ctrlKey || e.evt.metaKey) )return;

    e.evt.preventDefault();
    const stage = stageRef.current;
    const oldScale = stage.getAbsoluteScale().x;
    const mousePosition = stage.getPointerPosition();

    const mousePointTo = {
      x: (mousePosition.x - stage.x()) / oldScale,
      y: (mousePosition.y - stage.y()) / oldScale,
    };

    let direction = e.evt.deltaY < 0 ? 1 : -1;

    const newScale = clamp(
      direction > 0 ? oldScale * ZOOM_FACTOR : oldScale / ZOOM_FACTOR,
    );

    setZoom(newScale);
    applyZoom(newScale);

    const newPos = {
      x: mousePosition.x - mousePointTo.x * newScale,
      y: mousePosition.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };

  return { zoom, resetZoom, handleWheel, applyZoom };
};
