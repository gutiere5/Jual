import { PropertySection } from '../shared/PropertySection';

const CircleItemPanel = ({ selectedItem, onUpdate }) => {
  return (
    <PropertySection title="Circle Properties">
      <div className="setting">
        <h3>Circle Color</h3>
        <input
          type="color"
          value={selectedItem?.fill}
          onChange={(e) => onUpdate({ ...selectedItem, fill: e.target.value })}
        />
      </div>

      <div className="setting">
        <h3>Stroke</h3>
        <input
          type="color"
          value={selectedItem?.stroke}
          onChange={(e) => onUpdate({ ...selectedItem, stroke: e.target.value })}
        />
      </div>

      <div className="setting">
        <h3>Stroke Width</h3>
        <input
          type="number"
          value={selectedItem?.strokeWidth}
          onChange={(e) => onUpdate({ ...selectedItem, strokeWidth: parseInt(e.target.value) })}
        />
      </div>
    </PropertySection>
  );
};

export default CircleItemPanel;
