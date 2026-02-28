import { Line } from "react-konva";
import { useItemHandlers } from "../../../hooks/useItemHandlers";

const LineItem = ({ item, onChange }) => {
  const { getItemHandlers } = useItemHandlers({
    item,
    onChange,
  });

  return <Line id={item.instanceId} {...getItemHandlers()} {...item} />;
};

export default LineItem;
