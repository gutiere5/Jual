import { DraggableItem } from "./DraggableItem";
import { ASSETS } from "../../constants/assets";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <h2>Display Editor</h2>
        <p>Drag assets to the canvas</p>
      </div>

      <div className="sidebar-content"></div>
      {/* Upload Section */}
      <div>
        <h3>Uploads</h3>
        <input type="file" id="file-upload" accept="image/*" />
        <button id="upload-button" className="upload-button">
          + Upload Image
        </button>
      </div>

      {/* Menu Item */}
      <div>
        <h3 className="menu-item-title">Menu Item</h3>

        <div>
          <DraggableItem key="menu-item-draggable">
            {ASSETS.food[0].image_src && (
              <>
                <img
                  className="menu-item-img"
                  src={ASSETS.food[0].image_src}
                  alt={ASSETS.food[0].name}
                />
                <div className="menu-item-name">{ASSETS.food[0].name}</div>
                <div className="menu-item-price">{ASSETS.food[0].price}</div>
              </>
            )}
          </DraggableItem>
        </div>
        <p className="menu-item-text">
          Drag to canvas, then configure in properties
        </p>
      </div>

      {/* Typography */}
      <div>
        <h3 className="typography-title">Typography</h3>

        <div className="typography-items">
          {ASSETS.typography.map((asset, index) => (
            <DraggableItem key={index} data={asset}>
              <div className="typography-item">{asset.label}</div>
            </DraggableItem>
          ))}
        </div>
      </div>

      {/* Shapes */}
      <div>
        <h3 className="shapes-title">Shapes</h3>
      </div>

      <div className="shapes-items">
        {ASSETS.shapes.map((asset, index) => (
          <DraggableItem key={index} data={asset}>
            <div className="shape-name">{asset.label} </div>
          </DraggableItem>
        ))}
      </div>
    </div>
  );
}
