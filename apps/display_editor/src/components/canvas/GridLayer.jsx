import { Layer, Line } from 'react-konva';
import { GRID_SIZE } from '../../constants/config';

export default function GridLayer({ width, height, visible = true }) {
  if (!visible) return null;

  const lines = [];
  for (let i = 0; i < width / GRID_SIZE; i++) {
    lines.push(
      <Line
        key={`v-${i}`}
        points={[i * GRID_SIZE, 0, i * GRID_SIZE, height]}
        stroke="#e4e4e7"
        strokeWidth={1}
      />,
    );
  }
  for (let j = 0; j < height / GRID_SIZE; j++) {
    lines.push(
      <Line
        key={`h-${j}`}
        points={[0, j * GRID_SIZE, width, j * GRID_SIZE]}
        stroke="#e4e4e7"
        strokeWidth={1}
      />,
    );
  }

  return <Layer listening={false}>{lines}</Layer>;
}
