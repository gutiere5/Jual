import { PropertySection } from '../shared/PropertySection';

const TypographyPanel = ({ title, selectedItem, onUpdate }) => {
  return (
    <PropertySection title={title || 'Typography Settings'}>
      {selectedItem?.text !== undefined && (
        <div>
          <label>Text Content</label>
          <input
            type="text"
            value={selectedItem?.text}
            onChange={(e) => onUpdate({ ...selectedItem, text: e.target.value })}
          />
        </div>
      )}
      <div>
        <label>Font Size</label>
        <input
          type="number"
          value={selectedItem.fontSize}
          onChange={(e) => onUpdate({ ...selectedItem, fontSize: parseInt(e.target.value) })}
        />
      </div>

      <div>
        <label>Font Color</label>
        <input
          type="color"
          value={selectedItem.fill}
          onChange={(e) => onUpdate({ ...selectedItem, fill: e.target.value })}
        />
        <div>
          <label>Font Family</label>
          <select onChange={(e) => onUpdate({ ...selectedItem, fontFamily: e.target.value })}>
            <option value="Calibri">Calibri</option>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>

        <div>
          <label>Font Weight</label>
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
      </div>
    </PropertySection>
  );
};

export default TypographyPanel;
