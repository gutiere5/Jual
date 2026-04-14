const ListView = () => {
  return (
    <div className="inventory-list">
      {filteredItems.map((item) => {
        const stockStatus = getStockStatus(item.quantity_remaining);
        return (
          <div key={item.id} className="inventory-item-card list-view">
            <div className="inventory-item-content">
              <div className="inventory-item-list-layout">
                <div className="inventory-item-image-wrapper">
                  <div className="inventory-item-image small">
                    <img src={`https://picsum.photos/seed/${item.name}/128`} alt={item.name} />
                  </div>
                </div>

                <div className="inventory-item-list-grid">
                  <div className="inventory-item-name-col">
                    <h3>{item.name}</h3>
                    <span className="badge outline">{item.category}</span>
                  </div>

                  <div className="inventory-item-quantity">
                    <span>Quantity:</span>
                    <span>{item.quantity_remaining}</span>
                  </div>

                  <div className="inventory-item-status-col">
                    <span className={`badge ${stockStatus.variant}`}>{stockStatus.label}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
