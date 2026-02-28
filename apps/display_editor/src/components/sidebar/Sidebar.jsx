import { DraggableItem } from "./DraggableItem";
import { ASSETS } from "../../constants/assets";
import { useState } from "react";
import { X, PanelLeftOpen } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Header */}
        <div className="sidebar-header">
          <h3>Drag assets to the canvas</h3>
          <button
            className="toggle-close"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <X />
          </button>
        </div>

        <div className="sidebar-content">
          {/* Upload Section */}
          <div className="sidebar-section">
            <h3 className="section-title">Uploads</h3>
            <div className="upload-area">
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                className="file-input"
              />
              <label htmlFor="file-upload" className="upload-button ">
                <span> Upload Image</span>
              </label>
            </div>
          </div>

          {/* Menu Item */}
          <div className="sidebar-section">
            <h3 className="section-title">Menu Item</h3>

            <div>
              <DraggableItem key="menu-item-draggable" data={ASSETS.food[0]}>
                {ASSETS.food[0].image_src && (
                  <div className="menu-item-container">
                    <img
                      className="menu-item-img"
                      src={ASSETS.food[0].image_src}
                      alt={ASSETS.food[0].name}
                    />
                    <div className="menu-item-details">
                      <div className="menu-item-name">
                        {ASSETS.food[0].name}
                      </div>
                      <div className="menu-item-price">
                        {ASSETS.food[0].price}
                      </div>
                    </div>
                  </div>
                )}
              </DraggableItem>
            </div>
          </div>

          {/* Typography */}
          <div className="sidebar-section">
            <h3 className="section-title">Typography</h3>
            <div className="typography-items">
              {ASSETS.typography.map((asset, index) => (
                <DraggableItem key={index} data={asset}>
                  <div className="typography-item">{asset.text}</div>
                </DraggableItem>
              ))}
            </div>
          </div>

          {/* Shapes */}
          <div className="sidebar-section">
            <h3 className="section-title">Shapes</h3>
            <div className="shapes-items">
              {ASSETS.shapes.map((asset, index) => (
                <DraggableItem key={index} data={asset}>
                  <div className="shape-item">
                    <span className="shape-name">{asset.label}</span>
                  </div>
                </DraggableItem>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!isOpen && (
        <div className="closed-sidebar-container">
          <button
            className="toggle-open"
            onClick={toggleSidebar}
            aria-label="Open Sidebar"
          >
            <PanelLeftOpen />
          </button>
        </div>
      )}
    </>
  );
}
