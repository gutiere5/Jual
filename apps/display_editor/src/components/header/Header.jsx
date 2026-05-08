import './Header.css';
import { useState } from 'react';
import { logo } from '@repo/assets';
import LoadProjectModal from './LoadProjectModal';
import SaveProjectModal from './SaveProjectModal';

export default function Header() {
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  return (
    <div className="header-container">
      <a href={import.meta.env.VITE_DASHBOARD_URL}>
        <img src={logo} alt="Store Logo" className="logo" />
      </a>
      <div className="button-container">
        <button onClick={() => setShowLoadModal(true)}>Load Project</button>
        <button onClick={() => setShowSaveModal(true)}>Save Project</button>
      </div>
      {showLoadModal && <LoadProjectModal onClose={() => setShowLoadModal(false)} />}
      {showSaveModal && <SaveProjectModal onClose={() => setShowSaveModal(false)} />}
    </div>
  );
}
