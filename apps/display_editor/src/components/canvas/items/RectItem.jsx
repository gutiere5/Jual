import { useItemHandlers } from '../../../hooks/useItemHandlers';
import { Rect } from 'react-konva';

const RectItem = ({ item, onChange }) => {
  const { getItemHandlers } = useItemHandlers({
    item,
    onChange,
  });

  return <Rect id={item.instanceId} {...item} {...getItemHandlers()} />;
};

export default RectItem;
