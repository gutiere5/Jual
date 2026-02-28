import { Circle } from "react-konva";
import { useItemHandlers } from "../../../hooks/useItemHandlers";

const CircleItem = ({ item, onChange }) => {
  const { getItemHandlers } = useItemHandlers({
    item,
    onChange,
  });

  return <Circle id={item.instanceId} {...getItemHandlers()} {...item} />;
};
export default CircleItem;
