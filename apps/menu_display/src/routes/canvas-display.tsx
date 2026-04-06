import { useLocation } from 'react-router-dom';
import screenfull from 'screenfull';
import { Group, Layer, Rect, Stage } from 'react-konva';
import { CanvasData } from '../../types/CanvasItemTypes';
import CanvasItem from '../components/CanvasItems';
import './canvas-display.css';
import { useEffect, useMemo, useRef, useState } from 'react';

const CanvasDisplay = () => {
  const location = useLocation();
  const canvasData = location.state as CanvasData | undefined;
  const elementRef = useRef<HTMLDivElement>(null);
  const baseWidth = canvasData?.canvasSettings.width ?? 500;
  const baseHeight = canvasData?.canvasSettings.height ?? 500;
  const canvasBackground = canvasData?.canvasSettings.backgroundColor ?? '#ffffff';

  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });

    onResize();
    window.addEventListener('resize', onResize);
    document.addEventListener('fullscreenchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('fullscreenchange', onResize);
    };
  }, []);

  const { scale, offsetX, offsetY } = useMemo(() => {
    const s = Math.min(viewport.width / baseWidth, viewport.height / baseHeight);
    return {
      scale: s,
      offsetX: (viewport.width - baseWidth * s) / 2,
      offsetY: (viewport.height - baseHeight * s) / 2,
    };
  }, [viewport.width, viewport.height, baseWidth, baseHeight]);

  const handleToggle = () => {
    if (screenfull.isEnabled && elementRef.current) {
      void screenfull.toggle(elementRef.current);
    }
  };

  return (
    <div className="canvas-display" ref={elementRef}>
      {screenfull.isEnabled && <button onClick={handleToggle}>Full Screen</button>}
      <Stage width={viewport.width} height={viewport.height}>
        <Layer>
          <Group x={offsetX} y={offsetY} scaleX={scale} scaleY={scale}>
            <Rect
              x={0}
              y={0}
              width={baseWidth}
              height={baseHeight}
              fill={canvasBackground}
              listening={false}
            />
            {canvasData?.items.map((item) => (
              <CanvasItem key={item.instanceId} item={item} />
            ))}
          </Group>
          </Layer>
      </Stage>
    </div>
  );
};
export default CanvasDisplay;
