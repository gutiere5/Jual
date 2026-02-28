import { PropertySection } from "../shared/PropertySection";

const CircleItemPanel = ({ selectedItem, onUpdate }) => {
  return (
    <>
      <PropertySection title="Circle Properties">
        <div>
          <label>Circle Color</label>
          <input
            type="color"
            value={selectedItem?.fill}
            onChange={(e) =>
              onUpdate({ ...selectedItem, fill: e.target.value })
            }
          />
        </div>
      </PropertySection>
    </>
  );
};

export default CircleItemPanel;
