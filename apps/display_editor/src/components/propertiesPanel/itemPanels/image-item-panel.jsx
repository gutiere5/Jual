import { PropertySection } from '../shared/PropertySection';

const ImageItemPanel = ({ selectedItem, onUpdate }) => {
  console.log('Selected Item in Image Panel: ', selectedItem);
  return (
    <PropertySection title="Image Properties">
      <div>
        <label>Width</label>
        <input
          type="number"
          value={selectedItem.width}
          onChange={(e) => onUpdate({ ...selectedItem, width: parseInt(e.target.value) })}
        />
      </div>
      <div>
        <label>Height</label>
        <input
          type="number"
          value={selectedItem.height}
          onChange={(e) => onUpdate({ ...selectedItem, height: parseInt(e.target.value) })}
        />
      </div>
      <div>
        <label>Stroke Color</label>
        <input
          type="color"
          value={selectedItem.stroke}
          onChange={(e) => onUpdate({ ...selectedItem, stroke: e.target.value })}
        />
      </div>
      <div>
        <label>Stroke Width</label>
        <input
          type="number"
          value={selectedItem.strokeWidth}
          onChange={(e) => onUpdate({ ...selectedItem, strokeWidth: parseInt(e.target.value) })}
        />
      </div>
      <div>
        <label>Corner Radius</label>
        <input
          type="number"
          value={selectedItem.cornerRadius}
          onChange={(e) => onUpdate({ ...selectedItem, cornerRadius: parseInt(e.target.value) })}
        />
      </div>
    </PropertySection>
  );
};

export default ImageItemPanel;
