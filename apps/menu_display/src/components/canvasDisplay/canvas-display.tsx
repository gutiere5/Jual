import { NavLink, useParams } from 'react-router-dom';
import { Group, Layer, Rect, Stage } from 'react-konva';
import CanvasItem from './CanvasItems';
import './canvas-display.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import screenfull from 'screenfull';
import { useSuspenseQuery } from '@tanstack/react-query';
import { canvasQueryOptions } from '../../api/query-client';

const CanvasDisplay = () => {
  const canvasId = useParams().canvasId as string;
  const { data: canvasData } = useSuspenseQuery(canvasQueryOptions(canvasId));
  const elementRef = useRef<HTMLDivElement>(null);
  const baseWidth = canvasData.content.canvasSettings.width || 500;
  const baseHeight = canvasData.content.canvasSettings.height || 500;
  const canvasBackground = canvasData.content.canvasSettings.backgroundColor || '#ffffff';

  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

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
      <NavLink to={'/'}>
        <button>Home</button>
      </NavLink>
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
            {canvasData.content.items.map((item) => (
              <CanvasItem key={item.instanceId} item={item} />
            ))}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasDisplay;
