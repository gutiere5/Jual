import { ITEM_COMPONENTS } from './items/index';

const CanvasItem = ({ item, onChange }) => {
  const SpecificShapeComponent = ITEM_COMPONENTS[item.type];

  if (!SpecificShapeComponent) {
    return null;
  }
  return (
    <>
      <SpecificShapeComponent item={item} onChange={onChange} />
    </>
  );
};

export default CanvasItem;
