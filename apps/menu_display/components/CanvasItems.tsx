import {rectItem} from '../types/CanvasItemTypes';
import {CanvasItemMap} from '../types/CanvasItemMap';

type CanvasItemProps = {
  item: rectItem;
};

const CanvasItem = ({item}: CanvasItemProps) => {
    const renderNode = CanvasItemMap[item.type];

    return (
        <> {renderNode(item)}</>
    )
}   


export default CanvasItem;