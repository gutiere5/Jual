import { Group, Text, Image } from 'react-konva';
import { CanvasItemSchema } from '../CanvasItemTypes';
import useImage from 'use-image';

type MenuCanvasItem = Extract<CanvasItemSchema, { type: 'menu' }>;

const MenuItem = ({ item }: { item: MenuCanvasItem }) => {
  const [image] = useImage(item.image_src);

  return (
    <Group id={item.instanceId} {...item}>
      {item.showImage && image && <Image image={image} x={0} y={0} cornerRadius={[8, 8, 8, 8]} />}
      {item.showTitle && (
        <Text text={item.name || 'MenuItem'} x={180} y={10} {...item.titleStyle} />
      )}
      {item.showDescription && (
        <Text
          text={item.description || 'No description'}
          x={180}
          y={40}
          {...item.descriptionStyle}
        />
      )}
      {item.showPrice && <Text text={item.price || '0'} x={180} y={70} {...item.priceStyle} />}
    </Group>
  );
};

export default MenuItem;
