import { useRef } from 'react';
import { useCanvasEditor } from '../../context/CanvasEditorContext';
import './Header.css';

export default function Header({ itemState, onLoadProject }) {
  const fileInputRef = useRef(null);

  const { canvasSettings } = useCanvasEditor();

  const downloadURI = (uri, name) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveProject = () => {
    const data = { items: itemState.items, canvasSettings };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    downloadURI(url, 'menu-project.json');
  };

  const handleLoadProject = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const loadedData = JSON.parse(event.target.result);
        if (loadedData.items && loadedData.canvasSettings) {
          onLoadProject(loadedData);
        } else {
          alert('Invalid project file format.');
        }
      } catch (error) {
        console.error('Failed to parse JSON file:', error);
        alert('Error Reading File');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="header-container">
      <h3>Display Header</h3>
      <button className="header-button" onClick={handleSaveProject}>
        Save Project
      </button>

      <input
        type="file"
        ref={fileInputRef}
        accept="application/json"
        onChange={handleLoadProject}
        style={{ display: 'none' }}
      />
      <button className="header-button" onClick={() => fileInputRef.current?.click()}>
        Load Project
      </button>
    </div>
  );
}
