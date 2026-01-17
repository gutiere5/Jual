import { useEffect, useRef } from "react";
import { Transformer } from "react-konva";
import { ITEM_COMPONENTS } from "./items/index";

const CanvasItem = (props) => {
  const { item, isSelected, isEditing } = props;

  const transformRef = useRef();
  const shapeNodeRef = useRef();

  const SpecificShapeComponent = ITEM_COMPONENTS[item.type];

  useEffect(() => {
    if (
      isSelected &&
      !isEditing &&
      shapeNodeRef.current &&
      transformRef.current
    ) {
      transformRef.current.nodes([shapeNodeRef.current]);
      transformRef.current.getLayer().batchDraw();
    }
  }, [isSelected, isEditing]);

  if (!SpecificShapeComponent) {
    return null;
  }
  console.log("Rendering inside CanvasItem with props:", props);

  return (
    <>
      <SpecificShapeComponent {...props} ref={shapeNodeRef} />
      {isSelected && !isEditing && (
        <Transformer
          ref={transformRef}
          keepRatio={true}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) return oldBox;
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default CanvasItem;
