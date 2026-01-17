import { useRef } from "react";
import Draggable from "react-draggable";
import type { Item } from "@repo/types/item.schema";
import "./MenuCard.css";
import { GripVertical } from "lucide-react";

interface MenuCardProps {
  item: Item;
}

export function MenuCard({ item }: MenuCardProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      defaultPosition={{ x: 50, y: 50 }} // Optional: Starting offset
    >
      <div ref={nodeRef} className="menu-card-resizable">
        <div className="menu-card-content">
          {/* Image Section */}
          <div className="item-image-container">
            <img className="item-image" src={item.image_url} alt={item.name} />
          </div>
          {/* Content Section */}
          <div className="content-wrapper">
            <h3 className="item-name">{item.name}</h3>
            <GripVertical className="drag-handle-icon" size={16} />
            <div className="header-row"></div>

            <div className="item-description">
              <p className="item-details">{item.description}</p>
              <p className="item-price">${item.price}</p>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
