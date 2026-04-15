import { Item } from '@repo/types/item.schema';

const GridView = ({ filteredItems }: { filteredItems: Item[] }) => {
  return (
    <>
      {filteredItems.map((item) => (
        <button className="inventory-item-card" key={item.id}>
          <div className="inventory-item-image">
            {/* <img src={`https://picsum.photos/seed/${item.name}/160`} alt={item.name} /> */}
          </div>
          <div className="inventory-item-details">
            {/* <h3>{item.name}</h3> */}
            <div className="inventory-item-badges">
              {/* <span className="badge outline">{item.category}</span>
                <span className={`badge ${stockStatus.variant}`}>{stockStatus.label}</span> */}
            </div>
            <div className="inventory-item-quantity">
              <span>Qty:</span>
              {/* <span>{item.quantity_remaining}</span> */}
            </div>
          </div>
        </button>
      ))}
    </>
  );
};

export default GridView;
