import { Group, Rect, Text, Image } from "react-konva";
import { useItemHandlers } from "../../../hooks/useItemHandlers";
import { forwardRef } from "react";
import useImage from "use-image";
import { MENU_ITEM_DEFAULTS } from "./MenuItemDefaults";

const MenuItem = forwardRef(({ item, onChange, onSelect, isEditing }, ref) => {
  const { getItemHandlers } = useItemHandlers({
    item,
    onChange,
    onSelect,
    isEditing,
    ref,
  });
  const [image] = useImage(item.foodItem.image_src);

  return (
    <Group x={item.x} y={item.y} {...getItemHandlers()}>
      {/* Background Card */}
      <Rect
        width={item.width || MENU_ITEM_DEFAULTS.width}
        height={item.height || MENU_ITEM_DEFAULTS.height}
        fill={item.fill || MENU_ITEM_DEFAULTS.fill}
        stroke={item.stroke || MENU_ITEM_DEFAULTS.stroke}
        opacity={item.opacity || MENU_ITEM_DEFAULTS.opacity}
        cornerRadius={item.cornerRadius || MENU_ITEM_DEFAULTS.cornerRadius}
        shadowBlur={item.shadowBlur || MENU_ITEM_DEFAULTS.shadowBlur}
        strokeWidth={item.strokeWidth || MENU_ITEM_DEFAULTS.strokeWidth}
      />
      {item.showImage && image && (
        <Image image={image} x={0} y={0} cornerRadius={[8, 8, 8, 8]} />
      )}
      {item.showTitle && (
        <Text text={item.foodItem.name || "MenuItem"} x={180} y={10} />
      )}
      {item.showDescription && (
        <Text
          text={item.foodItem.description || "No description"}
          x={180}
          y={40}
        />
      )}
      {item.showPrice && (
        <Text text={item.foodItem.price || 0} x={180} y={70} />
      )}
    </Group>
  );
});

export default MenuItem;
