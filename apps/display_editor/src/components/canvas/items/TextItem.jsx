import { useItemHandlers } from "../../../hooks/useItemHandlers";

const TextItem = ({ item, onChange, onSelect, isEditing }) => {
  const { getCommonProps } = useItemHandlers({
    item,
    onChange,
    onSelect,
    isEditing,
  });

  return (
    <Rect
      {...getCommonProps()}
      width={item.width}
      height={item.height}
      fill={item.fill || "transparent"}
      stroke={item.stroke || "black"}
      strokeWidth={item.strokeWidth || 1}
      cornerRadius={item.cornerRadius || 0}
    />
  );
};

export default TextItem;
