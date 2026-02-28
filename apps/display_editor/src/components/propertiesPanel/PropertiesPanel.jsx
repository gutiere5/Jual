import "./PropertiesPanel.css";
import { useState } from "react";
import { PanelLeftOpen, X } from "lucide-react";
import { ITEM_PANELS } from "./itemPanels/index";

export default function PropertiesPanel({ selectedItem, onUpdate, onDelete }) {
  const [isOpen, setIsOpen] = useState(true);

  const renderItemPanel = () => {
    let SpecificItemPanel = ITEM_PANELS[selectedItem?.type];

    if (!SpecificItemPanel) {
      SpecificItemPanel = ITEM_PANELS["canvas"];
    }
    return (
      <SpecificItemPanel selectedItem={selectedItem} onUpdate={onUpdate} />
    );
  };

  const togglePropertiesPanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`properties-container ${isOpen ? "open" : "closed"}`}>
        <button className="close-button" onClick={togglePropertiesPanel}>
          <X size={16} />
        </button>

        {/* Arrange */}
        <h3 className="section-header">Arrange</h3>
        <div className="button-grid">
          <button className="action-button">Bring to Front</button>
          <button className="action-button">Send to Back</button>
        </div>

        {/* Render Item Selection */}
        {renderItemPanel()}

        {/* Delete Button */}
        <button onClick={() => onDelete()} className="delete-button">
          Delete Item
        </button>
      </div>

      {!isOpen && (
        <div className="closed-properties-container">
          <button className="open-button">
            <PanelLeftOpen onClick={togglePropertiesPanel} />
          </button>
        </div>
      )}
    </>
  );
}
