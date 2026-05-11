import { CanvasItemMap } from '../types/CanvasItemMap';
import { CanvasItemSchema } from '../types/CanvasItemTypes';

const CanvasItem = ({ item }: { item: CanvasItemSchema }) => {
  const RenderNode = CanvasItemMap[item.type];

  return <RenderNode item={item} />;
};

export default CanvasItem;
