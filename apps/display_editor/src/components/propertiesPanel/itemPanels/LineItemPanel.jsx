import ArrangeDeleteSection from '../shared/arrange-delete-section';
import { PropertySection } from '../shared/PropertySection';

const LineItemPanel = ({ selectedItem, onUpdate }) => {
  return (
    <PropertySection title="Line Properties">
      <div className="setting">
        <h3>Line Color</h3>
        <input
          type="color"
          value={selectedItem?.stroke}
          onChange={(e) => onUpdate({ ...selectedItem, stroke: e.target.value })}
        />
      </div>

      <div className="setting">
        <h3>Line Width</h3>
        <input
          type="number"
          value={selectedItem?.strokeWidth}
          onChange={(e) => onUpdate({ ...selectedItem, strokeWidth: parseInt(e.target.value) })}
        />
      </div>
    </PropertySection>
  );
};

export default LineItemPanel;
