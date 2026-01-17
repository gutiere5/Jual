import { Layer, Rect, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

export default function BackgroundLayer({
  width,
  height,
  backgroundColor,
  backgroundImage,
}) {
  const [image] = useImage(backgroundImage, "anonymous", "origin");

  return (
    <Layer listening={false}>
      <Rect x={0} y={0} width={width} height={height} fill={backgroundColor} />
      {backgroundImage && image && (
        <KonvaImage image={image} x={0} y={0} width={width} height={height} />
      )}
    </Layer>
  );
}
