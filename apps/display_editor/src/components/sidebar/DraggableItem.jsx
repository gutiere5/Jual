import React from "react";
import "./Sidebar.css";

export const DraggableItem = ({ children }) => (
  <div draggable className="draggable-item">
    {children}
  </div>
);
