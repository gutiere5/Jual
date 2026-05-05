import { useRef } from 'react';
import { useCanvasEditor } from '../../context/useCanvasEditor';
import './Header.css';
import { canvasDataService } from '../../services/canvasDataService';
import { logo } from '@repo/assets';

export default function Header({ itemState, onLoadProject }) {
  const fileInputRef = useRef(null);
  const { canvasSettings } = useCanvasEditor();

  const handleSaveProject = () => {
    const data = { items: itemState.items, canvasSettings };

    const name = prompt('Enter project name:', 'menu-project');
    if (!name) return;

    const response = canvasDataService.createCanvasData({
      name: name,
      content: data,
    });

    if (response.success) {
      alert('Project saved successfully!');
    } else {
      alert('Error saving project: ' + response.message);
    }
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
        alert('Error Reading File', error.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="header-container">
      <a href={import.meta.env.VITE_DASHBOARD_URL}>
        <img src={logo} alt="Store Logo" className="logo" />
      </a>

      <input
        type="file"
        ref={fileInputRef}
        accept="application/json"
        onChange={handleLoadProject}
        style={{ display: 'none' }}
      />
      <div className="button-container">
        <button onClick={() => fileInputRef.current?.click()}>Load Project</button>
        <button onClick={handleSaveProject}>Save Project</button>
      </div>
    </div>
  );
}
