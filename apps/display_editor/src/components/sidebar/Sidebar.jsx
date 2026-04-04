import { useState } from 'react';
import { X, PanelLeftOpen } from 'lucide-react';
import './Sidebar.css';
import UploadSection from './uploads-section';
import AssetSection from './assets-section';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('assets');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* Header */}
        <div className="sidebar-header">
          <h3>Drag assets to the canvas</h3>
          <button className="toggle-close" onClick={toggleSidebar} aria-label="Close Sidebar">
            <X />
          </button>
        </div>

        <div>
          <button onClick={() => setActiveSection('assets')}>Assets</button>
          <button onClick={() => setActiveSection('uploads')}>Uploads</button>
        </div>

        <div className="sidebar-content">
          {activeSection === 'assets' && <AssetSection />}
          {activeSection === 'uploads' && <UploadSection />}
        </div>
      </div>

      {!isOpen && (
        <div className="closed-sidebar-container">
          <button className="toggle-open" onClick={toggleSidebar} aria-label="Open Sidebar">
            <PanelLeftOpen />
          </button>
        </div>
      )}
    </>
  );
}
