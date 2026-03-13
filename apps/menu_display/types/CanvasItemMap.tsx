import { Rect } from 'react-konva';
import { rectItem } from "./CanvasItemTypes";
import { ReactNode } from 'react';

type CanvasRendererItem <T> = (item: T) => ReactNode;

export const CanvasItemMap: Record<string, CanvasRendererItem<rectItem>> = {
    rect: (item) => <Rect {...item}/>,

}