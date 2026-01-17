import { useState } from "react";
import "./App.css";
import { Layer, Stage } from "react-konva";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import BackgroundLayer from "./components/canvas/BackgroundLayer";
import GridLayer from "./components/canvas/GridLayer";
import PropertiesPanel from "./components/propertiesPanel/PropertiesPanel";
import useDragAndDrop from "./hooks/useDragAndDrop";
import CanvasItem from "./components/canvas/CanvasItem";

function App() {
  const [items, setItems] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const { stageRef, handleDragOver, handleDrop } = useDragAndDrop(setItems);

  // Canvas Dimensions
  const [canvasWidth] = useState(1280);
  const [canvasHeight] = useState(720);

  const handleItemChange = (updatedItem) => {
    setItems(
      items.map((item) =>
        item.instanceId === updatedItem.instanceId ? updatedItem : item,
      ),
    );
  };

  const handleItemDelete = (id) => {
    setItems(items.filter((item) => item.instanceId !== id));
    setSelectedId(null);
  };

  const handleItemSelect = (id) => {
    setSelectedId(id);
  };

  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <Header />
      </div>
      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar />
      </div>
      {/* Workspace */}
      <div className="workspace">
        <div className="workspace-top">
          <button
            className="grid-button"
            onClick={() => setShowGrid(!showGrid)}
          >
            Grid {showGrid ? "Off" : "On"}
          </button>
        </div>
        <div
          className="workspace-content"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Stage
            width={canvasWidth}
            height={canvasHeight}
            ref={stageRef}
            onMouseDown={handleStageClick}
          >
            <BackgroundLayer width={canvasWidth} height={canvasHeight} />
            <GridLayer
              width={canvasWidth}
              height={canvasHeight}
              visible={showGrid}
            />
            <Layer>
              {items.map((item) => (
                <CanvasItem
                  key={item.instanceId}
                  item={item}
                  isEditing={false}
                  isSelected={item.instanceId === selectedId}
                  onSelect={handleItemSelect}
                  onChange={handleItemChange}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
      {/* Properties Panel */}
      <div className="properties-panel">
        <PropertiesPanel
          selectedItem={items.find((item) => item.instanceId === selectedId)}
          onUpdate={handleItemChange}
          onDelete={handleItemDelete}
        />
      </div>
    </div>
  );
}

export default App;
