import './Header.css';
import { useState } from 'react';
import { logo } from '@repo/assets';
import { useCanvasEditor } from '../../context/useCanvasEditor';
import { canvasDataService } from '../../services/canvasDataService';
import LoadProjectModal from './LoadProjectModal';

export default function Header() {
  const { canvasItems, canvasSettings } = useCanvasEditor();
  const [showLoadModal, setShowLoadModal] = useState(false);

  const handleSaveProject = () => {
    const data = { items: canvasItems, canvasSettings };

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

  return (
    <div className="header-container">
      <a href={import.meta.env.VITE_DASHBOARD_URL}>
        <img src={logo} alt="Store Logo" className="logo" />
      </a>
      <div className="button-container">
        <button onClick={() => setShowLoadModal(true)}>Load Project</button>
        <button onClick={handleSaveProject}>Save Project</button>
      </div>
      {showLoadModal && <LoadProjectModal onClose={() => setShowLoadModal(false)} />}
    </div>
  );
}
