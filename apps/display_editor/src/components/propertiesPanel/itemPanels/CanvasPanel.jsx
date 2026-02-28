import { PropertySection } from "../shared/PropertySection";
import { useCanvasEditor } from "../../../context/CanvasEditorContext";

const CanvasPanel = () => {
  const { canvasSettings, updateCanvasSettings } = useCanvasEditor();

  return (
    <>
      <PropertySection title="Canvas Properties">
        <div>
          <label>Width:</label>
          <input
            type="number"
            value={canvasSettings.width}
            onChange={(e) =>
              updateCanvasSettings({ width: Number(e.target.value) })
            }
          />
        </div>

        <div>
          <label>Height:</label>
          <input
            type="number"
            value={canvasSettings.height}
            onChange={(e) =>
              updateCanvasSettings({ height: Number(e.target.value) })
            }
          />
        </div>

        <div>
          <label>Background Color:</label>
          <input
            type="color"
            value={canvasSettings.backgroundColor}
            onChange={(e) =>
              updateCanvasSettings({ backgroundColor: e.target.value })
            }
          />
        </div>
      </PropertySection>
    </>
  );
};

export default CanvasPanel;
