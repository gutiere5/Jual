import { Item } from '@repo/types/item.schema';

const GridView = (filteredItems: Item[], isPending: boolean) => {
  return (
    <div className="inventory-grid">
      {filteredItems.map((item) => {
        const stockStatus = getStockStatus(item.quantity_remaining);
        return (
          <Form method="post" key={item.id}>
            <input type="hidden" name="itemId" value={item.id} />
            <button type="submit" className="inventory-item-card ">
              <div className="inventory-item-content">
                <div className="inventory-item-grid-layout">
                  <div className="inventory-item-image-wrapper">
                    <div className="inventory-item-image">
                      <img src={`https://picsum.photos/seed/${item.name}/160`} alt={item.name} />
                    </div>
                  </div>
                  <div className="inventory-item-details">
                    <h3>{item.name}</h3>
                    <div className="inventory-item-badges">
                      <span className="badge outline">{item.category}</span>
                      <span className={`badge ${stockStatus.variant}`}>{stockStatus.label}</span>
                    </div>
                    <div className="inventory-item-quantity">
                      <span>Qty:</span>
                      <span>{item.quantity_remaining}</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </Form>
        );
      }) || <p>No Items Found</p>}
    </div>
  );
};

export default GridView;
