import type { CanvasItem } from '@repo/types/canvasObject.schema';
import { JSX } from 'react';
import MenuItem from './MenuItem';

import { Circle, Line, Rect, Text } from 'react-konva';

type CanvasNodeProps = {
  item: CanvasItem;
};

const CanvasItemMap: Record<CanvasItem['type'], (props: CanvasNodeProps) => JSX.Element> = {
  rect: ({ item }) => <Rect {...item} />,
  line: ({ item }) => <Line {...item} />,
  circle: ({ item }) => <Circle {...item} />,
  text: ({ item }) => <Text {...item} />,
  menu: ({ item }) => <MenuItem item={item} />,
};

const CanvasItem = ({ item }: { item: CanvasItem }) => {
  const RenderNode = CanvasItemMap[item.type];

  return <RenderNode item={item} />;
};

export default CanvasItem;
