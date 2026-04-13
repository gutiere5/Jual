import { PropertySection } from '../shared/PropertySection';

const TypographyPanel = ({ title, selectedItem, onUpdate }) => {
  return (
    <PropertySection title={title || 'Typography Settings'}>
      {selectedItem?.text !== undefined && (
        <div className="setting">
          <h3>Content</h3>
          <input
            type="text"
            value={selectedItem?.text}
            onChange={(e) => onUpdate({ ...selectedItem, text: e.target.value })}
          />
        </div>
      )}

      <div className="setting">
        <h3>Font Size</h3>
        <input
          type="number"
          value={selectedItem.fontSize}
          onChange={(e) => onUpdate({ ...selectedItem, fontSize: parseInt(e.target.value) })}
        />
      </div>

      <div className="setting">
        <h3>Font Color</h3>
        <input
          type="color"
          value={selectedItem.fill}
          onChange={(e) => onUpdate({ ...selectedItem, fill: e.target.value })}
        />
      </div>

      <div className="setting">
        <h3>Font Family</h3>
        <select onChange={(e) => onUpdate({ ...selectedItem, fontFamily: e.target.value })}>
          <option value="Calibri">Calibri</option>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </div>

      <div className="setting">
        <h3>Font Weight</h3>
        <select
          value={selectedItem.fontStyle}
          onChange={(e) => onUpdate({ ...selectedItem, fontStyle: e.target.value })}
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="italic">Italic</option>
          <option value="bold italic">Bold Italic</option>
        </select>
      </div>

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
    </PropertySection>
  );
};

export default TypographyPanel;
