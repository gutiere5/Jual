import { PropertySection } from '../shared/PropertySection';
import { useCanvasEditor } from '../../../context/CanvasEditorContext';
import { r2Service } from '../../../services/r2-service';

const CanvasPanel = () => {
  const { canvasSettings, updateCanvasSettings } = useCanvasEditor();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const fileName = `images/background`;
      await r2Service.uploadFile({ fileName, fileContent: file });
      updateCanvasSettings({ backgroundImage: `https://jualinbox.com/images/background` });
    } catch (error) {
      throw new Error('Error uploading background image', error);
    }
  };

  return (
    <>
      <PropertySection title="Canvas Properties">
        <div>
          <label>Width:</label>
          <input
            type="number"
            value={canvasSettings.width}
            onChange={(e) => updateCanvasSettings({ width: Number(e.target.value) })}
          />
        </div>

        <div>
          <label>Height:</label>
          <input
            type="number"
            value={canvasSettings.height}
            onChange={(e) => updateCanvasSettings({ height: Number(e.target.value) })}
          />
        </div>

        <div>
          <label>Background Color:</label>
          <input
            type="color"
            value={canvasSettings.backgroundColor}
            onChange={(e) => updateCanvasSettings({ backgroundColor: e.target.value })}
          />
        </div>

        <div>
          <label>Background Image Upload</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </div>
      </PropertySection>
    </>
  );
};

export default CanvasPanel;
