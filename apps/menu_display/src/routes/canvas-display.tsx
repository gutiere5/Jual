import { useLocation } from 'react-router-dom';
import { Layer, Stage } from 'react-konva';
import { CanvasData } from '../../types/CanvasItemTypes';
import CanvasItem from '../components/CanvasItems';
import "./canvas-display.css"

function canvasDisplay() {
  const location = useLocation();
  const canvasData = location.state as CanvasData | undefined;

  console.log('Canvas Data:', canvasData);

  return (
    <div className="canvas-display">
      <Stage
        width={canvasData?.canvasSettings.width || 500}
        height={canvasData?.canvasSettings.height || 500}
        fill={canvasData?.canvasSettings.backgroundColor}
      >
        <Layer>
          {canvasData?.items.map((item: any) => (
            <CanvasItem key={item.instanceId} item={item} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default canvasDisplay;
