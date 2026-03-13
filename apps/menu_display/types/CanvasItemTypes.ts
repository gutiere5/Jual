type ItemType = 'menu' | 'text' | 'rect' | 'line' | 'circle'

type KonvaItemBase = {
    instanceId: string;
    x: number;
    y: number;
    type: string;
}

export interface rectItem extends KonvaItemBase {
    scaleX:number;
    scaleY:number;
    width: number;
    height: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    cornerRadius: number;
    dash: number[];
    dashEnabled: boolean;
    label: string;
}
