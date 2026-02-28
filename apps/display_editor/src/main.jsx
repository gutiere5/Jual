import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CanvasEditorProvider } from "./context/CanvasEditorContext.jsx";
import { MenuItemProvider } from "./context/MenuItemContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CanvasEditorProvider>
      <MenuItemProvider>
        <App />
      </MenuItemProvider>
    </CanvasEditorProvider>
  </StrictMode>,
);
