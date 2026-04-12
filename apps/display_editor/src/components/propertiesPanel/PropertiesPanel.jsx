import './PropertiesPanel.css';
import { useState } from 'react';
import { PanelLeftOpen } from 'lucide-react';
import { ITEM_PANELS } from './itemPanels/index';
import { useCanvasEditor } from '../../context/CanvasEditorContext';
import ArrangeDeleteSection from './shared/arrange-delete-section';

export default function PropertiesPanel() {
  const { updateItem, selectedItem } = useCanvasEditor();
  const [isOpen, setIsOpen] = useState(true);

  const renderItemPanel = () => {
    let SpecificItemPanel = ITEM_PANELS[selectedItem?.type];

    if (!SpecificItemPanel) {
      SpecificItemPanel = ITEM_PANELS['canvas'];
    }
    return <SpecificItemPanel selectedItem={selectedItem} onUpdate={updateItem} />;
  };

  const togglePropertiesPanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`properties-container ${isOpen ? 'open' : 'closed'}`}>
        <button className="close-button" onClick={togglePropertiesPanel}>
          X
        </button>
        {selectedItem && selectedItem.type !== 'canvas' ? (
          <ArrangeDeleteSection>{renderItemPanel()}</ArrangeDeleteSection>
        ) : (
          renderItemPanel()
        )}
      </div>

      {!isOpen && (
        <div className="closed-properties-container">
          <button className="open-button" onClick={togglePropertiesPanel}>
            <PanelLeftOpen />
          </button>
        </div>
      )}
    </>
  );
}
