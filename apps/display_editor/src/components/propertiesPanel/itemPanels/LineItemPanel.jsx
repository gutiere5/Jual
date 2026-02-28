import { PropertySection } from "../shared/PropertySection";

const LineItemPanel = ({ selectedItem, onUpdate }) => {
  return (
    <>
      <PropertySection title="Line Properties">
        <div>
          <label>Line Color</label>
          <input
            type="color"
            value={selectedItem?.stroke}
            onChange={(e) =>
              onUpdate({ ...selectedItem, stroke: e.target.value })
            }
          />
        </div>
      </PropertySection>
    </>
  );
};

export default LineItemPanel;
