import { PropertySection } from '../shared/PropertySection';
import { useCanvasEditor } from '../../../context/CanvasEditorContext';
import { useMutation } from '@tanstack/react-query';
import { uploadFileQueryOptions } from '../../../api/query-client';

const CanvasPanel = () => {
  const { canvasSettings, updateCanvasSettings } = useCanvasEditor();
  const uploadMutation = useMutation(uploadFileQueryOptions());

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = `images/background`;
    await uploadMutation.mutateAsync({ fileName, fileContent: file });
    updateCanvasSettings({ backgroundImage: `https://jualinbox.com/images/background` });
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
