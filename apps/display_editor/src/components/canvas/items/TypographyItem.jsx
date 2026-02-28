import { useItemHandlers } from "../../../hooks/useItemHandlers";
import { Text } from "react-konva";

const TypographyItem = ({ item, onChange }) => {
  const { getItemHandlers } = useItemHandlers({
    item,
    onChange,
  });

  return <Text id={item.instanceId} {...getItemHandlers()} {...item} />;
};
export default TypographyItem;
