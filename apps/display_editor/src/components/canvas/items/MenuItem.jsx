import { Group, Text, Image } from 'react-konva';
import { useItemHandlers } from '../../../hooks/useItemHandlers';
import useImage from 'use-image';
// import { MENU_ITEM_DEFAULTS } from "../item_defaults/MenuItemDefaults";

const MenuItem = ({ item, onChange }) => {
  const { getItemHandlers } = useItemHandlers({
    item,
    onChange,
  });
  const [image] = useImage(item.image_src);

  return (
    <Group id={item.instanceId} x={item.x} y={item.y} {...item} {...getItemHandlers()}>
      {/* Background Card */}
      {/* <Rect
        width={item.width || 400}
        height={item.height || 150}
        fill="transparent"
      /> */}

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
      {item.showPrice && <Text text={item.price || 0} x={180} y={70} {...item.priceStyle} />}
    </Group>
  );
};

export default MenuItem;
