import "./PropertiesPanel.css";
import { ASSETS } from "../../constants/assets";
import { useState } from "react";

export default function PropertiesPanel({ selectedItem, onUpdate, onDelete }) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.length > 0) {
      const filteredFoodItems = ASSETS.food.filter((asset) =>
        asset.name.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredItems(filteredFoodItems);
    } else {
      setFilteredItems([]);
    }
  };

  return (
    <div className="properties-container">
      {/* Arrange */}
      <h3 className="section-header">Arrange</h3>
      <div className="button-grid">
        <button className="action-button">Bring to Front</button>
        <button className="action-button">Send to Back</button>
      </div>

      <hr className="divider" />

      <div>
        <h3 className="section-header">Item Settings</h3>

        {/* Menu Item Selection */}
        <div className="menu-item-selection">
          <label>Select Item</label>
          <input
            type="text"
            placeholder={selectedItem?.foodItem?.name || ""}
            className="search-input"
            value={searchValue}
            onChange={(e) => {
              handleSearch(e);
              setShowSuggestions(true);
            }}
          />
          {showSuggestions && filteredItems.length > 0 && (
            <div className="suggestion-container">
              {filteredItems.map((item) => (
                <div
                  key={item.name}
                  className="suggested-item"
                  onClick={() => {
                    setSearchValue(item.name);
                    setShowSuggestions(false);
                    onUpdate({ ...selectedItem, foodItem: item });
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Display Options */}
      <div>
        <h3 className="section-header">Display Options</h3>
        <div className="display-options-container">
          <label className="options-checkbox">
            <input
              type="checkbox"
              checked={selectedItem?.showImage || false}
              onChange={(e) =>
                onUpdate({ ...selectedItem, showImage: e.target.checked })
              }
            />
            <span className="checkbox-label">Show Image</span>
          </label>
          <label className="options-checkbox">
            <input
              type="checkbox"
              checked={selectedItem?.showTitle || false}
              onChange={(e) =>
                onUpdate({ ...selectedItem, showTitle: e.target.checked })
              }
            />
            <span className="checkbox-label">Show Title</span>
          </label>
          <label className="options-checkbox">
            <input
              type="checkbox"
              checked={selectedItem?.showDescription || false}
              onChange={(e) =>
                onUpdate({ ...selectedItem, showDescription: e.target.checked })
              }
            />
            <span className="checkbox-label">Show Description</span>
          </label>
          <label className="options-checkbox">
            <input
              type="checkbox"
              checked={selectedItem?.showPrice || false}
              onChange={(e) =>
                onUpdate({ ...selectedItem, showPrice: e.target.checked })
              }
            />
            <span className="checkbox-label">Show Price</span>
          </label>
        </div>
      </div>

      {/* Card Style */}
      <div>
        <h3 className="section-header">Card Style</h3>
        <div className="card-style-container">
          <div>
            <label>Background Color</label>
            <input
              type="color"
              value={selectedItem?.fill || "#ffffff"}
              onChange={(e) =>
                onUpdate({
                  ...selectedItem,
                  fill: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Opacity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={selectedItem?.opacity || 1}
              onChange={(e) =>
                onUpdate({
                  ...selectedItem,
                  opacity: parseFloat(e.target.value),
                })
              }
            />
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* Delete Button */}
      <button
        onClick={() => onDelete(selectedItem?.instanceId)}
        className="delete-button"
      >
        Delete Item
      </button>
    </div>
  );
}
