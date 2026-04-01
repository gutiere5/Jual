import { DraggableItem } from './DraggableItem';
import { ASSETS } from '../../constants/assets';

const AssetSection = () => {
  return (
    <>
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
                  <div className="menu-item-name">{ASSETS.food[0].name}</div>
                  <div className="menu-item-price">{ASSETS.food[0].price}</div>
                </div>
              </div>
            )}
          </DraggableItem>
        </div>
      </div>

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
    </>
  );
};

export default AssetSection;
