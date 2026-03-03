import './Sidebar.css';

export const DraggableItem = ({ data, children }) => (
  <div
    draggable
    onDragStart={(e) => e.dataTransfer.setData('application/json', JSON.stringify(data))}
    className="draggable-item"
  >
    {children}
  </div>
);
