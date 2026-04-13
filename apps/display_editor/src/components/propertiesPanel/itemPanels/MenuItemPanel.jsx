import { useState } from 'react';
import { PropertySection } from '../shared/PropertySection';
import TypographyPanel from './TypographyPanel';
import '../PropertiesPanel.css';
import { useSuspenseQuery } from '@tanstack/react-query';
import { listMenuItemsQueryOptions } from '../../../api/query-client';
import ImageItemPanel from './image-item-panel';

const MenuItemPanel = ({ selectedItem, onUpdate }) => {
  const { data } = useSuspenseQuery(listMenuItemsQueryOptions());
  const [searchValue, setSearchValue] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const menuItems = data || [];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.length > 0) {
      const filteredFoodItems = menuItems.filter((asset) =>
        asset.name.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredItems(filteredFoodItems);
    } else {
      setFilteredItems([]);
    }
  };

  return (
    <>
      <PropertySection title="Item Settings">
        <div className="menu-item-selection">
          <label>Select Item</label>
          <input
            type="text"
            placeholder={selectedItem?.name || ''}
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
                    onUpdate({
                      ...selectedItem,
                      name: item.name,
                      image_src: item.image_url,
                      price: item.price,
                      description: item.description,
                    });
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </PropertySection>

      <PropertySection title="Display Options">
        <div className="display-options-container">
          <label className="options-checkbox">
            <input
              type="checkbox"
              checked={selectedItem?.showImage || false}
              onChange={(e) => onUpdate({ ...selectedItem, showImage: e.target.checked })}
            />
            <span className="checkbox-label">Show Image</span>
          </label>
          <label className="options-checkbox">
            <input
              type="checkbox"
              checked={selectedItem?.showTitle || false}
              onChange={(e) => onUpdate({ ...selectedItem, showTitle: e.target.checked })}
            />
            <span className="checkbox-label">Show Title</span>
          </label>
          <label className="options-checkbox">
            <input
              type="checkbox"
              checked={selectedItem?.showDescription || false}
              onChange={(e) =>
                onUpdate({
                  ...selectedItem,
                  showDescription: e.target.checked,
                })
              }
            />
            <span className="checkbox-label">Show Description</span>
          </label>
          <label className="options-checkbox">
            <input
              type="checkbox"
              checked={selectedItem?.showPrice || false}
              onChange={(e) => onUpdate({ ...selectedItem, showPrice: e.target.checked })}
            />
            <span className="checkbox-label">Show Price</span>
          </label>
        </div>
      </PropertySection>

      {selectedItem?.showImage && (
        <ImageItemPanel
          selectedItem={selectedItem?.imageStyle}
          onUpdate={(newStyle) => onUpdate({ ...selectedItem, imageStyle: newStyle })}
        />
      )}

      {selectedItem?.showTitle && (
        <TypographyPanel
          title="Title Styles"
          selectedItem={selectedItem?.titleStyle}
          onUpdate={(newStyle) => onUpdate({ ...selectedItem, titleStyle: newStyle })}
        />
      )}

      {selectedItem?.showDescription && (
        <TypographyPanel
          title="Description Styles"
          selectedItem={selectedItem?.descriptionStyle}
          onUpdate={(newStyle) => onUpdate({ ...selectedItem, descriptionStyle: newStyle })}
        />
      )}

      {selectedItem?.showPrice && (
        <TypographyPanel
          title="Price Styles"
          selectedItem={selectedItem?.priceStyle}
          onUpdate={(newStyle) => onUpdate({ ...selectedItem, priceStyle: newStyle })}
        />
      )}
    </>
  );
};

export default MenuItemPanel;
