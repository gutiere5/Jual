import { Circle, Line, Rect, Text } from 'react-konva';
import { CanvasItemSchema } from './CanvasItemTypes';
import MenuItem from './items/MenuItem';
import { JSX } from 'react';

type CanvasNodeProps = {
  item: CanvasItemSchema;
};

type MenuItemSchema = Extract<CanvasItemSchema, { type: 'menu' }>;

export const CanvasItemMap: Record<
  CanvasItemSchema['type'],
  (props: CanvasNodeProps) => JSX.Element
> = {
  rect: ({ item }) => <Rect {...item} />,
  line: ({ item }) => <Line {...item} />,
  circle: ({ item }) => <Circle {...item} />,
  text: ({ item }) => <Text {...item} />,
  menu: ({ item }) => <MenuItem item={item as MenuItemSchema} />,
};
