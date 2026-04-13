import { Group, Text, Image } from 'react-konva';
import { useItemHandlers } from '../../../hooks/useItemHandlers';
import useImage from 'use-image';

const MenuItem = ({ item, onChange }) => {
  const { getItemHandlers } = useItemHandlers({
    item,
    onChange,
  });
  const [image] = useImage(item.image_url);

  return (
    <Group id={item.instanceId} x={item.x} y={item.y} {...item} {...getItemHandlers()}>
      {item.showImage && image && <Image image={image} x={0} y={0} {...item.imageStyle} />}
      {item.showTitle && <Text text={item.name || 'MenuItem'} {...item.titleStyle} />}
      {item.showDescription && (
        <Text text={item.description || 'No description'} {...item.descriptionStyle} />
      )}
      {item.showPrice && <Text text={`$${item.price}`} {...item.priceStyle} />}
    </Group>
  );
};

export default MenuItem;
