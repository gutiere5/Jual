import { PropertySection } from '../shared/PropertySection';

const RectItemPanel = ({ selectedItem, onUpdate }) => {
  return (
    <PropertySection title="Rectangle Properties">
      {/* Fill Color */}
      <div className="setting">
        <h3>Fill Color</h3>
        <input
          type="color"
          value={selectedItem?.fill}
          onChange={(e) => onUpdate({ ...selectedItem, fill: e.target.value })}
        />
      </div>

      {/* Stroke Color */}
      <div className="setting">
        <h3>Stroke Color</h3>
        <input
          type="color"
          value={selectedItem?.stroke}
          onChange={(e) => onUpdate({ ...selectedItem, stroke: e.target.value })}
        />
      </div>

      {/* Stroke Width */}
      <div className="setting">
        <h3>Stroke Width</h3>
        <input
          type="number"
          value={selectedItem?.strokeWidth}
          onChange={(e) =>
            onUpdate({
              ...selectedItem,
              strokeWidth: parseFloat(e.target.value),
            })
          }
        />
      </div>

      {/* Width */}
      <div className="setting">
        <h3>Width</h3>
        <input
          type="number"
          value={selectedItem?.width}
          onChange={(e) => onUpdate({ ...selectedItem, width: parseFloat(e.target.value) })}
        />
      </div>

      {/* Height */}
      <div className="setting">
        <h3>Height</h3>
        <input
          type="number"
          value={selectedItem?.height}
          onChange={(e) => onUpdate({ ...selectedItem, height: parseFloat(e.target.value) })}
        />
      </div>

      {/* Opacity */}
      <div className="setting">
        <h3>Opacity</h3>
        <input
          className="opacity-input"
          type="number"
          min="0"
          max="100"
          step="10"
          value={selectedItem?.opacity * 100 || 100}
          onChange={(e) =>
            onUpdate({
              ...selectedItem,
              opacity: parseFloat(e.target.value) / 100,
            })
          }
        />
      </div>

      {/* Corner Radius */}
      <div className="setting">
        <h3>Corner Radius</h3>
        <input
          type="number"
          min="0"
          max="50"
          value={selectedItem?.cornerRadius}
          onChange={(e) =>
            onUpdate({
              ...selectedItem,
              cornerRadius: parseFloat(e.target.value),
            })
          }
        />
      </div>

      {/* Dash Pattern */}
      <div className="setting">
        <h3>Dash Pattern</h3>
        <input
          type="checkbox"
          checked={selectedItem?.dashEnabled}
          onChange={(e) => onUpdate({ ...selectedItem, dashEnabled: e.target.checked })}
        />
      </div>
    </PropertySection>
  );
};

export default RectItemPanel;
